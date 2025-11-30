import { z } from "zod/v4";
import { ComplaintStatusSchema } from "./+others";

export const schemaCreateComplaint = z.object({
  respondentId: z.string().optional(),
  listingId: z.string().optional(),
  subject: z.string().min(1),
  description: z.string().min(1),
});

export const schemaUpdateComplaint = z.object({
  status: ComplaintStatusSchema,
  adminNotes: z.string().optional(),
});
