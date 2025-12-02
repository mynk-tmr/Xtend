import type {
  ClientListing,
  CreateListingData,
  ListingSearchParams,
  UpdateListingData,
} from "@/types";
import api from "../client";

// Re-export types for convenience
export type {
  ClientListing,
  CreateListingData,
  UpdateListingData,
  ListingSearchParams,
};

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
    .json<{ data: ClientListing[] }>();
}

// Get a single listing by ID
export async function getListingById(id: string) {
  return api.get(`listings/${id}`).json<{ data: ClientListing }>();
}

// Create a new listing
export async function createListing(data: CreateListingData) {
  return api
    .post("listings", {
      json: data,
    })
    .json<{ data: ClientListing }>();
}

// Update a listing
export async function updateListing(input: {
  id: string;
  data: UpdateListingData;
}) {
  return api
    .put(`listings/${input.id}`, {
      json: input.data,
    })
    .json<{ data: ClientListing }>();
}

// Delete a listing
export async function deleteListing(id: string) {
  return api.delete(`listings/${id}`).json<{ message: string }>();
}

// Get current user's listings
export async function getUserListings() {
  return api.get("listings/user/listings").json<{ data: ClientListing[] }>();
}

// Toggle listing availability
export async function toggleListingAvailability(input: {
  id: string;
  isAvailable: boolean;
}) {
  return api
    .put(`listings/${input.id}`, {
      json: { isAvailable: input.isAvailable },
    })
    .json<{ data: ClientListing }>();
}
