import { z } from "zod/v4";

export const schemaUpdateUser = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().optional(),
  avatar: z.url().optional(),
});
