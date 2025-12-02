import type { QueryClient } from "@tanstack/react-query";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  getUserListings,
  type ListingSearchParams,
  toggleListingAvailability,
  updateListing,
} from "./calls";

// Query keys
export const listingKeys = {
  all: ["listings"] as const,
  lists: () => [...listingKeys.all, "list"] as const,
  list: (params: ListingSearchParams) =>
    [...listingKeys.lists(), params] as const,
  details: () => [...listingKeys.all, "detail"] as const,
  detail: (id: string) => [...listingKeys.details(), id] as const,
  user: () => [...listingKeys.all, "user"] as const,
};

// Get options for all listings with optional search and filters
export function getListingsOptions(params?: ListingSearchParams) {
  return queryOptions({
    queryKey: listingKeys.list(params || {}),
    queryFn: () => getListings(params),
    select: (data) => data.data,
  });
}

// Get options for a single listing by ID
export function getListingOptions(id: string) {
  return queryOptions({
    queryKey: listingKeys.detail(id),
    queryFn: () => getListingById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

// Get options for current user's listings
export function getUserListingsOptions() {
  return queryOptions({
    queryKey: listingKeys.user(),
    queryFn: getUserListings,
    select: (data) => data.data,
  });
}

// Get options for creating a new listing
export function getCreateListingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: createListing,
    onSuccess: () => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Get options for updating a listing
export function getUpdateListingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: updateListing,
    onSuccess: ({ data: { _id } }) => {
      // Invalidate and refetch updated listing
      if (_id) {
        queryClient.invalidateQueries({
          queryKey: listingKeys.detail(_id.toString()),
        });
      }
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Get options for deleting a listing
export function getDeleteListingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: deleteListing,
    onSuccess: () => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Get options for toggling listing availability
export function getToggleListingAvailabilityOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: toggleListingAvailability,
    onSuccess: ({ data: { _id } }) => {
      // Invalidate and refetch updated listing
      if (_id) {
        queryClient.invalidateQueries({
          queryKey: listingKeys.detail(_id.toString()),
        });
      }
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}
