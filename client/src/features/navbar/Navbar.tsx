import { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { categories } from "@/features/listing";
import useEventListener from "@/hooks/useEventListener";
import { useClickOutside } from "primereact/hooks";
import { useAppContext } from "@/providers/AppContextProvider";

export const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  useEventListener("scroll", () => setScroll(window.scrollY > 0));
  useClickOutside(submenuRef, () => setOpen(false));
  const bg = scroll ? "bg-white/70" : "bg-none";
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={`${bg} sticky md:fixed w-full top-0 z-[999] `}>
        <ul className="flex flex-wrap gap-4 p-4 [&_i]:mr-2 ml-auto w-fit">
          <li className="bg-success px-3 py-1 rounded-md">
            <Link to="/">
              <i className="pi pi-home"></i> Home
            </Link>
          </li>
          <li className="bg-success px-3 py-1 rounded-md">
            <LoginOrDashboard />
          </li>
          <li className="bg-success px-3 py-1 rounded-md relative">
            <button onClick={() => setOpen(!open)}>
              <i className="pi pi-search"></i> Search
            </button>
            {open && (
              <div
                onClick={() => setOpen(false)}
                ref={submenuRef}
                className="absolute top-10 -left-8 grid gap-2 w-[25ch] bg-success rounded-md p-4">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/search?category:in=${cat}`}
                    className="hover:underline">
                    <i className="pi pi-angle-right"></i>
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="bg-success px-3 py-1 rounded-md">
            <Link to="https://github.com/mynk-tmr">
              <i className="pi pi-github"></i> Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

const LoginOrDashboard = () => {
  const { user, isVerifying } = useAppContext();
  if (isVerifying) return <i className="pi pi-spin pi-spinner"></i>;
  if (user) {
    return (
      <Link to="/dashboard">
        <i className="pi pi-user"></i> Dashboard{" "}
      </Link>
    );
  } else
    return (
      <Link to="/auth">
        <i className="pi pi-lock"></i> Login{" "}
      </Link>
    );
};
