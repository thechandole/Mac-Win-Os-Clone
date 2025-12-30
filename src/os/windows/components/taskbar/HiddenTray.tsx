import { Users } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
  {
    label: "Email",
    value: "akash.chandole@email.com",
    href: "mailto:akash.chandole@email.com",
    icon: "✉️",
  },
  {
    label: "Portfolio",
    value: "thechandole.online",
    href: "https://www.thechandole.online",
    icon: "🌐",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/thechandole",
    href: "https://linkedin.com/in/thechandole",
    icon: "💼",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HiddenTray({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{
            duration: 0.18,
            ease: "easeOut",
          }}
          className="
            fixed bottom-14 right-55
            w-50
            rounded-xl
            bg-white/90 dark:bg-neutral-900/85
            backdrop-blur-xl
            border border-black/10 dark:border-white/10
            shadow-xl
            p-3
            z-50
          "
        >
          <div className="flex items-center gap-3 mb-2">
  <div
    className="
      w-9 h-9
      flex items-center justify-center
      rounded-md
      bg-blue-500/10
    "
  >
    <Users size={18} className="text-neutral-800 dark:text-neutral-200" />

  </div>

  <div className="flex flex-col">
    <span className="text-sm font-medium">Akash Chandole</span>
    <span className="text-xs opacity-50">Frontend Developer</span>
  </div>
</div>

<div className="mt-2 flex flex-col gap-2">
  {CONTACTS.map((c) => (
    <a
      key={c.label}
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-2
        text-xs 
        px-2 py-1 rounded-md
        hover:bg-black/5 dark:hover:bg-white/10
        transition
      "
    >
      <span>{c.icon}</span>
      <span className="truncate">{c.value}</span>
    </a>
  ))}
</div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
