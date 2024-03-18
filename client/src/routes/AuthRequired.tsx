import { useAppContext } from "@/providers/AppContextProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthRequired = () => {
  const { user } = useAppContext();
  const { pathname: to, state } = useLocation();
  if (!user) return <Navigate to="/auth" state={{ ...state, to }} />;
  return <Outlet />;
};
