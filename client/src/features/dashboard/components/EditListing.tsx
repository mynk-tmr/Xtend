import { AsyncUI } from "@/common/components/AsyncUI";
import { Listing } from "@/types/listing";
import { FormContainer } from "@/features/listing";
import { useLoaderData } from "react-router-dom";
import { apiclient } from "@/lib/apiclient";
import { LoaderFunction, defer } from "react-router-dom";

export const EditListing = () => {
  const { listing } = useLoaderData() as { listing: Promise<Listing> };
  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Edit Listing</h1>
      <AsyncUI promise={listing}>
        {/* must be render prop */}
        {(listing) => <FormContainer defaultValues={listing} />}
      </AsyncUI>
    </section>
  );
};

const loader: LoaderFunction = async ({ params }) => {
  const listingPromise = apiclient.get(`listings/${params.id}`).json();
  return defer({ listing: listingPromise });
};

EditListing.loader = loader;
