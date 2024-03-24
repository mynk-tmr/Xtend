import {
  AuthPage,
  LoginForm,
  Profile,
  RegistrationForm,
} from "@/features/auth";
import { UserBookingsPage, RequestBookingPage } from "@/features/booking";
import { Dashboard, EditListing, ListingTable } from "@/features/dashboard";
import { HomePage } from "@/features/home";
import { FormContainer, addListAction } from "@/features/listing";
import { SearchPage } from "@/features/search";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { PageNotFound } from "./404";
import { AuthRequired } from "./AuthRequired";
import { CustomersPage } from "@/features/customers";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="login" />} />
          <Route
            path="register"
            element={<RegistrationForm />}
            action={RegistrationForm.action}
          />
          <Route
            path="login"
            element={<LoginForm />}
            action={LoginForm.action}
          />
        </Route>
        <Route
          path="/search"
          element={<SearchPage />}
          loader={SearchPage.loader}
        />
        <Route
          path="/book/:id"
          element={<RequestBookingPage />}
          loader={RequestBookingPage.loader}
          action={RequestBookingPage.action}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<AuthRequired />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
            loader={Dashboard.loader}>
            <Route index element={<ListingTable />} />
            <Route
              path="addlisting"
              action={addListAction}
              element={<FormContainer />}
            />
            <Route
              path="profile"
              element={<Profile />}
              action={Profile.action}
            />
            <Route
              path="edit/:id"
              element={<EditListing />}
              loader={EditListing.loader}
              action={addListAction}
            />
            <Route
              path="bookings"
              element={<UserBookingsPage />}
              loader={UserBookingsPage.loader}
              action={UserBookingsPage.action}
            />
            <Route
              path="customers"
              element={<CustomersPage />}
              loader={CustomersPage.loader}
              action={CustomersPage.action}
            />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
