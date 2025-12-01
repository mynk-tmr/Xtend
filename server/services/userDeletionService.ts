import { ObjectId } from "mongodb";
import { client, db } from "@/lib/db";
import { BookingCollection } from "@/server/models/Booking";
import { ComplaintCollection } from "@/server/models/Complaint";
import { ListingCollection } from "@/server/models/Listing";
import { ShortlistCollection } from "@/server/models/Shortlist";
import { logError } from "./loggingService";

export interface DeletionResult {
  success: boolean;
  deletedItems: {
    listings: number;
    bookings: number;
    shortlists: number;
    complaints: number;
  };
  errors: string[];
}

export interface FailedDeletion {
  userId: string;
  timestamp: Date;
  errors: string[];
  retryCount: number;
}

// Collection to track failed deletions for retry
const FailedDeletionCollection = () =>
  db.collection<FailedDeletion>("failed_deletions");

export async function deleteUserAccount(
  userId: string,
): Promise<DeletionResult> {
  const userObjectId = new ObjectId(userId);
  const result: DeletionResult = {
    success: false,
    deletedItems: {
      listings: 0,
      bookings: 0,
      shortlists: 0,
      complaints: 0,
    },
    errors: [],
  };

  try {
    // Start a session for transaction-like behavior
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete all listings owned by the user
        const listingsResult = await ListingCollection().deleteMany(
          { tenantId: userObjectId },
          { session },
        );
        result.deletedItems.listings = listingsResult.deletedCount;

        // Delete all bookings where user is the renter
        const bookingsResult = await BookingCollection().deleteMany(
          { renterId: userObjectId },
          { session },
        );
        result.deletedItems.bookings = bookingsResult.deletedCount;

        // Delete all shortlists created by the user
        const shortlistsResult = await ShortlistCollection().deleteMany(
          { userId: userObjectId },
          { session },
        );
        result.deletedItems.shortlists = shortlistsResult.deletedCount;

        // Delete all complaints filed by the user
        const complaintsFiledResult = await ComplaintCollection().deleteMany(
          { complainantId: userObjectId },
          { session },
        );

        // Delete all complaints against the user
        const complaintsAgainstResult = await ComplaintCollection().deleteMany(
          { respondentId: userObjectId },
          { session },
        );
        result.deletedItems.complaints =
          complaintsFiledResult.deletedCount +
          complaintsAgainstResult.deletedCount;

        // Remove any failed deletion records for this user
        await FailedDeletionCollection().deleteOne({ userId }, { session });
      });

      result.success = true;
      await session.endSession();
    } catch (transactionError) {
      await session.abortTransaction();
      await session.endSession();
      throw transactionError;
    }
  } catch (error) {
    const errorMessage = `Failed to delete user account: ${error instanceof Error ? error.message : "Unknown error"}`;
    result.errors.push(errorMessage);

    // Log failed deletion for retry
    await logFailedDeletion(userId, [errorMessage]);

    await logError(
      `Error deleting user ${userId}: ${error instanceof Error ? error.message : "Unknown error"}`,
      "userDeletion",
      userId,
    );
  }

  return result;
}

export async function logFailedDeletion(
  userId: string,
  errors: string[],
): Promise<void> {
  try {
    const existingFailedDeletion = await FailedDeletionCollection().findOne({
      userId,
    });

    if (existingFailedDeletion) {
      // Update existing failed deletion record
      await FailedDeletionCollection().updateOne(
        { userId },
        {
          $set: {
            timestamp: new Date(),
            errors,
            retryCount: existingFailedDeletion.retryCount + 1,
          },
        },
      );
    } else {
      // Create new failed deletion record
      await FailedDeletionCollection().insertOne({
        userId,
        timestamp: new Date(),
        errors,
        retryCount: 1,
      });
    }
  } catch (error) {
    console.error(`Failed to log deletion failure for user ${userId}:`, error);
  }
}

export async function retryFailedDeletions(): Promise<{
  retried: number;
  successful: number;
  stillFailed: number;
}> {
  const result = {
    retried: 0,
    successful: 0,
    stillFailed: 0,
  };

  try {
    const failedDeletions = await FailedDeletionCollection()
      .find({
        retryCount: { $lt: 3 }, // Max 3 retries
        timestamp: {
          $lt: new Date(Date.now() - 60 * 60 * 1000), // Only retry after 1 hour
        },
      })
      .toArray();

    result.retried = failedDeletions.length;

    for (const failedDeletion of failedDeletions) {
      const deletionResult = await deleteUserAccount(failedDeletion.userId);

      if (deletionResult.success) {
        result.successful++;
      } else {
        result.stillFailed++;
      }
    }
  } catch (error) {
    console.error("Error during retry of failed deletions:", error);
  }

  return result;
}

export async function cleanupOldFailedDeletionRecords(): Promise<number> {
  try {
    const result = await FailedDeletionCollection().deleteMany({
      timestamp: {
        $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Delete records older than 7 days
      },
    });
    return result.deletedCount;
  } catch (error) {
    console.error("Error cleaning up old failed deletion records:", error);
    return 0;
  }
}

// Utility function to check if user has any remaining data after deletion
export async function verifyUserDeletion(userId: string): Promise<{
  hasRemainingData: boolean;
  remainingItems: {
    listings: number;
    bookings: number;
    shortlists: number;
    complaints: number;
  };
}> {
  const userObjectId = new ObjectId(userId);

  try {
    const [listings, bookings, shortlists, complaints] = await Promise.all([
      ListingCollection().countDocuments({ tenantId: userObjectId }),
      BookingCollection().countDocuments({ renterId: userObjectId }),
      ShortlistCollection().countDocuments({ userId: userObjectId }),
      ComplaintCollection().countDocuments({
        $or: [{ complainantId: userObjectId }, { respondentId: userObjectId }],
      }),
    ]);

    return {
      hasRemainingData:
        listings > 0 || bookings > 0 || shortlists > 0 || complaints > 0,
      remainingItems: {
        listings,
        bookings,
        shortlists,
        complaints,
      },
    };
  } catch (error) {
    console.error(`Error verifying deletion for user ${userId}:`, error);
    return {
      hasRemainingData: true,
      remainingItems: {
        listings: 0,
        bookings: 0,
        shortlists: 0,
        complaints: 0,
      },
    };
  }
}
