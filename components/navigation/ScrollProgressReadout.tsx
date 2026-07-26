"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressReadout() {
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!readoutRef.current) return;

    const updateReadout = (progress: number) => {
      if (readoutRef.current) {
        const pct = Math.round(progress * 100).toString().padStart(3, "0");
        readoutRef.current.textContent = `SYS_SCROLL: ${pct}%`;
      }
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      updateReadout(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden md:block rounded-full border border-line bg-canvas-raised/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted backdrop-blur-md pointer-events-none select-none">
      <span ref={readoutRef}>SYS_SCROLL: 000%</span>
    </div>
  );
}
