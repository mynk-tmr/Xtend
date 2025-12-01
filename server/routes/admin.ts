import { Hono } from "hono";
import type { BetterAuthVariables } from "@/lib/auth";
import { adminAuthMiddleware } from "@/server/middleware/auth";
import {
  findAllComplaints,
  updateComplaintStatus,
} from "@/server/models/Complaint";
import { findAllListings } from "@/server/models/Listing";

export const adminRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get all users (admin only)
adminRouter.get("/users", adminAuthMiddleware, async (c) => {
  try {
    // This is a simplified implementation
    // In a real app, you would want pagination, filtering, etc.
    return c.json({
      message:
        "User management endpoint - implement pagination and filtering as needed",
    });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch users" } }, 500);
  }
});

// Get all listings (admin only)
adminRouter.get("/listings", adminAuthMiddleware, async (c) => {
  try {
    const listings = await findAllListings({}, 100, 0); // Get first 100 listings
    return c.json({ data: listings });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch listings" } }, 500);
  }
});

// Get all bookings (admin only)
adminRouter.get("/bookings", adminAuthMiddleware, async (c) => {
  try {
    return c.json({
      message:
        "Booking management endpoint - implement with actual booking model",
    });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch bookings" } }, 500);
  }
});

// Get all complaints (admin only)
adminRouter.get("/complaints", adminAuthMiddleware, async (c) => {
  try {
    const complaints = await findAllComplaints({}, 100, 0); // Get first 100 complaints
    return c.json({ data: complaints });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch complaints" } }, 500);
  }
});

// Update complaint status (admin only)
adminRouter.put("/complaints/:id", adminAuthMiddleware, async (c) => {
  const id = c.req.param("id");
  const { status, adminNotes } = await c.req.json();

  try {
    const updatedComplaint = await updateComplaintStatus(
      id,
      status,
      adminNotes,
    );
    if (!updatedComplaint) {
      return c.json({ error: { message: "Complaint not found" } }, 404);
    }
    return c.json({ data: updatedComplaint });
  } catch (_error) {
    return c.json({ error: { message: "Failed to update complaint" } }, 500);
  }
});

// Get dashboard stats (admin only)
adminRouter.get("/dashboard", adminAuthMiddleware, async (c) => {
  try {
    // This is a placeholder - implement actual stats
    return c.json({
      data: {
        totalUsers: 0,
        totalListings: 0,
        totalBookings: 0,
        totalComplaints: 0,
        pendingComplaints: 0,
      },
    });
  } catch (_error) {
    return c.json(
      { error: { message: "Failed to fetch dashboard stats" } },
      500,
    );
  }
});
