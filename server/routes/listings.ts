import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import { authMiddleware } from "@/server/middleware/auth";
import {
  createListing,
  deleteListing,
  findAllListings,
  findListingById,
  findListingsByTenantId,
  searchListings,
  updateListing,
} from "@/server/models/Listing";
import {
  schemaCreateListing,
  schemaSearchParams,
  schemaUpdateListing,
} from "../validation/listings";

export const listingsRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get all listings with search, filter, pagination
listingsRouter.get("/", sValidator("query", schemaSearchParams), async (c) => {
  const params = c.req.valid("query");
  const {
    search,
    limit = 10,
    skip = 0,
    businessType,
    amenities,
    vehicleType,
    ...filters
  } = params;

  try {
    let listings = null;
    if (search) {
      listings = await searchListings(search, Number(limit), Number(skip));
    } else {
      // Convert array filters to single values for the model
      const processedFilters = {
        ...filters,
        // Handle businessType array - take first value if array exists
        ...(businessType &&
          businessType.length > 0 && { businessType: businessType[0] }),
        // Handle vehicleType array - take first value if array exists
        ...(vehicleType &&
          vehicleType.length > 0 && { vehicleType: vehicleType[0] }),
        // Convert string amenities to ObjectIds if they exist
        ...(amenities &&
          amenities.length > 0 && {
            amenities: amenities.map(
              (id) => new (require("mongodb").ObjectId)(id),
            ),
          }),
      };
      listings = await findAllListings(
        processedFilters,
        Number(limit),
        Number(skip),
      );
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
      // Convert string amenities to ObjectIds
      const processedData = {
        ...data,
        amenities: data.amenities.map(
          (id) => new (require("mongodb").ObjectId)(id),
        ),
        tenantId: new (require("mongodb").ObjectId)(user.id),
      };
      const listing = await createListing(processedData);
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

      // Convert string amenities to ObjectIds if present
      const processedData = {
        ...data,
        ...(data.amenities && {
          amenities: data.amenities.map(
            (id) => new (require("mongodb").ObjectId)(id),
          ),
        }),
      };
      const updatedListing = await updateListing(id, processedData);
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
