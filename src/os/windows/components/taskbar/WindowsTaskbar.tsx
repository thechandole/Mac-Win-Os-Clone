import {
  BatteryCharging,
  BatteryMediumIcon,
  Cloud,
  Loader,
  Search,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWindowStore } from "../../../../core/useWindowStore";
import { useDateTime } from "../../../../core/useDateTime";
import { useBattery } from "../../../../core/useBattery";
import { useConnectivityPing } from "../../../../core/useConnectivityPing";
import { useOSStore } from "../../../../stores/useOSStore";

import TaskbarIcon from "./TaskbarIcon";
import { WindowsIcon } from "../../../mac/WindowsIcon";

import startBtn from "../../../../assets/taskbarIcon/Start.svg";
import BrowserBtn from "../../../../assets/taskbarIcon/Browser.png";
import MultiTaskbtn from "../../../../assets/taskbarIcon/MultiTask.png";
import Cmdbtn from "../../../../assets/taskbarIcon/cmd.png";
import HiddenTray from "./HiddenTray";
import StartMenu from "../start/StartMenu";


export default function WindowsTaskbar() {


  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);
  // outside click close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        startRef.current &&
        !startRef.current.contains(e.target as Node)
      ) {
        setStartOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const { windows, openWindow, minimizeWindow, restoreWindow } =
    useWindowStore();

  const dateTime = useDateTime();
  const { battery, charging } = useBattery();
  const status = useConnectivityPing();
  const { toggleOS, os } = useOSStore();
  const [trayOpen, setTrayOpen] = useState(false);

  const [muted, setMuted] = useState(false);

  const cmd = windows.find((w) => w.id === "cmd");
  const browser = windows.find((w) => w.id === "browser");

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        h-12
        flex items-center
        px-4
        bg-white/70 dark:bg-neutral-900/70
        backdrop-blur-md
        border-t border-black/10 dark:border-white/10
        z-50
      "
    >
      {/* LEFT spacer */}
      <div className="flex-[0.9]" />

      <div className="flex items-center gap-3">
        {/* Start */}
        {/* Taskbar */}
      
      
        {/* Start Button */}
        <span
          onClick={() => setStartOpen(v => !v)}
          className="w-30 h-30 rounded-md
                     
                     flex items-center justify-center"
        >
          <img src={startBtn} 
          className="w-7 h-7" />
        </span>

        {/* other taskbar icons */}
      </div>

      {/* Start Menu */}
      {startOpen && (
        <div ref={startRef}>
          <StartMenu />
        </div>
      )}

        {/* Search */}
        <TaskbarIcon
          icon={<Search size={23} className="opacity-90" />}
          className=" w-5 h-10 inset-0 -translate-x-7 mt-2 flex items-center justify-center rounded-full dark:hover:bg-white/10 transition "
        />

        {/* Task View */}
        <div>
          <TaskbarIcon
            src={MultiTaskbtn}
            alt="Task View"
            className="w-26 h-26 -translate-x-11 translate-1 object-contain"
          />
        </div>

        {/* Browser */}
        <div
          onClick={() => {
            if (!browser?.isOpen) {
              openWindow("browser");
            } else if (browser.isMinimized) {
              restoreWindow("browser");
            } else {
              minimizeWindow("browser");
            }
          }}
        >
          <div className="-translate-x-17">
          <TaskbarIcon
            src={BrowserBtn}
            alt="Browser"
            active={Boolean(browser?.isOpen || browser?.isMinimized)}
            className="w-12 h-12 object-contain"
          />
          </div>
        </div>

        {/* CMD */}

        <div
          onClick={() => {
            if (!cmd?.isOpen) {
              openWindow("cmd");
            } else if (cmd.isMinimized) {
              restoreWindow("cmd");
            } else {
              minimizeWindow("cmd");
            }
          }}
        > 
        <div className="-translate-x-17">
          <TaskbarIcon
            src={Cmdbtn}
            alt="Command Prompt"
            active={Boolean(cmd?.isOpen || cmd?.isMinimized)}
            className="w-12 h-12  object-contain"
          />
          </div>
        </div>
      

      {/* RIGHT (System tray) */}
      <div className="flex-1 flex justify-end items-center gap-3 text-sm opacity-80 font-bold">
        {/* Hidden tray arrow */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setTrayOpen((o) => !o);
          }}
        >
          {/* arrow svg */}
          <svg
            width="19"
            height="19"
            viewBox="0 0 12 12"
            className={`transition ${trayOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M2 7l4-4 4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <HiddenTray open={trayOpen} onClose={() => setTrayOpen(false)} />
        {/* OS Toggle */}
        <button
          onClick={toggleOS}
          title={`Switch to ${os === "mac" ? "Windows 11" : "macOS"}`}
          className="flex items-center justify-center rounded os-toggle transition-all duration-100 active:scale-95 active:translate-y-[1px]"
        >
          {os === "mac" && <WindowsIcon size={20} />}
          {os === "windows" && <span className="text-xl font-semibold"></span>}
        </button>
        {/* Connectivity */}
        <div className="flex items-center">
          {status === "checking" && (
            <Loader size={18} className="animate-spin" />
          )}
          {status === "online" && <Wifi size={20} />}
          {status === "offline" && <WifiOff size={20} className="opacity-60" />}
        </div>
        <Cloud size={19} />
        {/* Volume */}
        <span
          onClick={() => setMuted((m) => !m)}
          className="flex items-center justify-center rounded-md transition"
        >
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </span>
        {/* Battery */}
        <div className="flex items-center">
          {charging ? (
            <BatteryCharging size={20} />
          ) : (
            <BatteryMediumIcon size={20} />
          )}
        </div>
        <span className="text-xs">
          {battery !== null ? `${battery}%` : "--%"}
        </span>
        {/* Time / Date */}
        <div className="flex flex-col text-xs leading-tight text-right">
          <span>{dateTime.split(" ").slice(4, 6).join(" ")}</span>
          <span className="opacity-80">
            {dateTime.split(" ").slice(0, 4).join(" ")}
          </span>
        </div>
      </div>
    </div>
  );
}
