/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiclient } from "@/lib/apiclient";

type AppContextType = {
  isLoggedIn: boolean;
  isVerifying: boolean;
  user: {
    email: string;
    password: string;
    fullname: string;
    avatar: string;
    joined: Date;
  } | null;
  verifyUser: () => void;
};

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => useContext(AppContext) as AppContextType;

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSuccess, isLoading, isFetching, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<AppContextType["user"]> => {
      try {
        return await apiclient.get("auth/validate-token").json();
      } catch (e) {
        return null;
      }
    },
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isSuccess,
        isVerifying: isLoading || isFetching,
        user: data ?? null,
        verifyUser: refetch,
      }}>
      {children}
    </AppContext.Provider>
  );
};
