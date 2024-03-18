import { LoginForm } from "../components/LoginForm";
import { SkewedBackground } from "../components/Decorations";
import { useAppContext } from "@/providers/AppContextProvider";
import { Profile } from "../components/Profile";
import { Navigate, useLocation } from "react-router-dom";

export const Page = () => {
  const { user, isVerifying } = useAppContext();
  const { state } = useLocation(); /* pushed by AuthRequired.tsx */
  if (isVerifying) return null;
  if (user && state?.to)
    return <Navigate to={state.to} state={state} replace />;
  return (
    <section className="grid place-items-center p-5">
      <section className="relative max-w-prose">
        <SkewedBackground />
        {user ? <Profile user={user} /> : <LoginForm />}
      </section>
    </section>
  );
};
