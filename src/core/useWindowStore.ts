import { create } from "zustand";

/* ---------------- TYPES ---------------- */

export type AppWindow = {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  zIndex?:number;


};



/* ---------------- DEFAULT WINDOWS ---------------- */

const defaultWindows: AppWindow[] = [
  { id: "finder", title: "Finder", isOpen: false, zIndex:1 },
  // future:
  { id: "terminal", title: "Terminal", isOpen: false, zIndex:1 },
  { id: "safari", title: "Safari", isOpen: false, zIndex:1 },
  { id: "contact", title: "Contacts", isOpen: false, zIndex: 1 },
  { id: "pdf-preview", title: "Resume.pdf", isOpen: false, zIndex: 1 },


  // Windows 11
  { id: "browser", title: "Browser", isOpen: false, zIndex: 1 },
  { id: "cmd", title: "Command Prompt", isOpen: false, zIndex: 1 },
  { id: "multitask", title: "Task View", isOpen: false, zIndex: 1 },



];

/* ---------------- STORE ---------------- */


type WindowStore = {
  windows: AppWindow[];
  focusedId: string | null;
  dockPositions: Record<string, { x: number; y: number }>;


  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  setDockPosition: (id: string, pos: { x: number; y: number }) => void;
  resetSafari: (id: string) => void;


  
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: defaultWindows,
  focusedId : null,

  // for pdf preview

  

  openWindow: (id) =>
  set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex ?? 0));

    return {
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: maxZ + 1,
            }
          : w
      ),
      focusedId: id,
    };
  }),


  closeWindow: (id) =>
  set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id
        ? { ...w, isOpen: false, isMinimized: false }
        : w
    ),
    focusedId: null,
  })),


  minimizeWindow: (id) =>
  set((state) => ({
    windows: state.windows.map((w) =>
      w.id === id
        ? { ...w, isMinimized: true }
        : w
    ),
    focusedId: null,
  })),



  // minimize se vapas lana ke liye

  restoreWindow: (id) =>
  set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex ?? 0));

    return {
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: maxZ + 1,
            }
          : w
      ),
      focusedId: id,
    };
  }),

//window me hame dock ki exact location ka reference milega

  dockPositions: {},

setDockPosition: (id, pos) =>
  set((state) => ({
    dockPositions: {
      ...state.dockPositions,
      [id]: pos,
    },
  })),



    focusWindow: (id) =>
  set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex ?? 0));

    return {
      focusedId: id,
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, zIndex: maxZ + 1 }
          : w
      ),
    };
  }),

  resetSafari: () =>
  set((state) => ({
    windows: state.windows.map((w) =>
      w.id === "safari"
        ? {
            ...w,
            // 👇 Safari-specific UI state reset
            meta: {
              ...w,
              // future plan ...w.meta //Pending for update
              // {
              //   id: "safari",
              //   isOpen: true,
              //   meta: {
              //     tabs: [],
              //     activeTab: 0
              //   }
              // }

              iframeUrl: null,
              currentUrl: "",
            },
          }
        : w
    ),
  })),



}));
