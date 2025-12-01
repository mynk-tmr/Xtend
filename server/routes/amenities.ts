import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import { adminAuthMiddleware } from "@/server/middleware/auth";
import {
  type Amenity,
  createAmenity,
  deleteAmenity,
  findAllAmenities,
  findAmenitiesByCategory,
  findAmenityById,
  initializePredefinedAmenities,
  searchAmenities,
  updateAmenity,
} from "@/server/models/Amenity";
import {
  schemaAmenityId,
  schemaBatchAmenities,
  schemaCreateAmenity,
  schemaGetAmenitiesByCategory,
  schemaSearchAmenities,
  schemaUpdateAmenity,
} from "../validation/amenities";

export const amenitiesRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get all amenities with optional search and filters
amenitiesRouter.get(
  "/",
  sValidator("query", schemaSearchAmenities),
  async (c) => {
    const params = c.req.valid("query");
    const { search, category, limit = 50, skip = 0 } = params;

    try {
      let amenities: Amenity[];

      if (search) {
        amenities = await searchAmenities(search, Number(limit), Number(skip));
      } else if (category) {
        amenities = await findAmenitiesByCategory(
          category,
          Number(limit),
          Number(skip),
        );
      } else {
        amenities = await findAllAmenities({}, Number(limit), Number(skip));
      }

      return c.json({ data: amenities });
    } catch (_error) {
      return c.json({ error: { message: "Failed to fetch amenities" } }, 500);
    }
  },
);

// Get amenity by ID
amenitiesRouter.get("/:id", sValidator("param", schemaAmenityId), async (c) => {
  const { id } = c.req.valid("param");

  try {
    const amenity = await findAmenityById(id);
    if (!amenity) {
      return c.json({ error: { message: "Amenity not found" } }, 404);
    }
    return c.json({ data: amenity });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch amenity" } }, 500);
  }
});

// Create new amenity (admin only)
amenitiesRouter.post(
  "/",
  adminAuthMiddleware,
  sValidator("json", schemaCreateAmenity),
  async (c) => {
    const data = c.req.valid("json");

    try {
      const amenity = await createAmenity(data);
      return c.json({ data: amenity }, 201);
    } catch (_error) {
      return c.json({ error: { message: "Failed to create amenity" } }, 500);
    }
  },
);

// Update amenity (admin only)
amenitiesRouter.put(
  "/:id",
  adminAuthMiddleware,
  sValidator("param", schemaAmenityId),
  sValidator("json", schemaUpdateAmenity),
  async (c) => {
    const { id } = c.req.valid("param");
    const updateData = c.req.valid("json");

    try {
      const updatedAmenity = await updateAmenity(id, updateData);
      if (!updatedAmenity) {
        return c.json({ error: { message: "Amenity not found" } }, 404);
      }
      return c.json({ data: updatedAmenity });
    } catch (_error) {
      return c.json({ error: { message: "Failed to update amenity" } }, 500);
    }
  },
);

// Delete amenity (admin only)
amenitiesRouter.delete(
  "/:id",
  adminAuthMiddleware,
  sValidator("param", schemaAmenityId),
  async (c) => {
    const { id } = c.req.valid("param");

    try {
      const deleted = await deleteAmenity(id);
      if (!deleted) {
        return c.json({ error: { message: "Amenity not found" } }, 404);
      }
      return c.json({ message: "Amenity deleted successfully" });
    } catch (_error) {
      return c.json({ error: { message: "Failed to delete amenity" } }, 500);
    }
  },
);

// Batch create amenities (admin only)
amenitiesRouter.post(
  "/batch",
  adminAuthMiddleware,
  sValidator("json", schemaBatchAmenities),
  async (c) => {
    const { amenities } = c.req.valid("json");

    try {
      const createdAmenities = await Promise.all(
        amenities.map((amenityData) => createAmenity(amenityData)),
      );
      return c.json({ data: createdAmenities }, 201);
    } catch (_error) {
      return c.json({ error: { message: "Failed to create amenities" } }, 500);
    }
  },
);

// Initialize predefined amenities (admin only)
amenitiesRouter.post("/initialize", adminAuthMiddleware, async (c) => {
  try {
    await initializePredefinedAmenities();
    return c.json({ message: "Predefined amenities initialized successfully" });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to initialize amenities" } },
      500,
    );
  }
});

// Get amenities by category
amenitiesRouter.get(
  "/category/:category",
  sValidator("param", schemaGetAmenitiesByCategory),
  async (c) => {
    const { category, limit = 50, skip = 0 } = c.req.valid("param");

    try {
      const amenities = await findAmenitiesByCategory(
        category,
        Number(limit),
        Number(skip),
      );
      return c.json({ data: amenities });
    } catch (_error) {
      return c.json(
        { error: { message: "Failed to fetch amenities by category" } },
        500,
      );
    }
  },
);
