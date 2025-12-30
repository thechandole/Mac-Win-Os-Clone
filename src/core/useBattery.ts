import { useEffect,useState } from "react";

interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener(type: 'levelchange' | 'chargingchange', listener: EventListenerOrEventListenerObject): void;
  removeEventListener(type: 'levelchange' | 'chargingchange', listener: EventListenerOrEventListenerObject): void;
}

export function useBattery() {
  const [battery, setBattery] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if (!("getBattery" in navigator)) return;

// Ye Battery Status API think karta hai

// Promise return karta hai

// Real system battery ka data deta hai (jab supported ho)

    const nav = navigator as Navigator & { getBattery: () => Promise<BatteryManager> };
    nav.getBattery().then((bat: BatteryManager) => {
      const update = () => {
        setBattery(Math.round(bat.level * 100));
        setCharging(bat.charging);
      };

      update();
      bat.addEventListener("levelchange", update);
      bat.addEventListener("chargingchange", update);

    //   its return true and false

      return () => {
        bat.removeEventListener("levelchange", update);
        bat.removeEventListener("chargingchange", update);
      };
    });
  }, []);

  return { battery, charging };
}
