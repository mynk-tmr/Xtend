export type Listing = {
  name: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  category: string;
  facilities: string[];
  rating: number;
  address: {
    state: string;
    city: string;
    pincode: string;
    locality: string;
  };
  dimensions: {
    width: number;
    height: number;
    area: number;
  };
  reviews?: {
    name: string;
    avatar: string;
    date: string;
    text: string;
    rating: number;
  }[];
};
