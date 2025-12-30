export function TaskbarIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      title={label}
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-md
        hover:bg-black/10 dark:hover:bg-white/10
        transition
      "
    >
      <span className="text-lg">{icon}</span>
    </button>
  );
}