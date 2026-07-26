"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MediaMaskReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    tl.to(maskRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.65,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {children}
      <div
        ref={maskRef}
        className="absolute inset-0 z-10 origin-left bg-cobalt"
      />
    </div>
  );
}
