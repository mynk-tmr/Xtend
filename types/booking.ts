export type Booking = {
  userId: string;
  listingId: string;
  start: Date;
  end: Date;
  price: number;
  review: {
    rating: number;
    text: string;
  };
};
