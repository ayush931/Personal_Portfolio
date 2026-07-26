"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}
