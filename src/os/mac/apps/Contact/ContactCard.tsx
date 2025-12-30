import { useWindowStore } from "../../../../core/useWindowStore";
import { motion } from "framer-motion";
import type { WindowProps } from "../../../../core/types/window";
import { useState, type JSX } from "react";
import "../../../../App.css";

export default function ContactWindow({ desktopRef }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusedId,
    focusWindow,
    dockPositions,
  } = useWindowStore();

  const [isDragging, setIsDragging] = useState(false);

  const contact = windows.find((w) => w.id === "contact");
  if (!contact || !contact.isOpen) return null;

  const isFocused = focusedId === "contact";
  const z = contact.zIndex ?? 1;
  const dockPos = dockPositions["contact"];
  
/* ----------  Icon ------------- */
  
const actionIcons: Record<ActionKey, JSX.Element> = {
  message: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M4 4h16v12H7l-3 3V4z" />
    </svg>
  ),
  call: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M6.6 10.8c1.4 2.6 3.6 4.8 6.2 6.2l2.1-2.1c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.1 2.1z" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3 6h13v12H3z" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  ),
  mail: (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
  >
    <path d="M3 6.5C3 5.12 4.12 4 5.5 4h13C19.88 4 21 5.12 21 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 20 3 18.88 3 17.5v-11z" />
    <path
      d="M4 6l8 5 8-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

};




//  jo active dikhana ho. 


const actions = ["message", "call", "video", "mail"] as const;
type ActionKey = typeof actions[number];

const activeActions: ActionKey[] = ["message", "mail"];




  /* ───── Fixed placement (same pattern) ───── */
  const windowX = 200;
  const windowY = 120;
  const widthHalf = 240;
  const heightHalf = 200;

  /* ───── Dock minimize target ───── */
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
      onMouseDownCapture={() => focusWindow("contact")}
      style={{ zIndex: z }}
      animate={
        contact.isMinimized
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
        fixed top-28 left-52
        w-[480px] h-[400px]
        rounded-xl
        border border-neutral-800
        will-change-transform
        transition-[background,box-shadow,backdrop-filter]
        ${
          isDragging
            ? "bg-white shadow-xl"
            : isFocused
            ? "bg-white/95 backdrop-blur-xl shadow-2xl"
            : "bg-white/80 backdrop-blur-md shadow-md opacity-90"
        }
      `}
    >
      {/* ───── TITLE BAR ───── */}
      <div className="h-10 px-3 flex items-center rounded-t-lg border-b border-black/10 bg-neutral-800 text-white">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow("contact");
            }}
            className="traffic-btn traffic-red"
          >
            <span className="traffic-symbol">×</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow("contact");
            }}
            className="traffic-btn traffic-yellow dock-minimize"
          ><span className="traffic-symbol">-</span></button>


          <button className="traffic-btn traffic-green">
            <span className="traffic-symbol">+</span>
          </button>
        </div>

        <div className="flex-1 text-right  text-sm opacity-70">
          Contacts
        </div>
        <div className="flex-1"></div>
      </div>

      {/* ───── CONTENT ───── */}
      <div className="p-5 text-sm text-neutral-800">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-neutral-400
                          flex items-center justify-center
                          text-white font-semibold text-lg">
            AC
          </div>

          <div>
            <div className="font-semibold text-base">
              Akash Chandole
            </div>
            <div className="text-xs text-neutral-500">
              India
            </div>
          </div>
        </div>

        {/* ACTIONS */}
       <div className="flex m-5 justify-around mt-6">
  {actions.map((a) => {
    const isActive = activeActions.includes(a);

    return (
      <div
        key={a}
        className={`flex flex-col items-center gap-1 cursor-pointer
          ${isActive ? "text-blue-600" : "text-gray-400"}`}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center
            ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-300/40"
            }`}
        >
          {actionIcons[a]}
        </div>

        <span className="text-xs capitalize">{a}</span>
      </div>
    );
  })}
</div>





        {/* DETAILS */}
        <div className="space-y-2 mt-6 text-sm">
          <div><b>Phone:</b> +91 7498029550</div>

          <div><b>Email:</b> thechandole@gmail.com</div>
          <div><b>Website:</b> thechandole.online</div>
          <div><b>Location:</b> Jalgaon, Maharashtra, India</div>
        </div>

        {/* NOTE */}
        <div className="mt-4 text-xs text-neutral-500">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in..
        </div>
      </div>
    </motion.div>
  );
}
