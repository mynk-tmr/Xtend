import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { BookingStatusSchema } from "@/server/validation/+others";
import { db } from "../db";

// Zod schema for Booking validation
export const BookingSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  listingId: z.instanceof(ObjectId),
  renterId: z.instanceof(ObjectId),
  status: BookingStatusSchema.default("pending"),
  message: z.string().optional(),
  responseMessage: z.string().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from the schema
export type Booking = z.infer<typeof BookingSchema>;

// Collection name
export const BOOKING_COLLECTION = "bookings";

// Helper functions for Booking operations
export const BookingCollection = () =>
  db.collection<Booking>(BOOKING_COLLECTION);

// Create a new booking
export async function createBooking(
  bookingData: Omit<Booking, "_id" | "createdAt" | "updatedAt">,
): Promise<Booking> {
  const booking = {
    ...bookingData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await BookingCollection().insertOne(booking);
  return { ...booking, _id: result.insertedId };
}

// Find booking by ID
export async function findBookingById(id: string): Promise<Booking | null> {
  const booking = await BookingCollection().findOne({ _id: new ObjectId(id) });
  return booking;
}

// Find all bookings for a user as renter
export async function findBookingsByRenterId(
  renterId: string,
): Promise<Booking[]> {
  const bookings = await BookingCollection()
    .find({ renterId: new ObjectId(renterId) })
    .toArray();
  return bookings;
}

// Find all booking requests for a user as tenant
export async function findBookingsByTenantId(
  tenantId: string,
): Promise<Booking[]> {
  // First, find all listings owned by the tenant
  const { ListingCollection } = await import("./Listing");
  const listings = await ListingCollection()
    .find({ tenantId: new ObjectId(tenantId) })
    .toArray();

  const listingIds = listings.map((listing) => listing._id);

  // Then find all bookings for those listings
  const bookings = await BookingCollection()
    .find({ listingId: { $in: listingIds } })
    .toArray();

  return bookings;
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: Booking["status"],
  responseMessage?: string,
): Promise<Booking | null> {
  const updateData: Partial<Booking> = { status, updatedAt: new Date() };
  if (responseMessage) {
    updateData.responseMessage = responseMessage;
  }

  const result = await BookingCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData },
  );

  if (result.matchedCount === 0) return null;
  return findBookingById(id);
}

// Delete booking
export async function deleteBooking(id: string): Promise<boolean> {
  const result = await BookingCollection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Check if a booking already exists for a listing and renter
export async function findExistingBooking(
  listingId: string,
  renterId: string,
): Promise<Booking | null> {
  const booking = await BookingCollection().findOne({
    listingId: new ObjectId(listingId),
    renterId: new ObjectId(renterId),
    status: { $in: ["pending", "approved"] },
  });
  return booking;
}
