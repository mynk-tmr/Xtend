import { z } from "zod/v4";
import { ImageSchema, LocationSchema, PropertyTypeSchema } from "./+others";

export const schemaCreateListing = z.object({
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
  isAvailable: z.boolean().default(true),
});

export const schemaUpdateListing = schemaCreateListing.partial();

export const schemaSearchParams = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
  propertyType: PropertyTypeSchema.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});
