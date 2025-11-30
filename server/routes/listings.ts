import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import {
  createListing,
  deleteListing,
  findAllListings,
  findListingById,
  findListingsByTenantId,
  searchListings,
  updateListing,
} from "@/lib/models/Listing";
import { authMiddleware } from "@/server/middleware/auth";
import {
  schemaCreateListing,
  schemaSearchParams,
  schemaUpdateListing,
} from "../validation/listings";

export const listingsRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get all listings with search, filter, pagination
listingsRouter.get("/", sValidator("query", schemaSearchParams), async (c) => {
  const params = c.req.valid("query");
  const { search, limit = 10, skip = 0, ...filters } = params;

  try {
    let listings = null;
    if (search) {
      listings = await searchListings(search, Number(limit), Number(skip));
    } else {
      listings = await findAllListings(filters, Number(limit), Number(skip));
    }
    return c.json({ data: listings });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch listings" } }, 500);
  }
});

// Get listing by ID
listingsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const listing = await findListingById(id);
    if (!listing) {
      return c.json({ error: { message: "Listing not found" } }, 404);
    }
    return c.json({ data: listing });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch listing" } }, 500);
  }
});

// Create new listing
listingsRouter.post(
  "/",
  authMiddleware,
  sValidator("json", schemaCreateListing),
  async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");

    try {
      const listing = await createListing({
        ...data,
        tenantId: new (require("mongodb").ObjectId)(user.id),
      });
      return c.json({ data: listing }, 201);
    } catch (_error) {
      return c.json({ error: { message: "Failed to create listing" } }, 500);
    }
  },
);

// Update listing
listingsRouter.put(
  "/:id",
  authMiddleware,
  sValidator("json", schemaUpdateListing),
  async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const data = c.req.valid("json");

    try {
      // First check if the listing exists and belongs to the user
      const existingListing = await findListingById(id);
      if (!existingListing) {
        return c.json({ error: { message: "Listing not found" } }, 404);
      }

      if (existingListing.tenantId.toString() !== user.id) {
        return c.json({ error: { message: "Unauthorized" } }, 403);
      }

      const updatedListing = await updateListing(id, data);
      return c.json({ data: updatedListing });
    } catch (_error) {
      return c.json({ error: { message: "Failed to update listing" } }, 500);
    }
  },
);

// Delete listing
listingsRouter.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  try {
    // First check if the listing exists and belongs to the user
    const existingListing = await findListingById(id);
    if (!existingListing) {
      return c.json({ error: { message: "Listing not found" } }, 404);
    }

    if (existingListing.tenantId.toString() !== user.id) {
      return c.json({ error: { message: "Unauthorized" } }, 403);
    }

    const deleted = await deleteListing(id);
    if (!deleted) {
      return c.json({ error: { message: "Failed to delete listing" } }, 500);
    }
    return c.json({ message: "Listing deleted successfully" });
  } catch (_error) {
    return c.json({ error: { message: "Failed to delete listing" } }, 500);
  }
});

// Get user's listings
listingsRouter.get("/user/listings", authMiddleware, async (c) => {
  const user = c.get("user");

  try {
    const listings = await findListingsByTenantId(user.id);
    return c.json({ data: listings });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to fetch user's listings" } },
      500,
    );
  }
});
