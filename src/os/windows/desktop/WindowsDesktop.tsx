import desktopBg from '../../../assets/backgroundImage/WinImage/Desktop.png'
import {motion} from 'framer-motion'
import WindowsTaskbar from "../../windows/components/taskbar/WindowsTaskbar";
import BrowserImg from "../../../assets/taskbarIcon/Browser.png";
import { useRef } from 'react';
import CmdWindow from "../../windows/components/CommandPrompt/CmdWindow";
import BrowserWindow from '../components/browser/BrowserWindow';
import DesktopIcon from './DesktopIcon';
import { useWindowStore } from '../../../core/useWindowStore';
import pdfImage from '../../../../public/pdf.png'
import PdfPreviewWindow from '../../mac/apps/Finder/PdfPreviewWindow';


export default function WindowsDesktop() {

const { openWindow, restoreWindow, windows } = useWindowStore();
const browser = windows.find(w => w.id === "browser");


  const desktopRef = useRef<HTMLDivElement>(null);


  
  return (
    <div
        className="fixed inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${desktopBg})`,
        }}
      >
        {/* 🔥 CENTER TEXT OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center ">
          
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="text-center px-6"
  >
    <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight">
      <span className="absolute inset-0 blur-2xl bg-white/10 rounded-full" />
      <span className="relative bg-linear-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
        Akash Chandole
      </span>
    </h1>

    <p className="mt-5 text-white/70 text-xl">
      Crafting desktop-like experiences on the web
    </p>
  </motion.div>

</div>

{/* Desktop shortcut app */}

<div ref={desktopRef} className="fixed inset-0 bg-cover bg-center">
  <DesktopIcon
    icon={BrowserImg}
    label="Microsoft Edge"
    desktopRef={desktopRef}
    onOpen={() => {
      if (!browser?.isOpen) {
        openWindow("browser");
      } else if (browser.isMinimized) {
        restoreWindow("browser");
      }
    }}
  />
  <DesktopIcon
    icon={pdfImage}
    label="Resume.pdf"
    desktopRef={desktopRef}
    onOpen={() => {
      if (!browser?.isOpen) {
        openWindow("pdf-preview");
      }
    }}
  />


  
</div>


            {/* <WindowsStartMenu/> */}
            <PdfPreviewWindow desktopRef={desktopRef} />


            <BrowserWindow desktopRef={desktopRef} />
            <CmdWindow desktopRef={desktopRef} />
            <WindowsTaskbar/>
    </div>

  );
}
