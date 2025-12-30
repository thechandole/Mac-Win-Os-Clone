export function WindowsStartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1 3l10-1.5V11H1V3zm12-1.7L23 1v10H13V1.3zM1 13h10v9.5L1 21v-8zm12 0h10v10l-10-1.5V13z" />
    </svg>
  );
}
