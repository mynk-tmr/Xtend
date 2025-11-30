import { ObjectId } from "mongodb";
import { z } from "zod/v4";
import { ComplaintStatusSchema } from "@/server/validation/+others";
import { db } from "../db";

// Zod schema for Complaint validation
export const ComplaintSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  complainantId: z.instanceof(ObjectId),
  respondentId: z.instanceof(ObjectId).optional(),
  listingId: z.instanceof(ObjectId).optional(),
  subject: z.string().min(1),
  description: z.string().min(1),
  status: ComplaintStatusSchema,
  adminNotes: z.string().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// TypeScript type derived from the schema
export type Complaint = z.infer<typeof ComplaintSchema>;

// Collection name
export const COMPLAINT_COLLECTION = "complaints";

// Helper functions for Complaint operations
export const ComplaintCollection = () =>
  db.collection<Complaint>(COMPLAINT_COLLECTION);

// Create a new complaint
export async function createComplaint(
  complaintData: Omit<Complaint, "_id" | "createdAt" | "updatedAt" | "status">,
): Promise<Complaint> {
  const complaint = {
    ...complaintData,
    status: "open" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await ComplaintCollection().insertOne(complaint);
  return { ...complaint, _id: result.insertedId };
}

// Find complaint by ID
export async function findComplaintById(id: string): Promise<Complaint | null> {
  const complaint = await ComplaintCollection().findOne({
    _id: new ObjectId(id),
  });
  return complaint;
}

// Find all complaints with optional filters
export async function findAllComplaints(
  filters: Partial<Omit<Complaint, "_id" | "createdAt" | "updatedAt">> = {},
  limit: number = 10,
  skip: number = 0,
): Promise<Complaint[]> {
  const complaints = await ComplaintCollection()
    .find(filters)
    .limit(limit)
    .skip(skip)
    .toArray();
  return complaints;
}

// Find complaints filed by a user
export async function findComplaintsByComplainantId(
  complainantId: string,
): Promise<Complaint[]> {
  const complaints = await ComplaintCollection()
    .find({ complainantId: new ObjectId(complainantId) })
    .toArray();
  return complaints;
}

// Find complaints against a user
export async function findComplaintsByRespondentId(
  respondentId: string,
): Promise<Complaint[]> {
  const complaints = await ComplaintCollection()
    .find({ respondentId: new ObjectId(respondentId) })
    .toArray();
  return complaints;
}

// Find complaints about a listing
export async function findComplaintsByListingId(
  listingId: string,
): Promise<Complaint[]> {
  const complaints = await ComplaintCollection()
    .find({ listingId: new ObjectId(listingId) })
    .toArray();
  return complaints;
}

// Update complaint status and admin notes
export async function updateComplaintStatus(
  id: string,
  status: Complaint["status"],
  adminNotes?: string,
): Promise<Complaint | null> {
  const updateData: Partial<Complaint> = { status, updatedAt: new Date() };
  if (adminNotes) {
    updateData.adminNotes = adminNotes;
  }

  const result = await ComplaintCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData },
  );

  if (result.matchedCount === 0) return null;
  return findComplaintById(id);
}

// Delete complaint
export async function deleteComplaint(id: string): Promise<boolean> {
  const result = await ComplaintCollection().deleteOne({
    _id: new ObjectId(id),
  });
  return result.deletedCount > 0;
}
