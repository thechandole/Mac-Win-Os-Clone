import { useWindowStore } from "../../../../core/useWindowStore";
import { motion } from "framer-motion";
import type { WindowProps } from "../../../../core/types/window";
import { useEffect, useState } from "react";
import SafariToolbar from "./SafariToolbar";
import SafariContent from "./SafariContent";
import { resolveUrl, canOpenInIframe } from "./utils";






export default function SafariWindow({ desktopRef }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusedId,
    focusWindow,
    dockPositions,
  } = useWindowStore();

    /* ───── Home WINDOW ───── */




  /* ───── FIND WINDOW ───── */
  const safari = windows.find((w) => w.id === "safari");
  

  /* ───── LOCAL STATE ───── */
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  
  const [currentUrl, setCurrentUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  /* ───── RESET ON OPEN  ───── */

useEffect(() => {
  const reset = () => {
    setIframeUrl(null);
    setCurrentUrl("");
  };

  window.addEventListener("safari:reset", reset);
  return () => window.removeEventListener("safari:reset", reset);
}, []);


  /* ───── EARLY RETURN ───── */
  if (!safari || !safari.isOpen) return null;

  /* ───── DERIVED VALUES ───── */
  const isFocused = focusedId === "safari";
  const z = safari.zIndex ?? 1;
  const dockPos = dockPositions["safari"];


  /* ───── Safari fixed placement ───── */
  const windowX = 160;
  const windowY = 96;
  const widthHalf = 420;
  const heightHalf = 260;

  

  /* ───── Dock target delta ───── */
  const targetX = dockPos ? dockPos.x - windowX - widthHalf : 0;
  const targetY = dockPos ? dockPos.y - windowY - heightHalf : 320;

  


  function handleSearch(input: string) {
    const finalUrl = resolveUrl(input);
    if (!finalUrl) return;

    setCurrentUrl(finalUrl);

    if (canOpenInIframe(finalUrl)) {
      setIframeUrl(finalUrl);
    } else {
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    }
  }

  

  return (
    <motion.div
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0}
      whileDrag={{ scale: 1 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onMouseDownCapture={() => focusWindow("safari")}
      style={{ zIndex: z }}
      animate={
        safari.isMinimized
          ? {
              opacity: 0,
              x: targetX + 40,
              y: targetY - 30,
              scaleX: 0.25,
              scaleY: 0.08,
              transformOrigin: "bottom center",
              pointerEvents: "none",
            }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              transformOrigin: "center",
              pointerEvents: "auto",
            }
      }
      transition={{
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`
        fixed flex flex-col overflow-hidden top-10 left-40
        w-[1040px] h-[620px]
        rounded-xl overflow-hidden
        will-change-transform
        transition-[background,box-shadow,backdrop-filter]
        ${
          isDragging
            ? "bg-white/80 shadow-xl opacity-50"
            : isFocused
            ? "bg-white/90 shadow-2xl opacity-95"
            : "bg-white/80 shadow-md opacity-90"
        }
      `}
    >
      <SafariToolbar
        
        currentUrl={currentUrl}
        onSearch={handleSearch}
        onClose={() => closeWindow("safari")}
        onMinimize={() => minimizeWindow("safari")}
        onResetSafari={() => {
          setIframeUrl(null);
          setCurrentUrl("");
        }}
      />

      <SafariContent
        iframeUrl={iframeUrl}
        onSearch={handleSearch}
        clearIframe={() => setIframeUrl(null)}
      />
    </motion.div>
  );
}


