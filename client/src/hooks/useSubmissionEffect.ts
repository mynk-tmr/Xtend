import { useToast } from "@/providers/ToastProvider";
import { RouteActionData } from "@/types/actions";
import { useEffect } from "react";
import { useActionData } from "react-router-dom";

export function useSubmissionEffect(
  onSuccess: () => void,
  successToast: string
) {
  const toast = useToast();
  const res = useActionData() as RouteActionData;

  useEffect(() => {
    if (res?.ok) {
      if (onSuccess) onSuccess();
      if (successToast) toast.success(successToast);
    } else if (res?.error) toast.error(res.error);
    return () => {
      res?.ok && (res.ok = false);
      res?.error && (res.error = "");
    };
  }, [res, toast, onSuccess, successToast]);
}
