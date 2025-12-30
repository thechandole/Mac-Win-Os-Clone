import {
  Wifi,
  WifiOff,
  BatteryCharging,
  BatteryMediumIcon,
  Search,
  Loader,
} from "lucide-react";
import { useMenuStore } from "../../core/useMenuStore";
import { useDateTime } from "../../core/useDateTime";
import { useBattery } from "../../core/useBattery";
import { useConnectivityPing } from "../../core/useConnectivityPing";
import { useOSStore } from "../../stores/useOSStore";
import { WindowsIcon } from "./WindowsIcon";

export default function MenuBar() {
  const { appName, menuItems } = useMenuStore();
  const dateTime = useDateTime();
  const { battery, charging } = useBattery();
  const status = useConnectivityPing();
  const { os, toggleOS } = useOSStore();

  return (
    <div
      className="fixed top-0 inset-x-0 h-7 px-4
                    flex items-center justify-between
                    bg-black/30 backdrop-blur-md
                    text-white text-sm z-50"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 font-medium">
        <span className="text-xl"></span>
        <span>{appName}</span>
        {menuItems.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 font-bold">
        <div className="flex items-center gap-2">
          {status === "checking" && (
            <Loader size={16} className="animate-spin" />
          )}
          {status === "online" && <Wifi size={18} />}
          {status === "offline" && (
            <WifiOff size={18} className="opacity-60 text-gray" />
          )}
        </div>
        <Search size={15} />

        <div className="flex items-center">
          {charging ? (
            <BatteryCharging size={19} />
          ) : (
            <BatteryMediumIcon size={19} />
          )}
        </div>
        <span className="text-xs">
          {battery !== null ? `${battery}%` : "--%"}
        </span>
        <button
          onClick={toggleOS}
          title={`Switch to ${os === "mac" ? "Windows 11" : "macOS"}`}
          className="flex items-center justify-center
    rounded os-toggle

    transition-all duration-100
    active:scale-95
    active:translate-y-[1px]"
        >
          {os === "mac" && <WindowsIcon size={15} className="text-white/90" />}

          {os === "windows" && (
            <span className="text-sm font-semibold text-white/90"></span>
          )}
        </button>

        <span className="text-xs whitespace-nowrap">
          {dateTime.split(" ").slice(0, 3).join("  ")}
        </span>
        <span className="text-xs ml-0.2">
          {dateTime.split(" ").slice(4).join(" ")}
        </span>
      </div>
    </div>
  );
}
