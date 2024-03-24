import { useLoaderData, useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";
import { User } from "@/types/user";
import { Badge } from "primereact/badge";

const links = [
  ["/dashboard", "My Listings", "pi-key"],
  ["addlisting", "Add new Listing", "pi-plus"],
  ["bookings", "My bookings", "pi-heart"],
  ["customers", "Customers", "pi-users"],
  ["/search", "Book a Storage", "pi-shopping-cart"],
  ["profile", "Profile", "pi-cog"],
];

const AsideMenu = () => {
  const { pathname: pt } = useLocation();
  const { count } = useLoaderData() as { count: number };
  return (
    <nav className="grid grid-cols-2 md:grid-cols-1 gap-5 py-6 text-sm items-center [&_i]:align-middle  hover:*:text-ink [&_i]:mr-5">
      {links.map(([path, label, icon]) => (
        <Link
          key={path}
          to={path}
          className={pt.endsWith(path) ? "text-blood" : ""}>
          <i className={`pi ${icon}`}></i> {label}
          {path === "customers" && count > 0 && <Badge>{count}</Badge>}
        </Link>
      ))}
    </nav>
  );
};

const PlanDisplayCard = () => {
  return (
    <article className="bg-neutral p-2 rounded-md w-full">
      <h1 className="text-center font-semibold mb-2">
        Free Plan <i className="pi pi-gift"></i>
      </h1>
      <p className="text-sm text-center font-bold">
        ∞ listings <br />∞ bookings
      </p>
    </article>
  );
};

export const Aside = ({ user }: { user: User }) => (
  <aside className="bg-white md:sticky top-8 md:h-[80vh]">
    <section className="grid justify-items-center">
      <Avatar
        shape="circle"
        className="size-16 ring ring-navy mb-4"
        image={user.avatar}
        label={user.fullname[0]}
      />
      <b className=" text-navy mb-4">{user?.fullname}</b>
      <PlanDisplayCard />
      <AsideMenu />
    </section>
  </aside>
);
