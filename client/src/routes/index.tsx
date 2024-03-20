import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { Dashboard, MyListings } from "@/features/dashboard";
import { AuthPage, updateUserInfoAction } from "@/features/auth";
import { HomePage } from "@/features/home";
import { PageNotFound } from "./404";
import { AuthRequired } from "./AuthRequired";
import { signInAction } from "@/features/auth";
import { Profile } from "@/features/auth";
import { FormContainer, addListAction } from "@/features/listform";

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
            <Route index element={<MyListings />} />
            <Route
              path="addlisting"
              element={<FormContainer />}
              action={addListAction}
            />
            <Route
              path="profile"
              element={<Profile />}
              action={updateUserInfoAction}
            />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
