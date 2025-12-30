import desktopBg from "../../assets/backgroundImage/MacImage/Desktop.webp";
import { motion } from "framer-motion";
import Dock from "./Dock";
import MenuBar from "./menuBar";
import FinderWindow from "./apps/Finder/FinderWindow";
import TerminalWindow from "./apps/Terminal/Terminal";
import { useRef } from "react";
import SafariWindow from "./apps/Browser/SafariWindow";
import ContactWindow from "./apps/Contact/ContactCard";
import PdfPreviewWindow from "./apps/Finder/PdfPreviewWindow";



export default function MacDesktop() {

    const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <> 

    
      <MenuBar/>
       {/* background Image */}
        <div
        ref={desktopRef}
        className="fixed inset-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url(${desktopBg})`,
        }}
      >
        {/* 🔥 CENTER TEXT OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

        <PdfPreviewWindow desktopRef={desktopRef} />

        <FinderWindow desktopRef={desktopRef}/>
        <TerminalWindow desktopRef={desktopRef}/>
        <SafariWindow desktopRef={desktopRef}/>
        <ContactWindow desktopRef={desktopRef}/>



        <Dock/>

      </div>
    </>
  );
}
