import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { useEffect, useState } from "react";
import type { WindowProps } from "../../../../core/types/window";
import { useWindowStore } from "../../../../core/useWindowStore";
import BrowserIcon from "../../../../assets/taskbarIcon/Browser.png";
import BrowserView from "./BrowserView";

export default function BrowserWindow({ desktopRef }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow } =
    useWindowStore();

  
// fake loading ...
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const browser = windows.find(w => w.id === "browser");
  if (!browser || !browser.isOpen) return null;

  return (
    <motion.div
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      onMouseDown={() => focusWindow("browser")}
      style={{ zIndex: browser.zIndex ?? 1 }}
      animate={
        browser.isMinimized
          ? { opacity: 0, scale: 0.92, y: 40, pointerEvents: "none" }
          : { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        fixed top-24 left-40
        w-[960px] h-[560px]
        bg-white dark:bg-neutral-900
        shadow-2xl overflow-hidden
      "
    >
      {/* TITLE BAR */}
      <div className="h-10 flex items-center justify-between
                      bg-white dark:bg-neutral-900/80
                      backdrop-blur-md
                      border-b border-black/10 dark:border-white/10">

        <div className="flex ml-2 items-center gap-2 text-sm opacity-80">
          <img src={BrowserIcon} className="w-8 h-6" />
          Microsoft Edge
        </div>

        <div className="flex">
          <span
            onClick={() => minimizeWindow("browser")}
            className="w-11 h-10 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
            <Minus size={16} />
          </span>

          <span
            className="w-11 h-10 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center">
            <Square size={14} />
          </span>

          <span
            onClick={() => closeWindow("browser")}
            className="w-11 h-10 hover:bg-red-500 hover:text-white flex items-center justify-center">
            <X size={16} />
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full h-full">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-neutral-500">Connecting…</span>
          </div>
        ) : (
          <BrowserView/>
        )}
      </div>
    </motion.div>
  );
}
