import mongoose from "mongoose";
import { Booking as BookingType } from "@/types/booking";

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };

interface B extends Omit<BookingType, "start | end"> {
  start: Date;
  end: Date;
}

const bookingSchema = new mongoose.Schema<B>({
  listingId: requiredString,
  userId: requiredString,
  start: { type: Date },
  end: { type: Date },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  price: requiredNumber,
  review: {
    rating: requiredNumber,
    text: { type: String, default: "" },
  },
});

// listings collection in db
export const Booking = mongoose.model("Booking", bookingSchema);
