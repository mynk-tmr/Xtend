import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { ListingPage } from "@/features/listing";
import { AuthPage } from "@/features/auth";
import { HomePage } from "@/features/home";
import { PageNotFound } from "./404";
import { AuthRequired } from "./AuthRequired";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route
        path="/"
        element={
          <main style={{ fontFamily: "Lato, sans-serif" }}>
            <Outlet />
          </main>
        }>
        <Route index element={<HomePage />} />
        <Route path="/auth">
          <Route index element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route element={<AuthRequired />}>
          <Route path="/listing/*" element={<ListingPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
