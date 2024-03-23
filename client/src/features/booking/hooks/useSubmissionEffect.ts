import { useToast } from "@/providers/ToastProvider";
import { RouteActionData } from "@/types/actions";
import { useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";

export function useSubmissionEffect() {
  const toast = useToast();
  const res = useActionData() as RouteActionData;
  const goto = useNavigate();

  useEffect(() => {
    if (res?.ok) {
      toast.success("Booking created");
      goto("/dashboard/bookings");
    } else if (res?.error) toast.error("Failed to create booking");
  }, [res, toast, goto]);
}
