"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function OdometerCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reels = containerRef.current.querySelectorAll(".digit-reel");
    if (!reels || reels.length === 0) return;

    const tween = gsap.fromTo(
      reels,
      { y: "0%" },
      {
        y: (i, target) => target.getAttribute("data-target-y") || "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  const digits = value.split("");

  return (
    <span ref={containerRef} className="inline-flex items-center overflow-hidden font-mono font-bold leading-none">
      {digits.map((digit, i) => {
        const num = parseInt(digit, 10);
        if (isNaN(num)) {
          return <span key={i}>{digit}</span>;
        }
        const targetY = `-${num * 10}%`;

        return (
          <span key={i} className="relative h-[1em] overflow-hidden inline-block">
            <span className="digit-reel flex flex-col transition-transform" data-target-y={targetY}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="h-[1em] leading-none">{n}</span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
