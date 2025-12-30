import { X, Minus, Square } from "lucide-react";

type Props = {
  title: string;
  icon: string;
  onClose: () => void;
  onMinimize: () => void;
};

export default function CmdFrame({
  title,
  icon,
  onClose,
  onMinimize,
}: Props) {
  return (
    <div
      className="
        h-10
        flex items-center justify-between
        
        bg-white dark:bg-neutral-900/80
        backdrop-blur-md
        border-b border-black/10 dark:border-white/10
        select-none
      "
    >
      {/* LEFT: icon + title */}
      <div className="flex ml-2 items-center gap-2 text-sm font-medium opacity-80">
        <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        <span>{title}</span>
      </div>


      {/* Controls */}
      <div className="flex items-center">
        <span
          onClick={onMinimize}
          className="
            w-11 h-10
            flex items-center justify-center
            hover:bg-black/5 dark:hover:bg-white/10
          "
        >
          <Minus size={16} />
        </span>
        <span
          className="
            w-11 h-10
            flex items-center justify-center
            hover:bg-black/5 dark:hover:bg-white/10
          "
        >
          <Square size={14} />
          </span>

        <span
          onClick={onClose}
          className="
            w-11 h-10
            flex items-center justify-center
            hover:bg-red-500 hover:text-white
          "
        >
          <X size={16} />
        </span>
      </div>
    </div>
  );
}
