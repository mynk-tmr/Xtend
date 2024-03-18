import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Listing } from "@/common/types/listing";
import { Tag } from "primereact/tag";
import { Message } from "primereact/message";

const listings: Listing[] = [
  {
    name: "Jain Storage",
    description: "Description of listing 1",
    images: [
      "http://picsum.photos/400/300/?random=1",
      "http://picsum.photos/400/300/?random=2",
      "http://picsum.photos/400/300/?random=3",
    ],
    price: 1000,
    discount: 30,
    category: "Furniture",
    facilities: ["Guarded", "Fire Protection", "CCTV"],
    rating: 3,
    address: {
      state: "Karnataka",
      city: "Bangalore",
      pincode: "560001",
      locality: "BTM Layout",
    },
    dimensions: {
      width: 12,
      height: 13,
      area: 121,
    },
    reviews: [
      {
        name: "Rishu Kumar",
        avatar: "https://i.pravatar.cc/300?img=5",
        date: "2022-02-02",
        text: "Great service",
        rating: 4,
      },
    ],
  },
];

const imageBodyTemplate = (listing: Listing) => {
  return (
    <img
      src={listing.images[0]}
      alt="listing"
      className="w-32 shadow-2 rounded-md"
    />
  );
};

const aboutBodyTemplate = (listing: Listing) => {
  return (
    <div className="grid gap-2">
      <p>{listing.name}</p>
      <p className="text-xs">{listing.description.slice(0, 40)}</p>
      <address className="text-xs not-italic text-grass">
        <i className="pi pi-map-marker text-[12px] mr-2"></i>
        {listing.address.locality}, {listing.address.city},{" "}
        {listing.address.state}
      </address>
    </div>
  );
};

const categorisationBodyTemplate = (listing: Listing) => {
  return (
    <>
      <p className="text-sm">
        Listed in <b className="text-navy text-base">{listing.category}</b>
      </p>
      <p className="flex flex-wrap gap-2 mt-2">
        {listing.facilities.map((facility) => (
          <Tag value={facility} />
        ))}
      </p>
    </>
  );
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

const priceBodyTemplate = (listing: Listing) => {
  return (
    <p className="grid">
      <data className="text-grass font-bold" value={listing.price}>
        {formatCurrency(listing.price)}
      </data>
      <data value={listing.discount}>
        <small>Discount :</small>{" "}
        <b className="text-blood">{formatCurrency(listing.discount)}</b>
      </data>
    </p>
  );
};

const dimensionBodyTemplate = (listing: Listing) => {
  return (
    <p className="*:text-[10px] *:m-1 *:text-white">
      <Tag
        className="bg-navy"
        value={listing.dimensions.area + " sq. feet"}></Tag>
      <br />
      <Tag className="bg-love" value={"H: " + listing.dimensions.height} />
      <Tag className="bg-love" value={"W: " + listing.dimensions.width} />
    </p>
  );
};

const ratingBodyTemplate = (listing: Listing) => {
  return (
    <div className="grid gap-2 text-sm">
      <p>
        Average <i className="pi pi-star"></i> {listing.rating}
      </p>
      {listing.reviews?.length ? (
        <Message
          severity="info"
          pt={{
            text: { className: "text-xs text-balance" },
            root: { className: "max-w-[16ch]" },
          }}
          text={`"${listing.reviews[0].text}" - ${listing.reviews[0].name}`}
        />
      ) : (
        <p className="text-xs">No reviews</p>
      )}
    </div>
  );
};

const header = (
  <header>
    <span className="inline-flex gap-4 items-center text-xl font-bold ">
      Listings
    </span>
    <Button icon="pi pi-refresh" className="size-8 ml-8" rounded raised />
  </header>
);

export const ListingTable = () => {
  // const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    //setproduc
  }, []);

  return (
    <DataTable
      pt={{
        headerRow: { className: "text-sm " },
      }}
      value={listings}
      header={header}
      tableStyle={{ minWidth: "60rem" }}>
      <Column header="Listing" body={imageBodyTemplate}></Column>
      <Column header="About" body={aboutBodyTemplate}></Column>
      <Column
        header="Category & Facilities"
        body={categorisationBodyTemplate}></Column>
      <Column header="Price" body={priceBodyTemplate}></Column>
      <Column header="Dimensions" body={dimensionBodyTemplate}></Column>
      <Column header="Reviews" body={ratingBodyTemplate}></Column>
    </DataTable>
  );
};
