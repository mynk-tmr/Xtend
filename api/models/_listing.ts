import mongoose from "mongoose";

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };
const requiredDate = { type: Date, required: true };

const listingSchema = new mongoose.Schema({
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
  reviews: [
    {
      user: requiredString,
      date: requiredDate,
      text: requiredString,
      rating: requiredNumber,
    },
  ],
});

listingSchema.pre("save", async function () {
  this.lastUpdated = new Date();
});

// listings collection in db
export const Listing = mongoose.model("Listing", listingSchema);
