import { create } from "zustand";

export type OS = "mac" | "windows";

export const useOSStore = create<{
  os: OS;
  toggleOS: () => void;
}>((set) => ({
  os: "mac",
  toggleOS: () =>
    set((s) => ({
      os: s.os === "mac" ? "windows" : "mac",
    })),
}));
