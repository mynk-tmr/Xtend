import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { Dashboard, ListingTable } from "@/features/dashboard";
import { AuthPage, updateUserInfoAction } from "@/features/auth";
import { HomePage } from "@/features/home";
import { PageNotFound } from "./404";
import { AuthRequired } from "./AuthRequired";
import { signInAction } from "@/features/auth";
import { Profile } from "@/features/auth";
import { FormContainer, addListAction } from "@/features/listform";
import { EditListing } from "@/features/dashboard";
import { BookingsPage } from "@/features/booking";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/auth">
          <Route index element={<AuthPage />} action={signInAction} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route element={<AuthRequired />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<ListingTable />} />
            <Route
              path="addlisting"
              action={addListAction}
              element={<FormContainer />}
            />
            <Route
              path="profile"
              element={<Profile />}
              action={updateUserInfoAction}
            />
            <Route
              path="edit/:id"
              element={<EditListing />}
              loader={EditListing.loader}
              action={addListAction}
            />
            <Route path="bookings" element={<BookingsPage />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
