/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiclient } from "@/lib/apiclient";
import { UserType } from "@/common/types/userType";

type AppContextType = {
  isVerifying: boolean;
  user: UserType | null;
  verifyUser: () => void;
};

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => useContext(AppContext) as AppContextType;

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, isFetching, data, refetch } = useQuery({
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
        isVerifying: isLoading || isFetching,
        user: data ?? null,
        verifyUser: refetch,
      }}>
      {children}
    </AppContext.Provider>
  );
};
