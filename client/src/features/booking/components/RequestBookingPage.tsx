import { AsyncUI } from "@/common/components/AsyncUI";
import { XtendedLogo } from "@/common/components/XtendedLogo";
import { Listing } from "@/types/listing";
import { HTTPError } from "ky";
import {
  ActionFunction,
  LoaderFunction,
  defer,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { BookingInfo, Gallery, RequestForm } from "./RequestBookingElements";
import { bookapi } from "../services/bookapi";
import { Booking } from "@/types/booking";
import { searchapi } from "@/features/search";
import { useSubmissionEffect } from "@/hooks/useSubmissionEffect";

export const RequestBookingPage = () => {
  const goto = useNavigate();
  useSubmissionEffect(() => goto("/dashboard/bookings"), "Booking created");
  const { listing, bookings } = useLoaderData() as {
    listing: Promise<Listing>;
    bookings: Promise<Booking[]>;
  };
  return (
    <main className="p-6 min-h-screen">
      <header className="mb-8">
        <XtendedLogo />
        <h1 className="text-center font-semibold">
          Quick and Simple. We make everything so easy.
        </h1>
      </header>
      <AsyncUI promise={Promise.all([listing, bookings])}>
        {([listing, bookings]) => (
          <section className="grid md:grid-cols-2 bg-[#EFEFEF]">
            <section className="grid grid-rows-[375px_auto] items-center bg-gray-800">
              <Gallery listing={listing} />
              <RequestForm
                listing={listing}
                isAlreadyBooked={bookings.some(
                  (b) => b.listingId === listing._id && b.status !== "canceled"
                )}
              />
            </section>
            <BookingInfo listing={listing} />
          </section>
        )}
      </AsyncUI>
    </main>
  );
};

const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return redirect("/search");
  const listingPromise = searchapi.getListing(params.id);
  const bookingPromise = bookapi.getall();
  return defer({ listing: listingPromise, bookings: bookingPromise });
};

const action: ActionFunction = async ({ params, request }) => {
  try {
    if (!params.id) return redirect("/search");
    const form = await request.formData();
    await bookapi.request(form, params.id);
    return { ok: true };
  } catch (err) {
    if (err instanceof HTTPError)
      return { ok: false, error: "Couldn't request booking" };
  }
};

RequestBookingPage.action = action;
RequestBookingPage.loader = loader;
