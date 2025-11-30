import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { UserRoleSchema } from "@/server/validation/+others";
import { db } from "../db";

// Zod schema for User validation
export const UserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().optional(),
  avatar: z.url().optional(),
  role: UserRoleSchema.default("user"),
  isEmailVerified: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from the schema
export type User = z.infer<typeof UserSchema>;

// Collection name
export const USER_COLLECTION = "users";

// Helper functions for User operations
export const UserCollection = () => db.collection<User>(USER_COLLECTION);

// Create a new user
export async function createUser(
  userData: Omit<User, "_id" | "createdAt" | "updatedAt">,
): Promise<User> {
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await UserCollection().insertOne(user);
  return { ...user, _id: result.insertedId };
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await UserCollection().findOne({ email });
  return user;
}

// Find user by ID
export async function findUserById(id: string): Promise<User | null> {
  const user = await UserCollection().findOne({ _id: new ObjectId(id) });
  return user;
}

// Update user
export async function updateUser(
  id: string,
  updateData: Partial<Omit<User, "_id" | "createdAt">>,
): Promise<User | null> {
  const result = await UserCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } },
  );

  if (result.matchedCount === 0) return null;
  return findUserById(id);
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  const result = await UserCollection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
