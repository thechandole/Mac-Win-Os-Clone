import { motion } from "framer-motion";
import { useWindowStore } from "../../../../core/useWindowStore";
import CmdFrame from "../CommandPrompt/CmdFrame";
import Cmdbtn from "../../../../assets/taskbarIcon/cmd.png";
import CmdContent from "./CmdContent";
import type {WindowProps} from "../../../../core/types/window";



export default function CmdWindow({ desktopRef }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusWindow,
  } = useWindowStore();

  const cmd = windows.find(w => w.id === "cmd");
const terminal = windows.find(w => w.id === "terminal");

console.log("CMD:", cmd);
console.log("TERMINAL:", terminal);


//   const cmd = windows.find(w => w.id === "cmd");
  if (!cmd || !cmd.isOpen) return null;

  

  return (
    <motion.div
  drag
  dragConstraints={desktopRef}
  dragMomentum={false}
  onMouseDown={() => focusWindow("cmd")}
  style={{ zIndex: cmd.zIndex ?? 1 }}

  animate={
    cmd.isMinimized
      ? {
          opacity: 0,
          scale: 0.9,
          y: 40,
          pointerEvents: "none",
        }
      : {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
        }
  }
  transition={{
    duration: 0.25,
    ease: "easeOut",
  }}

  className="
    fixed top-24 left-40
    w-[640px] h-[500px]
    bg-black
    shadow-2xl overflow-hidden
  "
>

      <CmdFrame
        title=" Administrator : Command Prompt - @thechandole"
        icon={Cmdbtn}
        onClose={() => closeWindow("cmd")}
        onMinimize={() => minimizeWindow("cmd")}
      />

      {/* CMD CONTENT */}
      <CmdContent/>
    </motion.div>
  );
}
