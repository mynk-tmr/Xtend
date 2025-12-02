import type { z } from "zod/v4";
import { StorageListingSchema } from "@/server/models/Listing";

// Transform ObjectId to string for client-side
export const StorageListingClientSchema = StorageListingSchema.transform(
  (data) => ({
    ...data,
    _id: data._id?.toString(),
    tenantId: data.tenantId.toString(),
    amenitiesId: data.amenitiesId.map((id: any) => id.toString()),
  }),
);

export type StorageListingClient = z.infer<typeof StorageListingClientSchema>;
