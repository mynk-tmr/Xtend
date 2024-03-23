export type Listing = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  category: string;
  facilities: string[];
  rating: number;
  state: string;
  city: string;
  pincode: string;
  locality: string;
  width: number;
  height: number;
  area: number;
  lastUpdated: string;
  reviews?: [
    {
      userId: string;
      rating: number;
      text: string;
    }
  ];
};
