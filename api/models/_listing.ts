import mongoose from "mongoose";
import { Listing as ListingType } from "@/types/listing";

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };
const requiredDate = { type: Date, required: true };

interface L extends Omit<ListingType, "lastUpdated"> {
  lastUpdated: Date;
}

const listingSchema = new mongoose.Schema<L>({
  userId: requiredString,
  name: requiredString,
  description: requiredString,
  images: [requiredString],
  price: requiredNumber,
  discount: requiredNumber,
  category: requiredString,
  facilities: [requiredString],
  rating: requiredNumber,
  state: requiredString,
  city: requiredString,
  pincode: requiredString,
  locality: requiredString,
  width: requiredNumber,
  height: requiredNumber,
  area: requiredNumber,
  lastUpdated: requiredDate,
});

listingSchema.pre("save", async function () {
  this.lastUpdated = new Date();
});

// listings collection in db
export const Listing = mongoose.model("Listing", listingSchema);
