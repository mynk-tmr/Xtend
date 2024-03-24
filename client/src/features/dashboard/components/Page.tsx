import { User } from "@/types/user";
import { useAppContext } from "@/providers/AppContextProvider";
import { LoaderFunction, Outlet } from "react-router-dom";
import { Aside } from "./Aside";
import { bookapi } from "@/features/booking";

export const Dashboard = () => {
  const { user } = useAppContext() as { user: User };
  return (
    <section className="grid md:grid-cols-[250px_1fr] *:m-8">
      {<Aside user={user} />}
      <Outlet />
    </section>
  );
};

const loader: LoaderFunction = async () => {
  try {
    return await bookapi.newcustomers();
  } catch (err) {
    return { count: 0 };
  }
};

Dashboard.loader = loader;
