import { Search, Power } from "lucide-react";

const pinnedApps = [
  { name: "Browser", icon: "🌐" },
  { name: "Files", icon: "📁" },
  { name: "Terminal", icon: "💻" },
  { name: "Settings", icon: "⚙️" },
  { name: "VS Code", icon: "🧩" },
  { name: "Store", icon: "🛍️" },
];

export default function StartMenu() {
  return (
    <div
      className="
        absolute bottom-16 left-1/2 -translate-x-1/2
        w-[520px] h-[620px]
        bg-white/80 dark:bg-neutral-900/80
        backdrop-blur-xl
        rounded-2xl shadow-2xl
        border border-black/10 dark:border-white/10
        text-black dark:text-white
      "
    >
      {/* Search */}
      <div className="p-4">
        <div
          className="
            flex items-center gap-2
            bg-neutral-100 dark:bg-neutral-800
            rounded-lg px-3 h-10
          "
        >
          <Search size={16} className="opacity-60" />
          <input
            placeholder="Type here to search"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Pinned */}
      <div className="px-6">
        <div className="text-sm font-medium opacity-70 mb-3">
          Pinned
        </div>

        <div className="grid grid-cols-6 gap-4">
          {pinnedApps.map((app) => (
            <div
              key={app.name}
              className="
                flex flex-col items-center gap-2
                cursor-pointer
                hover:bg-black/5 dark:hover:bg-white/10
                rounded-lg p-2 transition
              "
            >
              <div
                className="
                  w-10 h-10 rounded-xl
                  bg-white dark:bg-neutral-800
                  flex items-center justify-center
                  shadow
                "
              >
                {app.icon}
              </div>
              <span className="text-xs text-center">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-14 px-4
          flex items-center justify-between
          border-t border-black/10 dark:border-white/10
        "
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500" />
          <span className="text-sm">Akash</span>
        </div>

        <span
          className="
            w-9 h-9 rounded-full
            hover:bg-black/10 dark:hover:bg-white/10
            flex items-center justify-center
          "
        >
          <Power size={16} />
        </span>
      </div>
    </div>
  );
}
