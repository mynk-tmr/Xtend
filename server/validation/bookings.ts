import { z } from "zod/v4";
import { BookingStatusSchema } from "./+others";

export const schemaCreateBooking = z.object({
  listingId: z.string().min(1),
  message: z.string().optional(),
});

export const schemaUpdateBooking = z.object({
  status: BookingStatusSchema,
  responseMessage: z.string().optional(),
});
