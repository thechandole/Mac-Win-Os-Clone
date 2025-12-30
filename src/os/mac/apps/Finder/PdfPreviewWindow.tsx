import { motion } from "framer-motion";
import { useWindowStore } from "../../../../core/useWindowStore";
import type { WindowProps } from "../../../../core/types/window";
import ResumePdf from '../../../../../public/CV-Akash_Chandole.pdf'

export default function PdfPreviewWindow({ desktopRef }: WindowProps) {
  const { windows, closeWindow, focusWindow, focusedId } = useWindowStore();

  const pdf = windows.find(w => w.id === "pdf-preview");
  if (!pdf || !pdf.isOpen) return null;

    const z = pdf.zIndex ?? 1;


  const isFocused = focusedId === "pdf-preview";

  return (
    <motion.div
      drag
      dragConstraints={desktopRef}
      dragMomentum={false}
      style={{ zIndex: z }}

      onMouseDownCapture={() => focusWindow("pdf-preview")}
      className={`
        fixed top-24 left-40
        w-[640px] h-[520px]
        rounded-xl overflow-hidden
        border border-white/10
        ${
          isFocused
            ? "bg-neutral-900 shadow-2xl"
            : "bg-neutral-900/80 shadow-lg"
        }
      `}
    >
      {/* Title Bar */}
      <div className="h-10 px-3 flex items-center border-b border-white/10">
        <button
          onClick={() => closeWindow("pdf-preview")}
          className="traffic-btn traffic-red"
        >
          <span className="traffic-symbol">×</span>
        </button>

        <div className="flex-1 text-center text-white text-sm opacity-70">
          Resume.pdf
        </div>
      </div>

      {/* PDF Preview */}
      <iframe
        src= {ResumePdf}
        className="w-full h-[calc(100%-40px)] bg-white"
      />
    </motion.div>
  );
}
