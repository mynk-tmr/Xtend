import { z } from "zod/v4";

// Image schema
export const ImageSchema = z.object({
  url: z.url(),
  isThumbnail: z.boolean(),
  public_id: z.url(),
});

// Location schema
export const LocationSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const PropertyTypeSchema = z.enum([
  "apartment",
  "house",
  "villa",
  "studio",
  "condo",
  "other",
]);

export const BookingStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const ComplaintStatusSchema = z.enum([
  "open",
  "investigating",
  "resolved",
  "dismissed",
]);

export const UserRoleSchema = z.enum(["user", "admin"]);

//types
export type PropertyTypeSchemaTypes = z.output<typeof PropertyTypeSchema>;
