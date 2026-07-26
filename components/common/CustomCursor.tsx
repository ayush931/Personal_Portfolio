"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isFinePointer && !isReducedMotion) {
      setIsEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled || !cursorRef.current || !ringRef.current) return;

    const xDotTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const yDotTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.08, ease: "power2.out" });
    const xRingTo = gsap.quickTo(ringRef.current, "x", { duration: 0.22, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ringRef.current, "y", { duration: 0.22, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, input, textarea, select, [data-interactive]")
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference">
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 h-2.5 w-2.5 -ml-1.25 -mt-1.25 rounded-full bg-white transition-transform duration-100 ease-out"
        style={{ transform: `scale(${isHovered ? 0.5 : 1})` }}
      />
      {/* Trailing Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 h-9 w-9 -ml-4.5 -mt-4.5 rounded-full border border-white transition-all duration-200 ease-out ${
          isHovered ? "scale-175 bg-white/20 border-white" : "scale-100 opacity-70"
        }`}
      />
    </div>
  );
}
