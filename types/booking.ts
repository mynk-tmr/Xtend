export type Booking = {
  userId: string;
  listingId: string;
  start: Date;
  end: Date;
  price: number;
  status: "pending" | "accepted" | "rejected";
  review: {
    rating: number;
    text: string;
  };
};
