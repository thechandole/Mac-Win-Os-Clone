import { ArrowLeft, RotateCw, Star, Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
};

export default function EdgeAddressBar({
  value,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="h-11 px-3 flex items-center gap-2
                    bg-[#1f1f1f] border-b border-white/10">

      {/* Back */}
      <span className="w-8 h-8 flex items-center justify-center
                         rounded-full hover:bg-white/10">
        <ArrowLeft size={16} className="text-white/70" />
      </span>

      {/* Reload */}
      <span className="w-8 h-8 flex items-center justify-center
                         rounded-full hover:bg-white/10">
        <RotateCw size={16} className="text-white/70" />
      </span>

      {/* Address Input */}
      <div className="flex-1 h-8 flex items-center gap-2
                      bg-[#2b2b2b] rounded-full px-3
                      border border-transparent
                      focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.6)]
                      focus-within:border-blue-500">

        <Search size={14} className="text-white/50" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="Search or enter web address"
          className="flex-1 bg-transparent outline-none
                     text-sm text-white placeholder-white/40"
        />

        <Star size={14} className="text-white/50 hover:text-yellow-400 cursor-pointer" />
      </div>
    </div>
  );
}
