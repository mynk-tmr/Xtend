import api from "../client";

export async function getAllAmenities() {
  return api
    .get("amenities")
    .json<{ data: Array<{ _id: string; name: string; icon: string }> }>();
}
