import { create } from "zustand";

type MenuItem = {
  label: string;
};

type MenuState = {
  appName: string;
  menuItems: MenuItem[];
  setMenu: (appName: string, items: MenuItem[]) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  appName: "Finder",
  menuItems: [
    { label: "File" },
    { label: "Edit" },
    { label: "View" },
  ],
  setMenu: (appName, items) =>
    set({
      appName,
      menuItems: items,
    }),
}));
