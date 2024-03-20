import { User } from "@/common/types/user";
import { useAppContext } from "@/providers/AppContextProvider";
import { Outlet } from "react-router-dom";
import { Aside } from "./Aside";

export const Dashboard = () => {
  const { user } = useAppContext() as { user: User };
  return (
    <section className="grid grid-cols-[250px_1fr] *:m-8">
      <Aside user={user} />
      <Outlet />
    </section>
  );
};
