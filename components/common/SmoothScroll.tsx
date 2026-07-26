"use client";

import React, { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Standard lag smoothing to prevent stutter on frame spikes
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
