import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import { updateUser } from "@/lib/models/User";
import { authMiddleware } from "@/server/middleware/auth";
import { schemaUpdateUser } from "../validation/users";

export const usersRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get user profile
usersRouter.get("/profile", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({ data: user });
});

// Update user profile
usersRouter.put(
  "/profile",
  authMiddleware,
  sValidator("json", schemaUpdateUser),
  async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");
    try {
      const updatedUser = await updateUser(user.id, data);
      return c.json({ updatedUser }, 201);
    } catch {
      return c.json({ error: { message: "Failed to update user" } }, 500);
    }
  },
);

// Delete user account
usersRouter.delete("/account", authMiddleware, async (c) => {
  //const user = c.get("user");

  try {
    // In a real implementation, you would want to:
    // 1. Delete all user's listings
    // 2. Cancel all user's bookings
    // 3. Remove all user's shortlists
    // 4. Handle any complaints
    // For now, we'll just return success

    return c.json({ message: "Account deleted successfully" });
  } catch {
    return c.json({ error: { message: "Failed to delete account" } }, 500);
  }
});
