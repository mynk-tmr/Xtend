import { z } from "zod/v4";
import { AmenityCategorySchema } from "./+others";

// Create amenity schema
export const schemaCreateAmenity = z.object({
  name: z.string().min(1, "Name is required"),
  category: AmenityCategorySchema,
  icon: z.string().min(1, "Icon identifier is required"),
  description: z.string().min(1, "Description is required"),
});

// Update amenity schema (partial)
export const schemaUpdateAmenity = schemaCreateAmenity.partial();

// Search amenities schema
export const schemaSearchAmenities = z.object({
  search: z.string().optional(),
  category: AmenityCategorySchema.optional(),
  limit: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
});

// Get amenities by category schema
export const schemaGetAmenitiesByCategory = z.object({
  category: AmenityCategorySchema,
  limit: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
});

// Amenity ID parameter schema
export const schemaAmenityId = z.object({
  id: z.string().min(1, "Amenity ID is required"),
});

// Batch operations schema
export const schemaBatchAmenities = z.object({
  amenities: z.array(schemaCreateAmenity),
});

// Export types
export type CreateAmenityInput = z.infer<typeof schemaCreateAmenity>;
export type UpdateAmenityInput = z.infer<typeof schemaUpdateAmenity>;
export type SearchAmenitiesInput = z.infer<typeof schemaSearchAmenities>;
export type GetAmenitiesByCategoryInput = z.infer<
  typeof schemaGetAmenitiesByCategory
>;
export type AmenityIdInput = z.infer<typeof schemaAmenityId>;
export type BatchAmenitiesInput = z.infer<typeof schemaBatchAmenities>;
