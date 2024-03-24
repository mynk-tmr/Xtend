import { useAppContext } from "@/providers/AppContextProvider";
import { Listing } from "@/types/listing";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Galleria } from "primereact/galleria";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import { Link, Form } from "react-router-dom";
import { Image } from "primereact/image";

export const BookingInfo = ({ listing }: { listing: Listing }) => {
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

export const RequestForm = ({
  listing,
  isAlreadyBooked,
}: {
  listing: Listing;
  isAlreadyBooked: boolean;
}) => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const { user } = useAppContext();
  if (!user) {
    return (
      <Link to="/auth/login">
        <Button
          label="Login to Book"
          icon="pi pi-shopping-cart"
          className="bg-love"
        />
      </Link>
    );
  }

  if (user._id === listing.userId) {
    return (
      <div className="text-white p-3">
        <p> This is how it will appear to users...</p>
        <Link
          className=" bg-success text-black py-1 px-2 mt-4 inline-block mx-auto"
          to={`/dashboard/edit/${listing._id}`}>
          <i className="pi pi-pencil mr-2"></i>
          You can edit it here
        </Link>
      </div>
    );
  }

  if (isAlreadyBooked) {
    return (
      <p className="text-center text-white">
        You have already booked this space
      </p>
    );
  }

  const isDisabled = !dates?.[0] || !dates?.[1];
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
          disabled={isDisabled}
          label={isDisabled ? "Select Dates" : "Book Now"}
          icon="pi pi-shopping-cart"
          className="bg-love"
        />
      </div>
    </Form>
  );
};

export const Gallery = ({ listing }: { listing: Listing }) => {
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
