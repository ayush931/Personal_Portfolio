"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

const emptySubscribe = () => () => {};

export function BlueprintGridGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isClient || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const glow = glowRef.current;
    if (!glow) return;

    const xTo = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power2.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden isolate">
      <div
        ref={glowRef}
        className="fixed -top-[250px] -left-[250px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,transparent_70%)] transition-opacity duration-300 pointer-events-none"
      />
    </div>
  );
}
