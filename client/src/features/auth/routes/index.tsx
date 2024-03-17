import { LoginForm } from "../components/LoginForm";
import { Outlet } from "react-router-dom";
import { UpdateProfile } from "../components/UpdateProfile";
import { SkewedBackground } from "../components/Decorations";

export const authRoutes = {
  path: "/auth",
  element: (
    <section className="grid place-items-center p-5">
      <section className="relative max-w-prose">
        <SkewedBackground />
        <Outlet />
      </section>
    </section>
  ),
  children: [
    {
      path: "update",
      element: <UpdateProfile />,
    },
    {
      path: "login",
      element: <LoginForm />,
      index: true,
    },
  ],
};
