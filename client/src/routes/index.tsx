import { authRoutes } from "@/features/auth";
import { homepageRoutes } from "@/features/home";
import { notFoundRoutes } from "./404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    authRoutes,
    homepageRoutes,
    notFoundRoutes,
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
