import { z } from "zod/v4";
import { StorageListingSchema } from "../models/Listing";
import { AccessHoursSchema, StorageTypeSchema } from "./+others";

// Create listing schema with optional fields for different storage types
export const schemaCreateListing = StorageListingSchema.omit({
  _id: true,
});

// Update schema (partial version of create schema)
export const schemaUpdateListing = schemaCreateListing.partial();

// Search parameters schema
export const schemaSearchParams = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
  storageType: StorageTypeSchema.optional(),
  areaRange: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .optional(),
  accessType: AccessHoursSchema.optional(),
  amenitiesId: z.array(z.string()).optional(),
  temperatureControlled: z.boolean().optional(),
  climateControlled: z.boolean().optional(),
  vehicleType: z
    .enum(["car", "rv", "boat", "motorcycle", "fleet"])
    .array()
    .optional(),
  businessType: z
    .enum(["retail", "restaurant", "office", "pharmacy", "other"])
    .array()
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  priceRange: z
    .object({
      min: z.number().positive().optional(),
      max: z.number().positive().optional(),
    })
    .optional(),
  priceBasis: z.enum(["month", "day", "week"]).optional(),
  sortBy: z.enum(["price", "area", "newest", "rating"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type SearchParamsValues = z.infer<typeof schemaSearchParams>;
