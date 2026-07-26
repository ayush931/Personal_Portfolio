"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function TextReveal({ text, className = "", as: Component = "h2" }: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = Component as any;

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = containerRef.current.querySelectorAll(".reveal-word");

    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef} className={`overflow-hidden inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <span className="reveal-word inline-block translate-y-[110%] opacity-0 will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
