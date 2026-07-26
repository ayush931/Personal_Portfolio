"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  stagger = 0.08,
  y = 24,
  delay = 0,
}: ScrollRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;

    gsap.fromTo(
      els,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
