"use client";

import { useEffect, useRef, useState } from "react";

export function LiveStatusLine({ showScroll = false }: { showScroll?: boolean }) {
  const [timeStr, setTimeStr] = useState("");
  const [seconds, setSeconds] = useState("00");
  const scrollRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    if (!showScroll || !scrollRef.current) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0 || !scrollRef.current) return;
      const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      const pct = Math.round(progress * 100).toString().padStart(3, "0");
      scrollRef.current.textContent = `SYS_SCROLL: ${pct}%`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScroll]);

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

      {showScroll && (
        <>
          <span className="text-ink-muted/30">|</span>
          <span ref={scrollRef} className="text-ink font-semibold">SYS_SCROLL: 000%</span>
        </>
      )}
    </div>
  );
}
