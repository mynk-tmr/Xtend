import { apiclient } from "@/lib/apiclient";
import { LoaderFunction, defer } from "react-router-dom";

export const listingloader: LoaderFunction = async ({ params }) => {
  const listingPromise = apiclient.get(`listings/${params.id}`).json();
  return defer({ listing: listingPromise });
};
