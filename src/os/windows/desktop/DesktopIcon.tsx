import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Props = {
  icon: string;
  label: string;
  onOpen: () => void;
  desktopRef: React.RefObject<HTMLDivElement | null>;

};

export default function DesktopIcon({ icon, label, onOpen, desktopRef }: Props) {

  const [selected, setSelected] = useState(false);
  const dragRef = useRef(false);


  return (
    <motion.div
      className={`
        flex flex-col items-center gap-1 w-20 cursor-pointer select-none
        rounded-md p-1
        ${selected ? "" : "hover:bg-white/10"}
      `}
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => (dragRef.current = true)}
      onDragEnd={() =>
        setTimeout(() => (dragRef.current = false), 0)
      }
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (!dragRef.current) {
          onOpen();
        }
      }}
    >
      <img src={icon} className="w-12 h-12 object-contain truncate pointer-events-none" />
      <span className="text-xs text-white text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}
