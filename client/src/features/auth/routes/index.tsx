import { LoginForm } from "../components/LoginForm";
import { SkewedBackground } from "../components/Decorations";
import { useAppContext } from "@/providers/AppContextProvider";
import { Profile } from "../components/Profile";

export const authRoutes = {
  path: "/auth",
  Component: () => {
    const { user, isVerifying } = useAppContext();
    if (isVerifying) return null;
    const element = user ? <Profile user={user} /> : <LoginForm />;
    return (
      <section className="grid place-items-center p-5">
        <section className="relative max-w-prose">
          <SkewedBackground />
          {element}
        </section>
      </section>
    );
  },
};
