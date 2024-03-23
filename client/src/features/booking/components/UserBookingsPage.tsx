import { AsyncUI } from "@/common/components/AsyncUI";
import { Booking } from "@/types/booking";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  defer,
  useLoaderData,
} from "react-router-dom";
import { isoToLocale } from "@/lib/intl";
import { Tag } from "primereact/tag";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "primereact/skeleton";
import { Listing } from "@/types/listing";
import { Button } from "primereact/button";
import { bookapi } from "../services/bookapi";
import { searchapi } from "@/features/search";

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
          <section className="flex flex-wrap">
            <h1 className="text-3xl font-bold text-navy basis-full">
              My Bookings
            </h1>
            {res.map((booking: Booking, i) => (
              <BookingCard key={i} booking={booking} />
            ))}
          </section>
        );
      }}
    </AsyncUI>
  );
};

const Status = ({ status }: { status: Booking["status"] }) => {
  let statusStyle = "",
    statusText;
  switch (status) {
    case "pending": {
      statusStyle = "bg-ink";
      statusText = (
        <span>
          <i className="pi pi-clock align-middle"></i> Pending
        </span>
      );
      break;
    }
    case "accepted": {
      statusStyle = "bg-success";
      statusText = (
        <span>
          <i className="pi pi-check align-middle"></i> Accepted
        </span>
      );
      break;
    }
    case "rejected": {
      statusStyle = "bg-blood";
      statusText = (
        <span>
          <i className="pi pi-times align-middle"></i> Rejected
        </span>
      );
      break;
    }
    case "canceled": {
      statusStyle = "bg-yellow";
      statusText = (
        <span>
          <i className="pi pi-times align-middle"></i> Cancelled
        </span>
      );
      break;
    }
  }
  return <Tag className={statusStyle + " text-base"}>{statusText}</Tag>;
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  const {
    data: listing,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["booking", booking.listingId],
    queryFn: async () => {
      const res = await searchapi.getListing(booking.listingId);
      return res as Listing;
    },
  });

  return (
    <section className="bg-white flex flex-col m-4 rounded-md p-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)] border-l-2 size-80 relative">
      <div className="grow">
        {isFetching ? (
          <Skeleton className="w-full h-full" />
        ) : isError ? (
          <p className="text-blood text-balance">Failed to load listing Info</p>
        ) : (
          <>
            <img src={listing?.images[0]} alt="listing" className="h-[133px]" />
            <h3 className="text-xl">{listing?.name}</h3>
            <p className="text-sm">
              {listing?.description.slice(0, 40) + "..."}
            </p>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2 *:text-sm *:px-4 *:py-1">
        <p className="bg-lime-300">Start : {isoToLocale(booking.start)}</p>
        <p className="bg-red-300">End : {isoToLocale(booking.end)}</p>
        <p className="bg-green-300">Price : ₹ {booking.price} per day</p>
      </div>
      <div className="absolute top-0 right-0">
        <Status status={booking.status} />
        <br />
        {(booking.status === "pending" || booking.status === "accepted") && (
          <Form method="post">
            <Button
              name="id"
              value={booking._id}
              label="Cancel"
              className="bg-blood mt-3 left-0 text-sm"
              icon="pi pi-trash"></Button>
          </Form>
        )}
      </div>
    </section>
  );
};

const loader: LoaderFunction = async () => {
  const bookingPromise = bookapi.getall();
  return defer({ res: bookingPromise });
};

const action: ActionFunction = async ({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData());
    await bookapi.cancel(data.id as string);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Couldn't confirm booking" };
  }
};

UserBookingsPage.loader = loader;
UserBookingsPage.action = action;
