import { treeifyError, z } from "zod/v4";

const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  DB_NAME: z.string().min(1),

  // Authentication
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "Better Auth secret must be at least 32 characters"),
  BETTER_AUTH_URL: z.url("Better Auth URL must be a valid URL"),

  // Email Service
  RESEND_API_KEY: z.string().min(1, "Resend API key is required"),
  FROM_EMAIL: z.email("From email must be a valid email"),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary cloud name is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "Cloudinary API key is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "Cloudinary API secret is required"),

  // Mapbox
  MAPBOX_ACCESS_TOKEN: z.string().min(1, "Mapbox access token is required"),

  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Validate environment variables
const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error(treeifyError(envValidation.error));
  process.exit(1);
}

export const typedEnv = envValidation.data;
