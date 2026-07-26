"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { RESUME_EDUCATION } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationIcons = [GraduationCap, Award, BookOpen];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-edu-reveal]", { autoAlpha: 1, y: 0 });
      return;
    }

    const elements = gsap.utils.toArray<HTMLElement>("[data-edu-reveal]");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div
          data-edu-reveal
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8"
        >
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted flex items-center gap-2">
              <span>04 / Education &amp; Academic Credentials</span>
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Formal Education &amp; Higher Qualifications.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-4 py-2 font-mono text-xs text-ink-muted">
            <Sparkles size={14} className="text-cobalt" />
            <span>3 Degrees • Verifiable Credentials</span>
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {RESUME_EDUCATION.map((edu, idx) => {
            const IconComponent = educationIcons[idx % educationIcons.length];

            return (
              <div
                key={idx}
                data-edu-reveal
                className="group flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-6 md:p-8 transition-all duration-300 hover:border-cobalt hover:shadow-md"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl border border-line bg-canvas text-cobalt group-hover:scale-105 transition-transform">
                      <IconComponent size={22} />
                    </div>
                    <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-cobalt/40 bg-cobalt/10 text-cobalt font-semibold">
                      {edu.score}
                    </span>
                  </div>

                  {/* Degree Title & Institution */}
                  <h3 className="font-sans text-xl font-bold text-ink leading-tight mb-2 group-hover:text-cobalt transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-cobalt mb-4">
                    {edu.institution}
                  </p>

                  {/* Period & Location Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted border-y border-line/60 py-3 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-cobalt shrink-0" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-cobalt shrink-0" />
                      {edu.location}
                    </span>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed mb-4 font-mono">
                    {edu.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 border-t border-line/40 pt-4">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink font-semibold mb-2">
                      Key Academic Highlights
                    </p>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-ink-muted leading-relaxed">
                          <CheckCircle2 size={13} className="text-cobalt shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Badge */}
                <div className="mt-8 border-t border-line pt-4 font-mono text-[0.6875rem] text-ink-muted flex items-center justify-between group-hover:text-cobalt">
                  <span>Status</span>
                  <span className="font-semibold text-ink">{edu.period.includes("Present") ? "Currently Pursuing" : "Completed"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
