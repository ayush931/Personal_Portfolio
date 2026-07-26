"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CheckCircle2, Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { EXPERIENCES, RESUME_SUMMARY } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const keyImpactMetrics = [
  { label: "Turnaround Reduction", value: "45%", desc: "FastAPI microservices turnaround" },
  { label: "Formatting Effort Cut", value: "60%", desc: "TypeScript & Office.js Word add-in" },
  { label: "Query Speed Boost", value: "25%", desc: "PERN database optimization" },
  { label: "Code Reuse Boost", value: "40%", desc: "Turborepo monorepo migration" },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-about-reveal]", { autoAlpha: 1, y: 0 });
      return;
    }

    const elements = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
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

    // GSAP Metric Number Count-up Animation
    const numElements = gsap.utils.toArray<HTMLElement>("[data-metric-num]");
    numElements.forEach((numEl) => {
      const targetVal = parseFloat(numEl.dataset.metricNum || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numEl,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          numEl.textContent = `${Math.round(obj.val)}%`;
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Kicker */}
        <div data-about-reveal className="mb-8 flex items-center justify-between font-mono text-kicker uppercase tracking-kicker text-ink-muted border-b border-line pb-4">
          <span>02 / Professional Experience</span>
          <span>Verified Career History</span>
        </div>

        {/* Top Header: Section Title & Roles Count Badge */}
        <div data-about-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-line pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt font-semibold mb-2">
              <Briefcase size={16} />
              <span>Work History &amp; Track Record</span>
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Professional Experience.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-4 py-2 font-mono text-xs text-ink-muted shrink-0">
            <Sparkles size={14} className="text-cobalt" />
            <span>3 Verified Roles • Patna, India</span>
          </div>
        </div>

        {/* 1. PROFESSIONAL EXPERIENCE CARDS (PLACED AT THE TOP) */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {EXPERIENCES.map((item, idx) => (
            <div
              key={idx}
              data-about-reveal
              className="group flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-6 md:p-8 transition-all duration-300 hover:border-cobalt hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Top Metadata */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-wider text-cobalt font-semibold mb-1">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                    <h3 className="font-sans text-xl font-bold text-ink leading-snug group-hover:text-cobalt transition-colors">
                      {item.company}
                    </h3>
                    <p className="font-mono text-xs text-ink-muted font-medium mt-1 flex items-center gap-1">
                      <MapPin size={12} className="text-cobalt" />
                      <span>{item.role} • {item.location}</span>
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.65rem] px-2.5 py-1 rounded-full border border-line bg-canvas text-ink font-semibold">
                    {"type" in item ? (item as { type: string }).type : "Full-Time"}
                  </span>
                </div>

                {/* Highlight Metric Banner */}
                <div className="my-4 p-3 rounded-lg border border-cobalt/20 bg-cobalt/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-ink-muted text-[0.7rem] uppercase font-semibold">Key Impact</span>
                  <span className="font-bold text-cobalt">{item.metric}</span>
                </div>

                {/* Bullet points strictly from resume */}
                <ul className="space-y-3 my-6 border-t border-line/60 pt-4">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed">
                      <CheckCircle2 size={14} className="text-cobalt shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Skills Tags & Bottom Banner */}
              <div>
                {"skills" in item && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line/60 mb-4">
                    {((item as { skills: readonly string[] }).skills).map((skill, sIdx) => (
                      <span key={sIdx} className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-canvas border border-line text-ink-muted font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-muted group-hover:text-cobalt">
                  <span>{item.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. SUMMARY & IMPACT METRICS BANNER (AT THE BOTTOM OF SECTION) */}
        <div data-about-reveal className="rounded-panel border border-line bg-canvas-raised p-6 md:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-line pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-cobalt font-semibold block mb-1">
                Executive Overview
              </span>
              <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-4xl">
                {RESUME_SUMMARY}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {keyImpactMetrics.map((stat) => (
              <div key={stat.label} className="rounded-panel border border-line bg-canvas p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-cobalt/60">
                <p className="font-mono text-2xl md:text-3xl font-bold text-cobalt tracking-tight">
                  <span data-metric-num={parseInt(stat.value)}>{stat.value}</span>
                </p>
                <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink font-semibold mt-1">{stat.label}</p>
                <p className="text-xs text-ink-muted mt-1 leading-snug">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
