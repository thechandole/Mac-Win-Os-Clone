import SafariHome from "./SafariHome";

type Props = {
  iframeUrl: string | null;
  onSearch: (q: string) => void;
  clearIframe: () => void;
};

export default function SafariContent({
  iframeUrl,
  onSearch,
  clearIframe,
}: Props) {
  if (!iframeUrl) {
    return <SafariHome onSearch={onSearch} />;
  }

  return (
    // 🔥 IMPORTANT: flex-1 + relative
    <div className="flex-1 relative overflow-hidden bg-transparent">

      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-forms"
        onError={() => {
          window.open(iframeUrl, "_blank");
          clearIframe();
        }}
      />

      {/* Fallback bar */}
     <div className="absolute inset-0 pointer-events-none">
  <div className="absolute bottom-3 right-3 opacity-0 hover:opacity-100 transition pointer-events-auto">
    <button
      onClick={() => window.open(iframeUrl, "_blank")}
      className="px-3 py-1.5 rounded-md text-xs bg-black/70 text-black backdrop-blur shadow-lg"
    >
      Open in real browser
    </button>
  </div>
</div>
    </div>
  );
}
