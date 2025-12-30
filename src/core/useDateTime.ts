import { useEffect, useState } from "react";

export function useDateTime() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const date = now.toLocaleDateString("en-US", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const time = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

setDateTime(`${date.replace(/,/g, "")} ${time}`);



    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return dateTime;
}
