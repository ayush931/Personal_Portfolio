"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
        const y = parseFloat(el.getAttribute("data-reveal-y") || "24");
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
