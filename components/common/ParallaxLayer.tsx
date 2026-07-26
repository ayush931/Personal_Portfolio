"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ParallaxLayer({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const yAmount = speed * 100;

    const tween = gsap.to(ref.current, {
      yPercent: yAmount,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
