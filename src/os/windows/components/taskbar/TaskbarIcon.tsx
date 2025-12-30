import {motion} from 'framer-motion'

type TaskbarIconProps = {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  active?: boolean;

  /** icon box size & styles */
  className?: string;

  /** outer wrapper (for translate / spacing etc.) */
  wrapperClassName?: string;
};

export default function TaskbarIcon({
  src,
  alt,
  icon,
  active = false,
  className = "",
}: TaskbarIconProps) {
  return (
    <motion.div
      className={`
    relative flex flex-col items-center overflow-visible
    transition-transform duration-200 ease-out
    ${active ? "scale-[1.06] -translate-y-[2px]" : ""}
  `}
    >

      {/* Icon */}
      <div
         className={`
    flex items-center justify-center
    rounded-md
    transition-all duration-150
    pb-2   // 👈 IMPORTANT
    ${className}
  `}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain pointer-events-none"
          />
        ) : (
          icon
        )}
      </div>
      {/* Active indicator */}

      {active && (
  <span
    className="
      absolute
      bottom-[2px]
      left-1/2
      -translate-x-1/2
      w-1.5 h-1.5
      rounded-full
      bg-blue-500
    "
  />
)}


  

    </motion.div>
  );
}
