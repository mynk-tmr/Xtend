import { useAppContext } from "@/providers/AppContextProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Page = () => {
  const { user, isVerifying } = useAppContext();
  const { state } = useLocation(); /* pushed by AuthRequired.tsx */
  if (isVerifying)
    return (
      <div className="h-screen grid place-items-center">
        <i className="pi pi-spin pi-spinner text-3xl"></i>
        <h1>Verifying ...</h1>
      </div>
    );
  if (user && state?.to)
    return <Navigate to={state.to} state={state} replace />;
  if (user) return <Navigate to="/dashboard/profile" replace />;
  return <Outlet />;
};
