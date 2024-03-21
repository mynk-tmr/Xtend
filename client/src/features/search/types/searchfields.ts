//schema as per q2m library

export type SearchFields = {
  "width:gte": string;
  "height:gte": string;
  "area:gte": string;
  "price:gte": string;
  "price:lte": string;
  pincode: string;
  locality: string;
  "category:in": string;
  "facilities:all": string;
  "rating:gte": string;
};
