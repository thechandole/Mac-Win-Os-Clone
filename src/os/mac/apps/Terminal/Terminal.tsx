import { useWindowStore } from "../../../../core/useWindowStore";
import { motion } from "framer-motion";
import type { WindowProps } from "../../../../core/types/window";
import { useState } from "react";
import { techStack } from "../../../../core/data";
import '../../../../App.css'

export default function TerminalWindow({ desktopRef }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusedId,
    focusWindow,
    dockPositions,
  } = useWindowStore();

  //hook ko hamesha top pe rakhna hota he ki loop ya conditional statement ke bad nhi (early return)

  const [isDragging, setIsDragging] = useState(false);

  const terminal = windows.find((w) => w.id === "terminal");
  if (!terminal || !terminal.isOpen) return null;

  const isFocused = focusedId === "terminal";
  const z = terminal.zIndex ?? 1;
  const dockPos = dockPositions["terminal"];

  /* ───── Terminal fixed placement ───── */
  const windowX = 160;
  const windowY = 96;
  const widthHalf = 320;
  const heightHalf = 210;

  /* ───── Dock target delta ───── */
  const targetX = dockPos ? dockPos.x - windowX - widthHalf : 0;
  const targetY = dockPos ? dockPos.y - windowY - heightHalf : 320;

  return (
    <motion.div
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0}
      whileDrag={{ scale: 1, transition: { duration: 0 } }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onMouseDownCapture={() => focusWindow("terminal")}
      style={{ zIndex: z }}
      animate={
        terminal.isMinimized
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
        fixed top-24 left-40
        w-[640px] h-[420px]
        rounded-xl
        border border-white/10
        font-mono text-green-400
        will-change-transform
        transition-[background,box-shadow,backdrop-filter]
        ${
          isDragging
            ? "bg-black shadow-xl"
            : isFocused
            ? "bg-black/95 backdrop-blur-xl shadow-2xl"
            : "bg-black/70 backdrop-blur-md shadow-md opacity-90"
        }
      `}
    >
      {/* ───── TITLE BAR ───── */}
      <div className="h-10 px-3 flex items-center border-b border-white/10 bg-neutral-900 text-white">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow("terminal");
            }}
            className="traffic-btn traffic-red"
          ><span className="traffic-symbol">×</span></button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow("terminal");
            }}
            className="traffic-btn traffic-yellow dock-minimize"
          ><span className="traffic-symbol">-</span></button>
          <button className="traffic-btn traffic-green">
            <span className="traffic-symbol">+</span>
          </button>

        </div>

        <div className="flex-1 text-center text-sm opacity-70">Terminal</div>
      </div>

      {/* ───── CONTENT ───── */}
      <div className="p-4 text-sm leading-relaxed font-mono">
        <p className="text-white mb-3">@thechandole % show tech stack</p>

     

            <h3 className="m-3 ml-11 mt-5 text-white">Category <span className="ml-8">Technologies</span></h3>

            <h3 className="mb-3 text-white/80">-----------------------------------------------------------------------</h3>

        

        <div className="space-y-">
          {techStack.map((item) => (
            <div key={item.category} className="flex gap-3">
              <span className="text-green-400 ml-2">›</span>
              <span className="w-24 ml-5 opacity-80">{item.category}</span>
              <span className="opacity-90">{item.tech}</span>
            </div>
          ))}
        </div>

         <h3 className="mt-4 text-white/80">-----------------------------------------------------------------------</h3>
        <span className="text-green-400 ml-2">›</span>
        <span className="ml-8 text-green-400 opacity-80">
            6 of 6 stacks loaded successfully (100%) </span><br/>
        <span className="text-green-400 ml-2"> 🏴</span>
        <span className="ml-6 text-white opacity-80">
            render time: 6ms </span>


      </div>
    </motion.div>
  );
}
