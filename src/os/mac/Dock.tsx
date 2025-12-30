import { useRef, useState } from "react";


import type { ReactNode } from "react";
import DockIcon from "./DockIcon";

export type DockItem = {
  id: string;        // 👈 REQUIRED
  label: string;
  icon: ReactNode;
  menu: { label: string }[];
  active?: boolean;
};





// eslint-disable-next-line react-refresh/only-export-components
export const dockItems: DockItem[] = [
  {
    id: "finder",
    label: "Finder",
    icon: (
      <img
        src="/src/assets/dockIcon/Finder.png"
        alt="Finder"
        draggable={true}
      />
    ),
    menu: [{ label: "File" }, { label: "Edit" }, { label: "View" }],
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: (
      <img
        src="/src/assets/dockIcon/Terminal.png"
        alt="Preview"
        draggable={true}
      />
    ),
    menu: [{ label: "File" }, { label: "Edit" }, { label: "View" }],
  },
  {
    id: "safari",
    label: "Safari",
    icon: (
      <img
        src="/src/assets/dockIcon/safari.png"
        alt="Safari"
        draggable={true}
      />
    ),
    menu: [{ label: "File" }, { label: "Edit" }, { label: "View" }],
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <img
        src="/src/assets/dockIcon/Contact.png"
        alt="LinkedIn"
        draggable={true}
      />
    ),
    menu: [{ label: "File" }, { label: "Edit" }, { label: "View" }],

  },
];





export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div
        ref={dockRef}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="flex gap-7 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.label}
            item={item}
            mouseX={mouseX}
            // @ts-ignore: dockRef not declared in DockIcon props (add it to DockIcon Props instead to fix properly)
            dockRef={dockRef}
          />
        ))}
      </div>
    </div>
  );
}