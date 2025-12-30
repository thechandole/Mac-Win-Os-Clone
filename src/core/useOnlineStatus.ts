//“At the current stage, I rely on real connectivity checks. I removed redundant abstractions to keep the system simple, but I know where and when to reintroduce them if needed.”

// Offline banner instantly dikhana chaho

// Network change pe UI turant react karwana chaho

// Mobile PWA bana rahe ho

import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}
