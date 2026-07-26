"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

const emptySubscribe = () => () => {};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isClient || !window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });
    const followerXTo = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const followerYTo = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      followerXTo(e.clientX);
      followerYTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, input, textarea, select, [data-interactive]") ||
        target?.tagName === "A" ||
        target?.tagName === "BUTTON"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 h-2 w-2 -ml-1 -mt-1 rounded-full bg-cobalt transition-transform duration-150 ease-out ${
          isHovered ? "scale-150 bg-cobalt" : "scale-100"
        }`}
      />
      {/* Lagging Ring Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 h-8 w-8 -ml-4 -mt-4 rounded-full border border-cobalt/40 transition-all duration-200 ease-out ${
          isHovered ? "scale-150 border-cobalt bg-cobalt/10" : "scale-100 opacity-60"
        }`}
      />
    </div>
  );
}
