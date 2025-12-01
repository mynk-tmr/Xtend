import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type CreateListingData,
  createListing,
  deleteListing,
  getListingById,
  getListings,
  getUserListings,
  type ListingSearchParams,
  toggleListingAvailability,
  type UpdateListingData,
  updateListing,
} from "@/lib/api/listings";

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

// Get all listings with optional search and filters
export function useListings(params?: ListingSearchParams) {
  return useQuery({
    queryKey: listingKeys.list(params || {}),
    queryFn: () => getListings(params),
    select: (data) => data.data,
  });
}

// Get a single listing by ID
export function useListing(id: string) {
  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: () => getListingById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

// Get current user's listings
export function useUserListings() {
  return useQuery({
    queryKey: listingKeys.user(),
    queryFn: () => getUserListings(),
    select: (data) => data.data,
  });
}

// Create a new listing
export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListingData) => createListing(data),
    onSuccess: () => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Update a listing
export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListingData }) =>
      updateListing(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the updated listing
      queryClient.invalidateQueries({ queryKey: listingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Delete a listing
export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: () => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}

// Toggle listing availability
export function useToggleListingAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      toggleListingAvailability(id, isAvailable),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the updated listing
      queryClient.invalidateQueries({ queryKey: listingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.user() });
    },
  });
}
