import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { ObjectId } from "mongodb";
import type { BetterAuthVariables } from "@/lib/auth";
import { adminAuthMiddleware, authMiddleware } from "@/server/middleware/auth";
import {
  createComplaint,
  deleteComplaint,
  findComplaintById,
  findComplaintsByComplainantId,
  updateComplaintStatus,
} from "@/server/models/Complaint";
import {
  schemaCreateComplaint,
  schemaUpdateComplaint,
} from "../validation/complaints";

export const complaintsRouter = new Hono<{ Variables: BetterAuthVariables }>();

// Get user's complaints
complaintsRouter.get("/", authMiddleware, async (c) => {
  const user = c.get("user");

  try {
    const complaints = await findComplaintsByComplainantId(user.id);
    return c.json({ data: complaints });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch complaints" } }, 500);
  }
});

// Create new complaint
complaintsRouter.post(
  "/",
  authMiddleware,
  sValidator("json", schemaCreateComplaint),
  async (c) => {
    const user = c.get("user");
    const { respondentId, listingId, subject, description } =
      c.req.valid("json");

    try {
      const complaint = await createComplaint({
        complainantId: new ObjectId(user.id),
        respondentId: respondentId ? new ObjectId(respondentId) : undefined,
        listingId: listingId ? new ObjectId(listingId) : undefined,
        subject,
        description,
      });
      return c.json({ data: complaint }, 201);
    } catch (_error) {
      return c.json({ error: { message: "Failed to create complaint" } }, 500);
    }
  },
);

// Get complaint by ID
complaintsRouter.get("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  try {
    const complaint = await findComplaintById(id);
    if (!complaint) {
      return c.json({ error: { message: "Complaint not found" } }, 404);
    }

    // Check if user is authorized to view this complaint
    // Only complainant or admin can view
    if (
      complaint.complainantId.toString() !== user.id &&
      user.role !== "admin"
    ) {
      return c.json({ error: { message: "Unauthorized" } }, 403);
    }

    return c.json({ data: complaint });
  } catch (_error) {
    return c.json({ error: { message: "Failed to fetch complaint" } }, 500);
  }
});

// Update complaint (admin only)
complaintsRouter.put(
  "/:id",
  adminAuthMiddleware,
  sValidator("json", schemaUpdateComplaint),
  async (c) => {
    const id = c.req.param("id");
    const { status, adminNotes } = c.req.valid("json");

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
  },
);

// Delete complaint (admin only)
complaintsRouter.delete("/:id", adminAuthMiddleware, async (c) => {
  const id = c.req.param("id");

  try {
    const deleted = await deleteComplaint(id);
    if (!deleted) {
      return c.json({ error: { message: "Complaint not found" } }, 404);
    }
    return c.json({ message: "Complaint deleted successfully" });
  } catch (_error) {
    return c.json({ error: { message: "Failed to delete complaint" } }, 500);
  }
});
