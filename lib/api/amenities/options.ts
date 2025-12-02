import { queryOptions } from "@tanstack/react-query";
import { getAllAmenities } from "@/lib/api/amenities/calls";

export const amenityKeys = {
  all: ["amenities"] as const,
  lists: () => [...amenityKeys.all, "list"] as const,
};

export function getAmenitiesOptions() {
  return queryOptions({
    queryKey: amenityKeys.lists(),
    queryFn: getAllAmenities,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}
