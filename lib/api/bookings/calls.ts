import type {
  ClientBooking,
  CreateBookingData,
  UpdateBookingData,
} from "@/types";
import api from "../client";

// Re-export types for convenience
export type { ClientBooking, CreateBookingData, UpdateBookingData };

// Get user's bookings as renter
export async function getBookings() {
  return api.get("bookings").json<{ data: ClientBooking[] }>();
}

// Get booking requests for user's listings (as tenant)
export async function getBookingRequests() {
  return api.get("bookings/requests").json<{ data: ClientBooking[] }>();
}

// Get a single booking by ID
export async function getBookingById(id: string) {
  return api.get(`bookings/${id}`).json<{ data: ClientBooking }>();
}

// Create a new booking
export async function createBooking(data: CreateBookingData) {
  return api.post("bookings", { json: data }).json<{ data: ClientBooking }>();
}

// Update a booking (approve/reject/cancel)
export async function updateBooking({
  id,
  data,
}: {
  id: string;
  data: UpdateBookingData;
}) {
  return api
    .put(`bookings/${id}`, { json: data })
    .json<{ data: ClientBooking }>();
}

// Delete a booking
export async function deleteBooking(id: string) {
  return api.delete(`bookings/${id}`).json<{ message: string }>();
}
