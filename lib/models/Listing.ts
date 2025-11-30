import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import {
  ImageSchema,
  LocationSchema,
  PropertyTypeSchema,
} from "../../server/validation/+others";
import { db } from "../db";

// Zod schema for Listing validation
export const ListingSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  location: LocationSchema,
  propertyType: PropertyTypeSchema,
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().positive(),
  maxGuests: z.number().int().positive(),
  amenities: z.array(z.string()),
  images: z.array(ImageSchema).optional(),
  tenantId: z.instanceof(ObjectId),
  isAvailable: z.boolean().default(true),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from schema
export type Listing = z.infer<typeof ListingSchema>;

// Collection name
export const LISTING_COLLECTION = "listings";

// Helper functions for Listing operations
export const ListingCollection = () =>
  db.collection<Listing>(LISTING_COLLECTION);

// Create a new listing
export async function createListing(
  listingData: Omit<Listing, "_id" | "createdAt" | "updatedAt">,
): Promise<Listing> {
  const listing = {
    ...listingData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await ListingCollection().insertOne(listing);
  return { ...listing, _id: result.insertedId };
}

// Find listing by ID
export async function findListingById(id: string): Promise<Listing | null> {
  const listing = await ListingCollection().findOne({ _id: new ObjectId(id) });
  return listing;
}

// Find all listings with optional filters
export async function findAllListings(
  filters: Partial<Omit<Listing, "_id" | "createdAt" | "updatedAt">> = {},
  limit: number = 10,
  skip: number = 0,
): Promise<Listing[]> {
  const listings = await ListingCollection()
    .find(filters)
    .limit(limit)
    .skip(skip)
    .toArray();
  return listings;
}

// Update listing
export async function updateListing(
  id: string,
  updateData: Partial<Omit<Listing, "_id" | "createdAt">>,
): Promise<Listing | null> {
  const result = await ListingCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } },
  );

  if (result.matchedCount === 0) return null;
  return findListingById(id);
}

// Delete listing
export async function deleteListing(id: string): Promise<boolean> {
  const result = await ListingCollection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Find listings by tenant ID
export async function findListingsByTenantId(
  tenantId: string,
): Promise<Listing[]> {
  const listings = await ListingCollection()
    .find({ tenantId: new ObjectId(tenantId) })
    .toArray();
  return listings;
}

// Search listings by text
export async function searchListings(
  searchText: string,
  limit: number = 10,
  skip: number = 0,
): Promise<Listing[]> {
  const listings = await ListingCollection()
    .find({
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { "location.city": { $regex: searchText, $options: "i" } },
        { "location.country": { $regex: searchText, $options: "i" } },
      ],
    })
    .limit(limit)
    .skip(skip)
    .toArray();
  return listings;
}
