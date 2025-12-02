// Client-side booking types without MongoDB dependencies

export interface ClientBooking {
  _id: string; // Use string instead of ObjectId
  listingId: string; // Use string instead of ObjectId
  tenantId: string; // Use string instead of ObjectId
  startDate: string; // Use string instead of Date
  endDate: string; // Use string instead of Date
  status: "pending" | "approved" | "rejected" | "cancelled";
  totalAmount: number;
  createdAt: string; // Use string instead of Date
  updatedAt: string; // Use string instead of Date
}

export interface CreateBookingData {
  listingId: string;
  startDate: string;
  endDate: string;
  message?: string;
}

export interface UpdateBookingData extends Partial<CreateBookingData> {
  status?: "pending" | "approved" | "rejected" | "cancelled";
}

export interface BookingSearchParams {
  listingId?: string;
  status?: "pending" | "approved" | "rejected" | "cancelled";
  limit?: number;
  skip?: number;
  sortBy?: "createdAt" | "startDate" | "totalAmount";
  sortOrder?: "asc" | "desc";
}
