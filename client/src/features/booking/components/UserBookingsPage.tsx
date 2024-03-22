import { apiclient } from "@/lib/apiclient";
import { AsyncUI } from "@/common/components/AsyncUI";
import { Booking } from "@/types/booking";
import { LoaderFunction, defer, useLoaderData } from "react-router-dom";

export const UserBookingsPage = () => {
  const { res } = useLoaderData() as { res: Promise<Booking[]> };
  return (
    <AsyncUI promise={res}>
      {(res) => {
        if (!res || !res.length) {
          return (
            <section className="grid place-items-center">
              <h1 className="text-xl">You do not have any Bookings ...</h1>
              <i className="pi pi-shopping-cart text-5xl" />
              <p className="text-ink font-semibold animate-pulse">
                You can going to search page or use menu to book a new
              </p>
            </section>
          );
        }

        return (
          <section>
            <h1 className="text-3xl font-bold text-navy">My Bookings</h1>
            {res.map((booking: Booking, i) => (
              <p key={i}>{JSON.stringify(booking)}</p>
            ))}
          </section>
        );
      }}
    </AsyncUI>
  );
};

const loader: LoaderFunction = async () => {
  const bookingPromise = apiclient.get("bookings/all").json();
  return defer({ res: bookingPromise });
};

UserBookingsPage.loader = loader;
