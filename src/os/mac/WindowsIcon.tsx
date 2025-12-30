export function WindowsIcon({
  size = 15,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ display: "block" }}
    >
      <rect x="2" y="2" width="9" height="9" />
      <rect x="13" y="2" width="9" height="9" />
      <rect x="2" y="13" width="9" height="9" />
      <rect x="13" y="13" width="9" height="9" />
    </svg>
  );
}
