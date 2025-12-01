import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import {
  AccessHoursSchema,
  ImageSchema,
  LocationSchema,
  PriceSchema,
  StorageTypeSchema,
  type StorageTypeSchemaTypes,
} from "@/server/validation/+others";

// Storage Listing Schema with optional fields for different storage types
export const StorageListingSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: PriceSchema,
  location: LocationSchema,

  // Storage-specific fields
  storageType: StorageTypeSchema,
  area: z.number().positive(), // Square feet
  height: z.number().positive(), // Ceiling height in feet
  loadingCapacity: z.number().positive().optional(), // Weight capacity in kg/tons

  // Access and availability
  accessHours: AccessHoursSchema,

  // Self Storage fields
  unitNumber: z.string().optional(),
  floorLevel: z.number().int().positive().optional(),
  unitSize: z.enum(["small", "medium", "large", "extra_large"]).optional(),
  driveUpAccess: z.boolean().optional(),

  // Warehouse fields
  warehouseSize: z.enum(["small", "medium", "large"]).optional(),
  dockDoors: z.number().int().nonnegative().optional(),
  officeSpace: z.number().nonnegative().optional(),
  ceilingHeight: z.number().positive().optional(),
  sprinklerSystem: z.boolean().optional(),
  forkliftAvailable: z.boolean().optional(),
  truckAccess: z.boolean().optional(),

  // Commercial fields
  businessType: z
    .enum(["retail", "restaurant", "office", "pharmacy", "other"])
    .optional(),
  shelvingIncluded: z.boolean().optional(),
  displayArea: z.boolean().optional(),
  customerAccess: z.boolean().optional(),
  loadingDock: z.boolean().optional(),

  // Vehicle fields
  vehicleType: z.enum(["car", "rv", "boat", "motorcycle", "fleet"]).optional(),
  coveredParking: z.boolean().optional(),
  securityGuard: z.boolean().optional(),
  washBay: z.boolean().optional(),
  maintenanceArea: z.boolean().optional(),
  chargingStation: z.boolean().optional(),

  // Specialized fields
  specialtyType: z
    .enum(["wine", "art", "antique", "electronics", "documents"])
    .optional(),
  temperatureRange: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  humidityControl: z.boolean().optional(),
  lightControl: z.boolean().optional(),
  vibrationControl: z.boolean().optional(),
  airQualityControl: z.boolean().optional(),

  // Workshop fields
  workshopType: z
    .enum(["woodworking", "auto", "art", "maker", "general"])
    .optional(),
  ventilationSystem: z.boolean().optional(),
  powerSupply: z.number().positive().optional(),
  workbenches: z.boolean().optional(),
  toolStorage: z.boolean().optional(),
  soundProofing: z.boolean().optional(),

  // Coworking fields
  spaceType: z.enum(["hybrid", "flexible", "popup"]).optional(),
  meetingRooms: z.boolean().optional(),
  wifiIncluded: z.boolean().optional(),
  kitchenAccess: z.boolean().optional(),
  receptionService: z.boolean().optional(),

  // Agricultural fields
  agricultureType: z
    .enum(["grain", "equipment", "produce", "livestock", "other"])
    .optional(),
  drainageSystem: z.boolean().optional(),
  loadingEquipment: z.boolean().optional(),

  // Common fields
  climateControlled: z.boolean().optional(),
  individualAlarm: z.boolean().optional(),
  pestControl: z.boolean().optional(),

  amenities: z.array(z.instanceof(ObjectId)), // References to Amenity documents
  images: z.array(ImageSchema).optional(),
  tenantId: z.instanceof(ObjectId),
  isAvailable: z.boolean().default(true),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from schema
export type StorageListing = z.infer<typeof StorageListingSchema>;

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

  const result = await ListingCollection().insertOne(listing as any);
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
    { $set: { ...updateData, updatedAt: new Date() } as any },
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
    climateControlled?: boolean;
    temperatureControlled?: boolean;
    amenities?: string[];
  } = {},
  limit: number = 10,
  skip: number = 0,
): Promise<Listing[]> {
  const query: any = {};

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

  if (filters.climateControlled !== undefined) {
    query.climateControlled = filters.climateControlled;
  }

  if (filters.temperatureControlled !== undefined) {
    query.temperatureControlled = filters.temperatureControlled;
  }

  if (filters.amenities && filters.amenities.length > 0) {
    query.amenities = { $in: filters.amenities.map((id) => new ObjectId(id)) };
  }

  const listings = await ListingCollection()
    .find(query)
    .limit(limit)
    .skip(skip)
    .toArray();
  return listings;
}
