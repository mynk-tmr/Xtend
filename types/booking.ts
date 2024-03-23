import { Listing } from "./listing";

export type Booking = {
  _id: string;
  userId: string;
  listingId: string;
  start: string;
  end: string;
  price: number;
  status: "pending" | "accepted" | "rejected" | "canceled";
  listing: Listing;
};
