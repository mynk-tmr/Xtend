import { LoginForm } from "./LoginForm";
import { useAppContext } from "@/providers/AppContextProvider";
import { Navigate, useLocation } from "react-router-dom";

export const Page = () => {
  const { user, isVerifying } = useAppContext();
  const { state } = useLocation(); /* pushed by AuthRequired.tsx */
  if (isVerifying) return null;
  if (user && state?.to)
    return <Navigate to={state.to} state={state} replace />;
  if (user) return <Navigate to="/dashboard/profile" replace />;
  return <LoginForm />;
};
