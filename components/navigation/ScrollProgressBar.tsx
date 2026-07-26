"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0 || !barRef.current) return;
      const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-line pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-cobalt origin-left transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
