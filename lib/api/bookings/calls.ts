import type { z } from "zod/v4";
import type { Booking } from "@/server/models/Booking";
import type {
  schemaCreateBooking,
  schemaUpdateBooking,
} from "@/server/validation/bookings";
import api from "../client";

export type CreateBookingData = z.infer<typeof schemaCreateBooking>;
export type UpdateBookingData = z.infer<typeof schemaUpdateBooking>;

// Get user's bookings as renter
export async function getBookings() {
  return api.get("bookings").json<{ data: Booking[] }>();
}

// Get booking requests for user's listings (as tenant)
export async function getBookingRequests() {
  return api.get("bookings/requests").json<{ data: Booking[] }>();
}

// Get a single booking by ID
export async function getBookingById(id: string) {
  return api.get(`bookings/${id}`).json<{ data: Booking }>();
}

// Create a new booking
export async function createBooking(data: CreateBookingData) {
  return api.post("bookings", { json: data }).json<{ data: Booking }>();
}

// Update a booking (approve/reject/cancel)
export async function updateBooking({
  id,
  data,
}: {
  id: string;
  data: UpdateBookingData;
}) {
  return api.put(`bookings/${id}`, { json: data }).json<{ data: Booking }>();
}

// Delete a booking
export async function deleteBooking(id: string) {
  return api.delete(`bookings/${id}`).json<{ message: string }>();
}
