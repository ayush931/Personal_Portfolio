"use client";

import { useEffect, useState } from "react";

export function LiveStatusLine() {
  const [timeStr, setTimeStr] = useState("");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now);
      const parts = formatted.split(":");
      setTimeStr(`${parts[0]}:${parts[1]}`);
      setSeconds(parts[2]);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
      <div className="flex items-center gap-1">
        <span>IST {timeStr}:</span>
        <span key={seconds} className="animate-[fadePulse_0.3s_ease-out] text-ink font-semibold">
          {seconds}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
        </span>
        <span>WebGL Active</span>
      </div>
    </div>
  );
}
