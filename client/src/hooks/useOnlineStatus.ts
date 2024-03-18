import { useSyncExternalStore } from "react";

const subscribe = (fn: () => void) => {
  window.addEventListener("online", fn);
  window.addEventListener("offline", fn);
  return () => {
    window.removeEventListener("online", fn);
    window.removeEventListener("offline", fn);
  };
};

const getSnaphsot = () => navigator.onLine;

export default function () {
  return useSyncExternalStore(subscribe, getSnaphsot);
}
