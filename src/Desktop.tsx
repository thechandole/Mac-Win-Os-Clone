import MacDesktop from "./os/mac/MacDesktop";
import WindowsDesktop from "./os/windows/desktop/WindowsDesktop";
import { useOSStore } from "./stores/useOSStore";


export default function Desktop() {
  const { os } = useOSStore();
  return os === "mac" ? <MacDesktop /> : <WindowsDesktop />;
}
