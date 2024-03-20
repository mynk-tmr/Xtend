export type Listing = {
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
  reviews?: {
    user: {
      fullname: string;
      avatar: string;
    };
    date: string;
    text: string;
    rating: number;
  }[];
};
