"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

interface SmoothKineticScrollProps {
  children: React.ReactNode;
}

export const SmoothKineticScroll: React.FC<SmoothKineticScrollProps> = ({ children }) => {
  useEffect(() => {
    // High-Velocity Fast Scroll Engine (Instant flick response, zero delay)
    const lenis = new Lenis({
      duration: 0.35, // Snappy fast response (reduced from 0.6s)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential fast snap
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.8, // Enhanced velocity multiplier for fast scrolling
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full relative [will-change:transform]">
      {children}
    </div>
  );
};
