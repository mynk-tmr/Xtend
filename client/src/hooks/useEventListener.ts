import { useCallback, useEffect } from "react";

export default function (event: string, listener: () => void) {
  /* eslint-disable */
  const f = useCallback(listener, []);
  useEffect(() => {
    window.addEventListener(event, f);
    return () => window.removeEventListener(event, f);
  }, [f]);
}
