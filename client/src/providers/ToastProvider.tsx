import useOnlineStatus from "@/hooks/useOnlineStatus";
import { Toast } from "primereact/toast";
import { createContext, useRef, useContext, useEffect } from "react";

type ToastType = {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
};

const ToastContext = createContext<ToastType | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext) as ToastType;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useRef<Toast>(null);
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);
  useEffect(() => {
    if (!isOnline) {
      toast.current?.show({
        severity: "warn",
        summary: "No Internet Connection",
      });
      wasOffline.current = true;
    } else if (isOnline && wasOffline.current) {
      toast.current?.show({
        severity: "success",
        summary: "Connection Restored",
      });
    }
  }, [isOnline]);
  return (
    <ToastContext.Provider
      value={{
        error: (message) =>
          toast.current?.show({ severity: "error", summary: message }),
        success: (message) =>
          toast.current?.show({ severity: "success", summary: message }),
        info: (message) =>
          toast.current?.show({ severity: "info", summary: message }),
        warn: (message) =>
          toast.current?.show({ severity: "warn", summary: message }),
      }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
