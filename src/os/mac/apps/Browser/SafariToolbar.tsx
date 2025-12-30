import {  Home, Search } from "lucide-react";



type Props = {
  currentUrl: string;
  onSearch: (q: string) => void;
  onClose: () => void;
  onMinimize: () => void;
  onResetSafari: () => void;
};

export default function SafariToolbar({
  currentUrl,
  onSearch,
  onClose,
  onMinimize,
  onResetSafari,
}: Props) {
  return (
    <div className="relative h-12 px-3 flex items-center bg-neutral-800 backdrop-blur-4xl border-b">
      
      {/* ───── LEFT : Traffic Lights ───── */}
      <div className="flex gap-2 z-10">
        <button onClick={onClose} className="traffic-btn traffic-red"><span className="traffic-symbol">×</span></button>
        <button onClick={onMinimize} className="traffic-btn traffic-yellow"><span className="traffic-symbol">-</span></button>
        <button className="traffic-btn traffic-green opacity-60"><span className="traffic-symbol">+</span>
        </button>
   <span
  onClick={() => onResetSafari()}
  className="
    w-6 h-6
    rounded-md
    ml-2 -translate-y-0.5
    flex items-center justify-center
    hover:bg-black/10
    transition
    cursor-pointer
  "
  title="Home"
>
  <Home size={20} className="text-white" />
</span>

        
      </div>

      {/* ───── CENTER : Address Bar (ABSOLUTE CENTER) ───── */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[420px]">

     

        <div className="relative">


          {/* Search icon */}
          
          
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
          />

          {/* Input */}
          <input
            defaultValue={currentUrl}
            placeholder="Search or enter website name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch((e.target as HTMLInputElement).value);
              }
            }}
            className="
              w-full
              pl-9 pr-4 py-1.5
              rounded-full
              bg-neutral-400
              text-sm text-neutral-800
              outline-none
              focus:ring-2 focus:ring-blue-400/40
            "
          />
        </div>
      </div>

      {/* ───── RIGHT : Empty (future icons) ───── */}
      <div className="ml-auto w-20" />
    </div>
  );
}

