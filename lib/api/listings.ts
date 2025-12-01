import type { z } from "zod/v4";
import type { StorageListing } from "@/server/models/Listing";
// Import validation schemas to reuse types
import type {
  schemaCreateListing,
  schemaSearchParams,
} from "@/server/validation/listings";
import api from "./client";

export type ListingSearchParams = z.infer<typeof schemaSearchParams>;
export type CreateListingData = Omit<
  z.infer<typeof schemaCreateListing>,
  "amenities"
> & {
  amenities: string[];
};
export type UpdateListingData = Partial<CreateListingData>;

// Get all listings with optional search and filters
export async function getListings(params?: ListingSearchParams) {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === "object") {
          searchParams.set(key, JSON.stringify(value));
        } else {
          searchParams.set(key, String(value));
        }
      }
    });
  }

  return api
    .get("listings", {
      searchParams,
    })
    .json<{ data: StorageListing[] }>();
}

// Get a single listing by ID
export async function getListingById(id: string) {
  return api.get(`listings/${id}`).json<{ data: StorageListing }>();
}

// Create a new listing
export async function createListing(data: CreateListingData) {
  return api
    .post("listings", {
      json: data,
    })
    .json<{ data: StorageListing }>();
}

// Update a listing
export async function updateListing(id: string, data: UpdateListingData) {
  return api
    .put(`listings/${id}`, {
      json: data,
    })
    .json<{ data: StorageListing }>();
}

// Delete a listing
export async function deleteListing(id: string) {
  return api.delete(`listings/${id}`).json<{ message: string }>();
}

// Get current user's listings
export async function getUserListings() {
  return api.get("listings/user/listings").json<{ data: StorageListing[] }>();
}

// Toggle listing availability
export async function toggleListingAvailability(
  id: string,
  isAvailable: boolean,
) {
  return api
    .put(`listings/${id}`, {
      json: { isAvailable },
    })
    .json<{ data: StorageListing }>();
}
