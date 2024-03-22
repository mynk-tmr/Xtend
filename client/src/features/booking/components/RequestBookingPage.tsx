import { apiclient } from "@/lib/apiclient";
import { Listing } from "@/types/listing";
import { HTTPError } from "ky";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { Tag } from "primereact/tag";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Rating } from "primereact/rating";
import { XtendedLogo } from "@/common/components/XtendedLogo";
import { Image } from "primereact/image";
import { useAppContext } from "@/providers/AppContextProvider";
import { AsyncUI } from "@/common/components/AsyncUI";

const RequestForm = () => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  return (
    <Form method="post" className="[&_label]:font-bold [&_input]:py-1 m-8">
      <label htmlFor="dates" className="text-sm block mb-1 text-white">
        Select duration of booking
      </label>
      <div className="flex flex-wrap gap-3">
        <Calendar
          name="dates"
          inputId="dates"
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          minDate={new Date()}
          readOnlyInput
          icon="pi pi-calendar"
          showIcon
          touchUI
          dateFormat="dd/mm/yy"
        />
        <Button
          disabled={!dates?.[0] || !dates?.[1]}
          label="Request Booking"
          icon="pi pi-shopping-cart"
          className="bg-love"
        />
      </div>
    </Form>
  );
};

const Gallery = ({ listing }: { listing: Listing }) => {
  return (
    <Galleria
      value={listing.images}
      pt={{
        previousItemButton: {
          className: "rounded bg-black/70 size-12 z-20",
        },
        nextItemButton: { className: "rounded bg-black/70 size-12 z-20" },
      }}
      showItemNavigators
      showThumbnails={false}
      item={(url: string) => (
        <Image
          key={url}
          src={url}
          preview
          pt={{ image: { className: "h-[375px]" } }}
        />
      )}
    />
  );
};

export const RequestBookingPage = () => {
  const { listing } = useLoaderData() as { listing: Promise<Listing> };
  const { user } = useAppContext();
  return (
    <main className="p-6 min-h-screen">
      <header className="mb-8">
        <XtendedLogo />
        <h1 className="text-center font-semibold">
          Quick and Simple. We make everything so easy.
        </h1>
      </header>
      <section className="grid md:grid-cols-2 bg-[#EFEFEF]">
        <AsyncUI promise={listing}>
          {(listing) => (
            <>
              <section className="grid grid-rows-[375px_auto] items-center bg-gray-800">
                <Gallery listing={listing} />
                {user?._id !== listing.userId ? (
                  <RequestForm />
                ) : (
                  <div className="text-white p-3">
                    <p> This is how it will appear to users...</p>
                    <Link
                      className=" bg-success text-black py-1 px-2 mt-4 inline-block"
                      to={`/dashboard/edit/${listing._id}`}>
                      <i className="pi pi-pencil mr-2"></i>
                      You can edit it here
                    </Link>
                  </div>
                )}
              </section>
              <BookingInfo listing={listing} />
            </>
          )}
        </AsyncUI>
      </section>
    </main>
  );
};

const BookingInfo = ({ listing }: { listing: Listing }) => {
  return (
    <section className="grid gap-4 p-8 text-gray-800">
      <b className="text-sm underline">{listing.name}</b>
      <div>
        <b className="text-sm">
          <i className="pi pi-user mr-2"></i> Comment from Host
        </b>
        <p className="text-2xl text-balance">"{listing.description}"</p>
      </div>
      <div>
        <b className="text-sm">Rated</b>
        <Rating value={listing.rating} readOnly cancel={false} />
      </div>
      <p>
        <b className="text-sm block mb-2">
          <i className="pi pi-home mr-2"></i> Dimensions (in feet)
        </b>
        <span className="flex flex-wrap gap-3 *:bg-blood">
          <Tag value={"Area: " + listing.area + " sq."} />
          <Tag value={"Entrance Height: " + listing.height} />
          <Tag value={"Entrance Width: " + listing.width} />
        </span>
      </p>
      <p className="text-sm block mb-2 font-bold">
        <i className="pi pi-tag mr-2"></i> Category
        <Tag className="ml-3 text-base" value={listing.category} />
      </p>
      <p className="flex flex-wrap gap-2">
        <b>
          <i className="pi pi-heart-fill"></i> Facilities
        </b>
        {listing.facilities?.map((f) => (
          <Tag key={f} value={f} className="bg-stone-700"></Tag>
        ))}
      </p>
      <p className="mt-6">
        <b className="text-2xl bg-grass p-3 text-white rounded-md">
          <i className="pi pi-wallet"></i> ₹ {listing.price - listing.discount}{" "}
          / day
        </b>
        <small className="ml-4">
          Discounted: <b className="text-blood">₹ {listing.discount}</b>
        </small>
      </p>
    </section>
  );
};

const action: ActionFunction = async ({ params, request }) => {
  try {
    const form = await request.formData();
    if (!params.id) return redirect("/search");
    await apiclient.post(`bookings/request/${params.id}`, {
      body: form,
    });
    return { ok: true };
  } catch (err) {
    if (err instanceof HTTPError)
      if (err.response.status == 500)
        return { ok: false, error: "Couldn't request booking" };
    return redirect("/search");
  }
};

RequestBookingPage.action = action;
