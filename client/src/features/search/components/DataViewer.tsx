import { Listing } from "@/types/listing";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";

export const DataViewer = ({ listings }: { listings: Listing[] }) => {
  return (
    <main className="flex flex-wrap gap-4 justify-center">
      {listings.map((listing) => (
        <Link key={listing._id} to={`/book/${listing._id}`}>
          <ListingCard listing={listing} />
        </Link>
      ))}
    </main>
  );
};

const newBadge = (date: string) => {
  const ms_Week = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - Date.parse(date) < ms_Week)
    return (
      <Tag
        className="absolute top-0 right-0 bg-love"
        value="New"
        icon="pi pi-heart"></Tag>
    );

  return null;
};

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <section className="bg-white grid m-4 rounded-md size-80 shadow-[5px_5px_0px_0px_rgba(109,40,217)] border-l-2">
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={`photo of ${listing.name}`}
          className="h-full"
        />
        <Tag
          className="absolute top-0 bg-grass"
          value={"₹ " + (listing.price - listing.discount)}></Tag>
        {newBadge(listing.lastUpdated)}
        <Tag
          className="absolute bottom-0 right-0"
          value={listing.category}
          icon="pi pi-tag"></Tag>
      </div>
      <article className="p-4 grid gap-3">
        <div>
          <h3 className="text-xl">{listing.name}</h3>
          <p className="text-sm">{listing.description}</p>
        </div>
        <p className="text-sm">
          <i className="pi pi-map-marker text-[12px] mr-2"></i>
          {listing.locality}, {listing.city}, {listing.state}
        </p>
        <div className="*:bg-stone-700 flex flex-wrap gap-2">
          <Tag value={listing.facilities[0]} />
          <Tag value={listing.facilities[1]} />
          {listing.facilities[2] && (
            <Tag value={"+ " + (listing.facilities.length - 2) + " more"} />
          )}
        </div>
      </article>
    </section>
  );
};
