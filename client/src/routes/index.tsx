//import { authRoutes } from "@/features/auth";
import { homepageRoutes } from "@/features/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([/* authRoutes, */ homepageRoutes]);
  return <RouterProvider router={router} />;
};

export default Router;
