import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { db } from "../db";
import type { Listing } from "./Listing";

// Zod schema for Shortlist validation
export const ShortlistSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  listingId: z.instanceof(ObjectId),
  createdAt: z.date().default(new Date()),
});

// TypeScript type derived from the schema
export type Shortlist = z.infer<typeof ShortlistSchema>;

// Type for shortlist with listing details
export type ShortlistWithListing = Shortlist & { listing: Listing };

// Collection name
export const SHORTLIST_COLLECTION = "shortlists";

// Helper functions for Shortlist operations
export const ShortlistCollection = () =>
  db.collection<Shortlist>(SHORTLIST_COLLECTION);

// Add a listing to user's shortlist
export async function addToShortlist(
  userId: string,
  listingId: string,
): Promise<Shortlist> {
  const shortlist = {
    userId: new ObjectId(userId),
    listingId: new ObjectId(listingId),
    createdAt: new Date(),
  };

  const result = await ShortlistCollection().insertOne(shortlist);
  return { ...shortlist, _id: result.insertedId };
}

// Remove a listing from user's shortlist
export async function removeFromShortlist(
  userId: string,
  listingId: string,
): Promise<boolean> {
  const result = await ShortlistCollection().deleteOne({
    userId: new ObjectId(userId),
    listingId: new ObjectId(listingId),
  });
  return result.deletedCount > 0;
}

// Check if a listing is in user's shortlist
export async function isInShortlist(
  userId: string,
  listingId: string,
): Promise<boolean> {
  const shortlist = await ShortlistCollection().findOne({
    userId: new ObjectId(userId),
    listingId: new ObjectId(listingId),
  });
  return shortlist !== null;
}

// Get all shortlisted listings for a user
export async function getShortlistsByUserId(
  userId: string,
): Promise<Shortlist[]> {
  const shortlists = await ShortlistCollection()
    .find({ userId: new ObjectId(userId) })
    .toArray();
  return shortlists;
}

// Get all users who have shortlisted a specific listing
export async function getUsersByListingId(
  listingId: string,
): Promise<Shortlist[]> {
  const shortlists = await ShortlistCollection()
    .find({ listingId: new ObjectId(listingId) })
    .toArray();
  return shortlists;
}

// Get shortlist with listing details
export async function getShortlistsWithListingDetails(
  userId: string,
): Promise<ShortlistWithListing[]> {
  const shortlists = await getShortlistsByUserId(userId);
  const listingIds = shortlists.map((s) => s.listingId);

  if (listingIds.length === 0) return [];

  // Import here to avoid circular dependency
  const { ListingCollection } = await import("./Listing");
  const listings = await ListingCollection()
    .find({ _id: { $in: listingIds } })
    .toArray();

  // Map shortlists to their corresponding listings
  return shortlists.map((shortlist) => {
    const listing = listings.find((l) => l._id.equals(shortlist.listingId));
    if (!listing) {
      throw new Error(`Listing not found for shortlist ${shortlist._id}`);
    }
    return {
      ...shortlist,
      listing,
    };
  });
}
