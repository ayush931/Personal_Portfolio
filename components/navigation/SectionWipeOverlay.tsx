"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SectionWipeOverlay() {
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href?.startsWith("#") && href.length > 1) {
        const targetSection = document.querySelector(href);
        if (!targetSection) return;

        e.preventDefault();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          targetSection.scrollIntoView({ behavior: "auto" });
          return;
        }

        const tl = gsap.timeline();
        tl.to(wipeRef.current, {
          scaleY: 1,
          transformOrigin: "bottom center",
          duration: 0.25,
          ease: "power3.in",
          onComplete: () => {
            targetSection.scrollIntoView({ behavior: "auto" });
          },
        }).to(wipeRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.32,
          ease: "power3.out",
          delay: 0.05,
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div
      ref={wipeRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 origin-bottom bg-cobalt scale-y-0"
    />
  );
}
