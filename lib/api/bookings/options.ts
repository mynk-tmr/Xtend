import type { QueryClient } from "@tanstack/react-query";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookingRequests,
  getBookings,
  updateBooking,
} from "./calls";

// Query keys
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (type: "user" | "requests") => [...bookingKeys.lists(), type] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
};

// Get options for user's bookings as renter
export function getBookingsOptions() {
  return queryOptions({
    queryKey: bookingKeys.list("user"),
    queryFn: () => getBookings(),
    select: (data) => data.data,
  });
}

// Get options for booking requests for user's listings (as tenant)
export function getBookingRequestsOptions() {
  return queryOptions({
    queryKey: bookingKeys.list("requests"),
    queryFn: () => getBookingRequests(),
    select: (data) => data.data,
  });
}

// Get options for a single booking by ID
export function getBookingOptions(id: string) {
  return queryOptions({
    queryKey: bookingKeys.detail(id),
    queryFn: () => getBookingById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

// Get options for creating a new booking
export function getCreateBookingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: createBooking,
    onSuccess: () => {
      // Invalidate and refetch bookings
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}

// Get options for updating a booking (approve/reject/cancel)
export function getUpdateBookingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: updateBooking,
    onSuccess: (_: unknown, { id }: { id: string }) => {
      // Invalidate and refetch updated booking
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}

// Get options for deleting a booking
export function getDeleteBookingOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: deleteBooking,
    onSuccess: () => {
      // Invalidate and refetch bookings
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}
