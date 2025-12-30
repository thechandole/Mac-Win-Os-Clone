import { useRef, useLayoutEffect, useState, useEffect } from "react";
import type { DockItem } from "./Dock";
import { useMenuStore } from "../../core/useMenuStore";
import { useWindowStore } from "../../core/useWindowStore";
import "../../App.css";


/* ───── RESET ON OPEN (⬅️ YAHAN RAKHO) ───── */


type Props = {
  item: DockItem;
  mouseX: number | null;
};

const ICON_SIZE = 48;
const MAX_SCALE = 1.8;
const RANGE = 100;

export default function DockIcon({ item, mouseX }: Props) {
  const { setMenu } = useMenuStore();

  const {
    windows,
    openWindow,
    restoreWindow,
    focusWindow,
    setDockPosition,
  } = useWindowStore();


  
  const win = windows.find((w) => w.id === item.id);
  const isActive = win?.isOpen;

  const iconRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [scale, setScale] = useState(1);
  const [bounce, setBounce] = useState(false);

  /* ─────────────────────────────────────────────
     1️⃣ Dock icon position (RUN ONCE)
  ───────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    setDockPosition(item.id, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, [item.id, setDockPosition]);

  /* ─────────────────────────────────────────────
     2️⃣ Hover magnification (mouseX driven)
  ───────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const el = iconRef.current;
    if (!el || mouseX === null) {
      rafRef.current = requestAnimationFrame(() =>
        setScale((prev) => (prev === 1 ? prev : 1))
      );
      return;
    }

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);

    const nextScale =
      distance < RANGE
        ? 1 + (1 - distance / RANGE) * (MAX_SCALE - 1)
        : 1;

    rafRef.current = requestAnimationFrame(() =>
      setScale((prev) =>
        Math.abs(prev - nextScale) < 0.001 ? prev : nextScale
      )
    );

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [mouseX]);

  /* ─────────────────────────────────────────────
     3️⃣ Dock bounce (open / restore)
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (win?.isOpen && !win?.isMinimized) {
      
      const t = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(t);
    }
  }, [win?.isOpen, win?.isMinimized]);

  /* ─────────────────────────────────────────────
     4️⃣ Click behavior (macOS correct)
  ───────────────────────────────────────────── */
  const handleClick = () => {

 setMenu(item.label, item.menu);


  // 🔥 bounce should happen on user intent
  setBounce(true);
  setTimeout(() => setBounce(false), 600);



  if (!win || !win.isOpen) {
    // ✅ Safari open → reset Home
    if (item.id === "safari") {
      window.dispatchEvent(new CustomEvent("safari:reset"));
    }

    openWindow(item.id);
  } else if (win.isMinimized) {
    restoreWindow(item.id);
  } else {
    focusWindow(item.id);
  }
};


  return (
    <div className="flex flex-col items-center text-white select-none">
      {/* ICON */}
      <div
        ref={iconRef}
        onClick={handleClick}
        className={`
          flex items-center justify-center cursor-pointer
          ${bounce ? "dock-bounce" : ""}
        `}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          transform: `scale(${scale})`,
          transition: "transform 0.18s cubic-bezier(.25,.8,.25,1)",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {item.icon}
        </div>
      </div>

      {/* ACTIVE DOT */}
      {isActive && (
        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
      )}
    </div>
  );
}
