import { useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";
import { User } from "@/types/user";

const AsideMenu = () => {
  const { pathname: pt } = useLocation();
  return (
    <nav className="grid gap-5 py-6 text-sm items-center [&_i]:align-middle  hover:*:text-ink [&_i]:mr-5">
      <Link
        to="/dashboard"
        className={pt.match(/\/dashboard\/?$/) ? "text-blood" : ""}>
        <i className="pi pi-key"></i> My Listings
      </Link>
      <Link
        to="addlisting"
        className={pt.match(/\/addlisting\/?$/) ? "text-blood" : ""}>
        <i className="pi pi-plus"></i> Add new Listing
      </Link>
      <Link
        to="bookings"
        className={pt.match(/\/bookings\/?$/) ? "text-blood" : ""}>
        <i className="pi pi-heart"></i> My bookings
      </Link>
      <Link
        to="/search"
        className={pt.match(/\/search\/?$/) ? "text-blood" : ""}>
        <i className="pi pi-shopping-cart"></i> Book a Storage
      </Link>
      <Link
        to="profile"
        className={pt.match(/\/profile\/?$/) ? "text-blood" : ""}>
        <i className="pi pi-user"></i> My Profile
      </Link>
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
  <aside className="bg-white sticky top-8 h-screen">
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
