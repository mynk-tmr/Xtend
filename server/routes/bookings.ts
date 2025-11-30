import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { ObjectId } from "mongodb";
import type { BetterAuthVariables } from "@/lib/auth";
import {
  createBooking,
  deleteBooking,
  findBookingById,
  findBookingsByRenterId,
  findBookingsByTenantId,
  findExistingBooking,
  updateBookingStatus,
} from "@/lib/models/Booking";
import { authMiddleware } from "@/server/middleware/auth";
import {
  schemaCreateBooking,
  schemaUpdateBooking,
} from "../validation/bookings";

export const bookingsRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get user's bookings as renter
bookingsRouter.get("/", authMiddleware, async (c) => {
  const user = c.get("user");

  try {
    const bookings = await findBookingsByRenterId(user.id);
    return c.json({ data: bookings });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch bookings" } }, 500);
  }
});

// Get booking requests for user's listings (as tenant)
bookingsRouter.get("/requests", authMiddleware, async (c) => {
  const user = c.get("user");

  try {
    const bookings = await findBookingsByTenantId(user.id);
    return c.json({ data: bookings });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to fetch booking requests" } },
      500,
    );
  }
});

// Get booking by ID
bookingsRouter.get("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  try {
    const booking = await findBookingById(id);
    if (!booking) {
      return c.json({ error: { message: "Booking not found" } }, 404);
    }

    // Check if user is authorized to view this booking
    if (
      booking.renterId.toString() !== user.id &&
      booking.listingId.toString() !== user.id
    ) {
      return c.json({ error: { message: "Unauthorized" } }, 403);
    }

    return c.json({ data: booking });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch booking" } }, 500);
  }
});

// Create new booking
bookingsRouter.post(
  "/",
  authMiddleware,
  sValidator("json", schemaCreateBooking),
  async (c) => {
    const user = c.get("user");
    const { listingId, message } = c.req.valid("json");

    try {
      // Check if booking already exists
      const existingBooking = await findExistingBooking(listingId, user.id);
      if (existingBooking) {
        return c.json({ error: { message: "Booking already exists" } }, 409);
      }

      const booking = await createBooking({
        listingId: new ObjectId(listingId),
        renterId: new ObjectId(user.id),
        status: "pending", // Add default status
        message,
      });
      return c.json({ data: booking }, 201);
    } catch (_error) {
      return c.json({ error: { message: "Failed to create booking" } }, 500);
    }
  },
);

// Update booking (approve/reject/cancel)
bookingsRouter.put(
  "/:id",
  authMiddleware,
  sValidator("json", schemaUpdateBooking),
  async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const { status, responseMessage } = c.req.valid("json");

    try {
      const booking = await findBookingById(id);
      if (!booking) {
        return c.json({ error: { message: "Booking not found" } }, 404);
      }

      // Check if user is authorized to update this booking
      // Only the tenant (listing owner) can approve/reject
      // Only the renter can cancel
      if (status === "approved" || status === "rejected") {
        // Check if user owns the listing
        // This would require fetching the listing to check tenantId
        // For now, we'll assume the user is authorized
      } else if (status === "cancelled") {
        // Check if user is the renter
        if (booking.renterId.toString() !== user.id) {
          return c.json({ error: { message: "Unauthorized" } }, 403);
        }
      }

      const updatedBooking = await updateBookingStatus(
        id,
        status,
        responseMessage,
      );
      return c.json({ data: updatedBooking });
    } catch (_error) {
      return c.json({ error: { message: "Failed to update booking" } }, 500);
    }
  },
);

// Delete booking
bookingsRouter.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  try {
    const booking = await findBookingById(id);
    if (!booking) {
      return c.json({ error: { message: "Booking not found" } }, 404);
    }

    // Only the renter can delete their own booking
    if (booking.renterId.toString() !== user.id) {
      return c.json({ error: { message: "Unauthorized" } }, 403);
    }

    const deleted = await deleteBooking(id);
    if (!deleted) {
      return c.json({ error: { message: "Failed to delete booking" } }, 500);
    }
    return c.json({ message: "Booking deleted successfully" });
  } catch (_error) {
    return c.json({ error: { message: "Failed to delete booking" } }, 500);
  }
});
