import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BootScreen } from "./BootScreen";
import { AnimatePresence } from "motion/react";

export const BootLayout = () => {
  // 👇 initial state localStorage se derive
  const [booted, setBooted] = useState(()=>{
    if (typeof localStorage === "undefined") return false;
    return localStorage.getItem("booted") === "true";
  });

  useEffect(() => {
    if (booted) return; // ✅ already booted, do nothing

    const timer = setTimeout(() => {
      setBooted(true);
      localStorage.setItem("booted", "true");
    }, 3200);

    return () => clearTimeout(timer);
  }, [booted]);

  if (!booted) return (
    <AnimatePresence>
      <BootScreen />
    </AnimatePresence>
  );

  return <Outlet />;
};
