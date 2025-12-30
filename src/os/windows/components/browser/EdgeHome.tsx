import { Search } from "lucide-react";
import edgeIcon from "../../../../assets/taskbarIcon/Browser.png";
import linkedinIcon from "../../../../assets/safari icon/linkedin.svg";
import naukriIcon from "../../../../assets/safari icon/naukri.png";
import portfolioIcon from "../../../../assets/safari icon/portfolio.svg";
import githubIcon from "../../../../assets/safari icon/github-142-svgrepo-com.svg";
import { useState } from "react";

const shortcuts = [
  {
    name: "Portfolio",
    url: "https://www.thechandole.online",
    icon: portfolioIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/thechandole",
    icon: githubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/akash-chandole-57830223b/",
    icon: linkedinIcon,
  },
  {
    name: "Naukri",
    url: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    icon: naukriIcon,
  },
];

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

type Props = {
  onNavigate: (query: string) => void;
};

export default function EdgeHome({ onNavigate }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      />
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Search */}
        <div
          className="mt-36 w-[620px] h-[52px]
                   bg-white rounded-full shadow-xl
                   flex items-center px-5 gap-3"
        >
          <Search size={18} className="text-neutral-500" />

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onNavigate(value)}
            placeholder="Search the web"
            className="flex-1 outline-none text-gray-700"
          />

          <img
            src={edgeIcon}
            alt="Search"
            className="w-12 h-12 translate-x-3 object-contain cursor-pointer"
            onClick={() => onNavigate(value)}
          />
        </div>

        {/* Shortcuts */}
        <div className="mt-13  grid grid-cols-4 gap-10">
          {shortcuts.map((s) => (
            <span
              key={s.name}
              onClick={() => openExternal(s.url)}
              className="flex flex-col items-center gap-2 focus:outline-none"
            >
              <div className="w-16 h-16 rounded-xl p-3  hover:-translate-y-1 transition-all duration-200 bg-white/90 flex items-center justify-center shadow-md hover:scale-105 cursor-pointer">
                <img
                  src={s.icon}
                  className="w-10 h-10 object-contain p-0.5"
                  alt={s.name}
                />
              </div>
              <span className="text-xs text-white/90">{s.name}</span>
            </span>
          ))}
        </div>

        {/* Widgets */}
        <div className="absolute top-6 right-6 text-white text-sm flex items-center gap-2">
          ☀️ 69°F ⚙️
        </div>
      </div>
    </div>
  );
}
