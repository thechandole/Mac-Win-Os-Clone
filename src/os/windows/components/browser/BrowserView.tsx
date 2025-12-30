import { useState } from "react";
import EdgeHome from "./EdgeHome";
import { X, Plus } from "lucide-react";
import EdgeAddressBar from "./EdgeAddressBar";

const INTERNAL_SITES = ["thechandole.online"];

type Tab = {
  id: string;
  title: string;
  url: string | null; // null = EdgeHome
  mode: "home" | "web";
};

function createNewTab(): Tab {
  return {
    id: crypto.randomUUID(),
    title: "New Tab",
    url: null,
    mode: "home",
  };
}

// Smart URL Resolver
function resolveInput(input: string) {
  if (!input) return null;
  if (/^https?:\/\//.test(input)) return input;
  if (input.includes(".")) return `https://${input}`;
  return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
}

export default function BrowserView() {
  const [tabs, setTabs] = useState<Tab[]>([createNewTab()]);
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [address, setAddress] = useState("");

  const activeTab = tabs.find(t => t.id === activeId)!;

  function isInternal(url: string) {
  return INTERNAL_SITES.some(site => url.includes(site));
}

function smartNavigate(input: string) {
  const resolved = resolveInput(input);
  if (!resolved) return;

  if (!isInternal(resolved)) {
    window.open(resolved, "_blank", "noopener,noreferrer");
    return;
  }

  // internal iframe navigation
  setTabs(tabs =>
    tabs.map(t =>
      t.id === activeId
        ? {
            ...t,
            url: resolved,
            mode: "web",
            title: input,
          }
        : t
    )
  );
}

  function newTab() {
    const tab = createNewTab();
    setTabs(t => [...t, tab]);
    setActiveId(tab.id);
    setAddress("");
  }

  function closeTab(id: string) {
    const remaining = tabs.filter(t => t.id !== id);
    if (remaining.length === 0) {
      const tab = createNewTab();
      setTabs([tab]);
      setActiveId(tab.id);
    } else {
      setTabs(remaining);
      setActiveId(remaining[0].id);
    }
  }

  return (
    <div className="flex flex-col h-full">

      {/* Tabs */}
      <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 h-9 px-2 gap-1">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => {
              setActiveId(tab.id);
              setAddress(tab.url ?? "");
            }}
            className={`px-3 h-7 rounded-md flex items-center gap-2 cursor-pointer
              ${tab.id === activeId
                ? "bg-white dark:bg-neutral-900"
                : "opacity-70 hover:bg-black/10"}`}
          >
            <span className="text-xs truncate max-w-[120px]">
              {tab.title}
            </span>
            <X
              size={12}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            />
          </div>
        ))}
        <Plus size={16} className="ml-2 cursor-pointer" onClick={newTab} />
      </div>

{/* Address Bar */}
<EdgeAddressBar
  value={address}
  onChange={setAddress}
  onSubmit={() => smartNavigate(address)}
/>

      {/* Page */}
      <div className="flex-1 bg-white">
        {activeTab.mode === "home" ? (
         <EdgeHome onNavigate={smartNavigate} />
        ) : (
          <iframe
            src={activeTab.url!}
            className="w-full h-full border-none"
          />
        )}
      </div>
    </div>
  );
}
