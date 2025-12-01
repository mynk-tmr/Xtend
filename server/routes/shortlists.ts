import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import { authMiddleware } from "@/server/middleware/auth";
import {
  addToShortlist,
  getShortlistsWithListingDetails,
  isInShortlist,
  removeFromShortlist,
} from "@/server/models/Shortlist";

export const shortlistsRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get user's shortlists
shortlistsRouter.get("/", authMiddleware, async (c) => {
  const user = c.get("user");

  try {
    const shortlists = await getShortlistsWithListingDetails(user.id);
    return c.json({ data: shortlists });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch shortlists" } }, 500);
  }
});

// Add listing to shortlist
shortlistsRouter.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const { listingId } = await c.req.json();

  try {
    // Check if already shortlisted
    const alreadyShortlisted = await isInShortlist(user.id, listingId);
    if (alreadyShortlisted) {
      return c.json({ error: { message: "Already shortlisted" } }, 409);
    }

    const shortlist = await addToShortlist(user.id, listingId);
    return c.json({ data: shortlist }, 201);
  } catch (_error) {
    return c.json({ error: { message: "Failed to add to shortlist" } }, 500);
  }
});

// Remove listing from shortlist
shortlistsRouter.delete("/:listingId", authMiddleware, async (c) => {
  const user = c.get("user");
  const listingId = c.req.param("listingId");

  try {
    const removed = await removeFromShortlist(user.id, listingId);
    if (!removed) {
      return c.json({ error: { message: "Not found in shortlist" } }, 404);
    }
    return c.json({ message: "Removed from shortlist" });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to remove from shortlist" } },
      500,
    );
  }
});

// Check if listing is in shortlist
shortlistsRouter.get("/check/:listingId", authMiddleware, async (c) => {
  const user = c.get("user");
  const listingId = c.req.param("listingId");

  try {
    const isShortlisted = await isInShortlist(user.id, listingId);
    return c.json({ data: { isShortlisted } });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to check shortlist status" } },
      500,
    );
  }
});
