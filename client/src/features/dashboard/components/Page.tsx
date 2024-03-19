import { User } from "@/common/types/user";
import { useAppContext } from "@/providers/AppContextProvider";
import { Outlet } from "react-router-dom";
import { Aside } from "./Aside";

export const Dashboard = () => {
  const { user } = useAppContext() as { user: User };
  return (
    <section className="flex">
      <Aside user={user} />
      <Outlet />
    </section>
  );
};
