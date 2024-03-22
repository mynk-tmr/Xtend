import { useAppContext } from "@/providers/AppContextProvider";
import { useToast } from "@/providers/ToastProvider";
import { RouteActionData } from "@/types/actions";
import { useEffect } from "react";
import { useActionData } from "react-router-dom";

export function useSubmissionEffect() {
  const { verifyUser } = useAppContext();
  const toast = useToast();
  const res = useActionData() as RouteActionData;

  useEffect(() => {
    if (res?.ok) verifyUser();
    else if (res?.error) toast.error(res.error);
  }, [res, toast, verifyUser]);
}
