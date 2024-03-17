import { LoginForm } from "../components/LoginForm";
import { Outlet } from "react-router-dom";

export const authRoutes = {
  path: "/auth",
  element: (
    <section className="grid place-items-center p-5">
      <Outlet />
    </section>
  ),
  children: [
    {
      path: "register",
      element: <></>,
    },
    {
      path: "login",
      element: <LoginForm />,
      index: true,
    },
  ],
};
