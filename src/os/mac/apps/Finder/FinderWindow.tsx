import { useWindowStore } from "../../../../core/useWindowStore";
import { FinderLayout, type FinderFile } from "./FinderLayout";
import { motion } from "framer-motion";
import type { WindowProps } from "../../../../core/types/window";
import { useState } from "react";
import "../../../../App.css";

export default function FinderWindow({ desktopRef }: WindowProps) {
  /* ───── STORE ───── */
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusedId,
    focusWindow,
    dockPositions,
  } = useWindowStore();

  const [isDragging, setIsDragging] = useState(false);

  /* ───── FINDER WINDOW STATE ───── */
  const finder = windows.find((w) => w.id === "finder");
  if (!finder || !finder.isOpen) return null;

  const isFocused = focusedId === "finder";
  const z = finder.zIndex ?? 1;
  const dockPos = dockPositions["finder"];

  /* ───── POSITION CALC ───── */
  const windowX = 96;
  const windowY = 48;
  const widthHalf = 360;
  const heightHalf = 230;

  const targetX = dockPos ? dockPos.x - windowX - widthHalf : 0;
  const targetY = dockPos ? dockPos.y - windowY - heightHalf : 320;

  /* ───── FILE DATA ───── */
  const files: FinderFile[] = [
    {
      name: "Resume.pdf",
      type: "file",
      fileType: "pdf",
    },
    {
      name: "Projects",
      type: "folder",
    },
    {
      name: "Images",
      type: "folder",
    },
  ];

  return (
    <motion.div
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onMouseDownCapture={() => focusWindow("finder")}
      style={{ zIndex: z }}
      animate={
        finder.isMinimized
          ? {
              opacity: 0,
              x: targetX + 60,
              y: targetY - 40,
              scaleX: 0.25,
              scaleY: 0.05,
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
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        fixed top-12 left-24
        w-[720px] h-[460px]
        rounded-xl
        border border-white/10
        overflow-hidden
        select-none
        ${
          isDragging
            ? "bg-neutral-900 shadow-xl"
            : isFocused
            ? "bg-neutral-900/95 backdrop-blur-xl shadow-2xl"
            : "bg-neutral-900/70 backdrop-blur-md shadow-md opacity-95"
        }
      `}
    >
      {/* ───── TITLE BAR ───── */}
      <div className="h-10 px-3 flex items-center border-b border-white/10 bg-neutral-900">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow("finder");
            }}
            className="traffic-btn traffic-red"
          >
            <span className="traffic-symbol">×</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow("finder");
            }}
            className="traffic-btn traffic-yellow"
          >
            <span className="traffic-symbol">-</span>
          </button>

          <button className="traffic-btn traffic-green">
            <span className="traffic-symbol">+</span>
          </button>
        </div>

        <div className="flex-1 text-center text-white font-bold text-sm opacity-70">
          Finder
        </div>
      </div>

      {/* ───── CONTENT ───── */}
      <FinderLayout title="Desktop" files={files} />
    </motion.div>
  );
}
