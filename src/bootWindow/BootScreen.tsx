import AppleLogo from '../../public/AppleLogo.jpg'
import { motion } from "framer-motion";

export const BootScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <motion.div
       
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6 }}
>
      
        <motion.img
  src={AppleLogo}
  alt="OS Logo"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  style={{
  maskImage: "radial-gradient(circle, white 60%, transparent 80%)",
  WebkitMaskImage: "radial-gradient(circle, white 60%, transparent 80%)",
}}

  className="w-37 h-37 object-contain
             drop-shadow-[0_0_22px_rgba(255,255,255,0.45)] mix-blend-screen"
/>

      </motion.div>

      <div className="mt-4 h-1 w-50 bg-neutral-700 rounded overflow-hidden">
        <motion.div
          className="h-full bg-white/90"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
