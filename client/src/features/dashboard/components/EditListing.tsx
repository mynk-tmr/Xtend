import { AsyncUI } from "@/common/components/AsyncUI";
import { Listing } from "@/types/listing";
import { FormContainer } from "@/features/listform";
import { apiclient } from "@/lib/apiclient";
import { Suspense } from "react";
import { Await, LoaderFunction, defer, useLoaderData } from "react-router-dom";

export const EditListing = () => {
  const { payload } = useLoaderData() as Loader;
  return (
    <section>
      <h1 className="text-3xl font-bold text-navy">Edit Listing</h1>
      <Suspense fallback={<AsyncUI.Loading />}>
        <Await resolve={payload} errorElement={<AsyncUI.Error />}>
          {/* must be render prop */}
          {(payload) => <FormContainer defaultValues={payload} />}
        </Await>
      </Suspense>
    </section>
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
