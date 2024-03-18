import { User } from "@/common/types/user";
import { useAppContext } from "@/providers/AppContextProvider";
import { Avatar } from "primereact/avatar";
import { Link, Outlet } from "react-router-dom";

const Aside = ({ user }: { user: User }) => (
  <aside className="bg-white p-4 -m-4 mr-8 h-screen">
    <section className="grid justify-items-center">
      <Avatar
        shape="circle"
        className="size-16 ring ring-navy mb-4"
        image={user.avatar}
        label={user.fullname[0]}
      />
      <b className=" text-navy mb-4">{user?.fullname}</b>
      <article className="bg-neutral p-2 rounded-md">
        <h1 className="text-center font-semibold mb-2">
          Free Plan <i className="pi pi-gift"></i>
        </h1>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          <li>
            <b>8</b> Listings
          </li>
          <li>
            <b>2</b> remaining
          </li>
          <li>
            <b>2</b> Boosted
          </li>
          <li>
            <b>0</b> Boosts Left
          </li>
        </ul>
      </article>
      <nav className="grid gap-5 py-6 text-sm items-center [&_i]:align-middle  hover:*:text-ink [&_i]:mr-5">
        <Link to="/dashboard">
          <i className="pi pi-key"></i> My Listings
        </Link>
        <Link to="addlisting">
          <i className="pi pi-plus"></i> Add new Listing
        </Link>
        <Link to="bookings">
          <i className="pi pi-heart"></i> My bookings
        </Link>
        <Link to="/search">
          <i className="pi pi-shopping-cart"></i> Book a Storage
        </Link>
        <Link to="/auth">
          <i className="pi pi-user"></i> My Profile
        </Link>
      </nav>
    </section>
  </aside>
);

export const Dashboard = () => {
  const { user } = useAppContext() as { user: User };
  return (
    <section className="flex">
      <Aside user={user} />
      <Outlet />
    </section>
  );
};
