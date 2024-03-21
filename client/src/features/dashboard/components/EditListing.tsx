import { Listing } from "@/common/types/listing";
import { FormContainer } from "@/features/listform";
import { apiclient } from "@/lib/apiclient";
import { Suspense } from "react";
import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";

export const EditListing = () => {
  const { payload } = useLoaderData() as Loader;
  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Edit Listing</h1>
      <Suspense fallback={<Fallback />}>
        <Await resolve={payload} errorElement={errorElement}>
          {/* must be render prop */}
          {(payload) => <FormContainer defaultValues={payload} />}
        </Await>
      </Suspense>
    </section>
  );
};

const errorElement = (
  <div className="w-fit mx-auto mt-10 text-blood grid gap-2 place-items-center">
    <h1>An error occurred while loading the listing.</h1>
    <i className="pi pi-exclamation-triangle text-3xl"></i>
  </div>
);

const Fallback = () => {
  return (
    <div className="mt-12 *:text-3xl w-fit mx-auto">
      <i className="pi pi-spin pi-spinner"></i>
      <p>Loading...</p>
    </div>
  );
};

type Loader = {
  payload?: Listing;
  error?: string;
};

const loader: LoaderFunction = async ({ params }) => {
  const listingPromise = apiclient.get(`listings/${params.id}`).json();
  return defer({ payload: listingPromise, error: null });
};

EditListing.loader = loader;
