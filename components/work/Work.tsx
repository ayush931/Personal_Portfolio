"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { RESUME_PROJECTS } from "@/lib/constants";
import { WorkCard } from "./WorkCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-work-card]", { autoAlpha: 1, y: 0 });
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { autoAlpha: 1, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            once: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              03 / Featured Projects &amp; Engineering
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Real-World Systems &amp; Case Studies.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
            Featured applications engineered with focus on real-time WebSockets, sub-100ms synchronization, WebRTC, and database optimization.
          </p>
        </div>

        {/* Project Cards from Resume */}
        <div className="space-y-12 md:space-y-16">
          {RESUME_PROJECTS.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
