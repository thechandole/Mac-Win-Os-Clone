import { useEffect, useState } from "react";




type Status = "online" | "offline" | "checking";

export function useConnectivityPing(
  interval = 10000 // 10 seconds
) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const ping = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(
          () => controller.abort(),
          3000 // 3s timeout
        );

        await fetch("https://www.google.com/favicon.ico", {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
        });

        clearTimeout(timeout);
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };

    ping();
    const timer = window.setInterval(ping, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return status;
}
