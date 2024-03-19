import { useQuery } from "@tanstack/react-query";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Listing } from "@/common/types/listing";
import { useToast } from "@/providers/ToastProvider";

async function postalapi(pincode: string) {
  const url = "https://api.postalpincode.in/pincode/" + pincode;
  const res = await fetch(url);
  const parsed = await res.json();
  const data = parsed[0].PostOffice;
  const { Circle: state, District: city } = data[0];
  const localities = data?.map((info: { Name: string }) => info.Name);
  return {
    localities,
    state,
    city,
  };
}

export default function usePostalAPI(
  getter: UseFormGetValues<Listing>,
  setter: UseFormSetValue<Listing>
) {
  const toast = useToast();
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["pincode"],
    queryFn: async () => {
      try {
        const res = await postalapi(getter("address.pincode"));
        setter("address.state", res.state);
        setter("address.city", res.city);
        setter("address.locality", "");
        return res.localities;
      } catch {
        toast.error("Invalid Pincode");
        setter("address.state", "");
        setter("address.city", "");
        setter("address.locality", "");
      }
    },
    enabled: false,
  });

  return { isFetching, localities: data, refetch };
}
