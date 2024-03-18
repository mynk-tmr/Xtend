import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import { useAppContext } from "@/providers/AppContextProvider";
import { api } from "../services/api";
import { Button } from "primereact/button";

export const LogOut = () => {
  const { verifyUser } = useAppContext();
  const toast = useToast();
  const { mutate: logOut, status } = useMutation({
    mutationFn: api.logout,
    onSuccess: verifyUser,
    onError: () => toast.error("Failed to log out"),
  });

  return (
    <Button disabled={status === "pending"} onClick={() => logOut()}>
      {status === "pending" ? (
        <i className="pi pi-spin pi-spinner" />
      ) : (
        "Logout"
      )}
    </Button>
  );
};
