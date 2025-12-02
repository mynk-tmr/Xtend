import { type Filter, ObjectId } from "mongodb";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import {
  AccessHoursSchema,
  AgriculturalUnitDetailsSchema,
  CommercialUnitDetailsSchema,
  CoworkingUnitDetailsSchema,
  ImageSchema,
  LocationSchema,
  PriceSchema,
  SelfStorageUnitDetailsSchema,
  SpecializedUnitDetailsSchema,
  StorageTypeSchema,
  type StorageTypeSchemaTypes,
  VehicleUnitDetailsSchema,
  WarehouseUnitDetailsSchema,
  WorkshopUnitDetailsSchema,
} from "@/server/validation/+others";

// Storage Listing Schema with optional fields for different storage types
export const StorageListingSchema = z
  .object({
    _id: z.instanceof(ObjectId).optional(),
    tenantId: z.instanceof(ObjectId),
    isAvailable: z.boolean().default(true),

    //describe
    title: z.string().min(1),
    description: z.string().min(1),
    price: PriceSchema,
    location: LocationSchema,
    storageType: StorageTypeSchema,
    area: z.number().positive(), // Square feet
    height: z.number().positive(), // Ceiling height in feet
    loadingCapacity: z.number().positive().optional(), // Weight capacity in kg/tons
    accessHours: AccessHoursSchema,
    amenitiesId: z.array(z.instanceof(ObjectId)), // References to Amenity documents
    images: z.array(ImageSchema).optional(),

    //timestamps
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .extend(SelfStorageUnitDetailsSchema.partial().shape)
  .extend(WarehouseUnitDetailsSchema.partial().shape)
  .extend(CommercialUnitDetailsSchema.partial().shape)
  .extend(VehicleUnitDetailsSchema.partial().shape)
  .extend(SpecializedUnitDetailsSchema.partial().shape)
  .extend(WorkshopUnitDetailsSchema.partial().shape)
  .extend(CoworkingUnitDetailsSchema.partial().shape)
  .extend(AgriculturalUnitDetailsSchema.partial().shape);

// TypeScript type derived from schema
export type StorageListing = z.output<typeof StorageListingSchema>;

// Legacy Listing type for backward compatibility
export const ListingSchema = StorageListingSchema;
export type Listing = StorageListing;

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
  return { ...listing, _id: result.insertedId } as Listing;
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

// Search listings by storage type and other filters
export async function searchStorageListings(
  filters: {
    storageType?: StorageTypeSchemaTypes;
    areaRange?: { min: number; max: number };
    priceRange?: { min: number; max: number };
    city?: string;
    state?: string;
    amenities?: string[];
  } = {},
  limit: number = 10,
  skip: number = 0,
): Promise<Listing[]> {
  const query: Filter<Listing> = {};

  if (filters.storageType) {
    query.storageType = filters.storageType;
  }

  if (filters.areaRange) {
    query.area = {};
    if (filters.areaRange.min) query.area.$gte = filters.areaRange.min;
    if (filters.areaRange.max) query.area.$lte = filters.areaRange.max;
  }

  if (filters.priceRange) {
    query["price.value"] = {};
    if (filters.priceRange.min)
      query["price.value"].$gte = filters.priceRange.min;
    if (filters.priceRange.max)
      query["price.value"].$lte = filters.priceRange.max;
  }

  if (filters.city) {
    query["location.city"] = { $regex: filters.city, $options: "i" };
  }

  if (filters.state) {
    query["location.state"] = { $regex: filters.state, $options: "i" };
  }

  if (filters.amenities && filters.amenities.length > 0) {
    query.amenitiesId = {
      $in: filters.amenities.map((id) => new ObjectId(id)),
    };
  }

  const listings = await ListingCollection()
    .find(query)
    .limit(limit)
    .skip(skip)
    .toArray();
  return listings;
}
