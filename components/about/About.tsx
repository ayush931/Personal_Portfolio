"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GraduationCap, CheckCircle2, MapPin } from "lucide-react";
import { useRef } from "react";
import { EXPERIENCES, RESUME_EDUCATION, RESUME_SUMMARY } from "@/lib/constants";

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
        { autoAlpha: 1, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative isolate bg-canvas px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Kicker */}
        <div data-about-reveal className="mb-12 flex items-center justify-between font-mono text-kicker uppercase tracking-kicker text-ink-muted border-b border-line pb-4">
          <span>02 / Resume Experience & Summary</span>
          <span>Verified Work History</span>
        </div>

        {/* Top Grid: Bio & Impact Metrics */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 pb-16 border-b border-line">
          <div>
            <h2 data-about-reveal className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink mb-6">
              Full-Stack Software Engineer specializing in scalable microservices & web applications.
            </h2>
            <div data-about-reveal className="rounded-panel border border-line bg-canvas-raised p-6 md:p-8 space-y-4 text-base leading-relaxed text-ink">
              <p className="font-mono text-xs uppercase tracking-wider text-cobalt font-semibold">Professional Summary</p>
              <p className="text-ink-muted leading-relaxed">
                {RESUME_SUMMARY}
              </p>
            </div>

            {/* Key Metrics */}
            <div data-about-reveal className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {keyImpactMetrics.map((stat) => (
                <div key={stat.label} className="rounded-panel border border-line bg-canvas-raised p-5">
                  <p className="font-sans text-2xl md:text-3xl font-semibold text-cobalt tracking-tight">{stat.value}</p>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink font-medium mt-1">{stat.label}</p>
                  <p className="text-xs text-ink-muted mt-1 leading-snug">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Credentials */}
          <div data-about-reveal className="flex flex-col justify-between">
            <div className="rounded-panel border border-line bg-canvas-raised p-8 space-y-6">
              <div className="flex items-center gap-2 font-mono text-kicker uppercase tracking-kicker text-cobalt border-b border-line pb-4">
                <GraduationCap size={18} />
                <span>Education & Academic Credentials</span>
              </div>

              <div className="space-y-6">
                {RESUME_EDUCATION.map((edu, idx) => (
                  <div key={idx} className="border-b border-line/60 pb-5 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-sans text-base font-semibold text-ink leading-snug">{edu.degree}</h3>
                        <p className="font-mono text-xs text-cobalt mt-1 font-medium">{edu.institution}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs px-2.5 py-1 rounded-full border border-line bg-canvas text-ink-muted">
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 font-mono text-xs text-ink-muted">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {edu.location}</span>
                      <span className="font-semibold text-ink">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="pt-16">
          <div data-about-reveal className="flex items-center justify-between mb-10 border-b border-line pb-4">
            <h3 className="font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              Professional Experience
            </h3>
            <span className="font-mono text-xs text-cobalt font-semibold">3 Positions • Patna, India</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {EXPERIENCES.map((item, idx) => (
              <div
                key={idx}
                data-about-reveal
                className="group flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-8 transition-colors duration-300 hover:border-cobalt"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-cobalt font-semibold">{item.period}</span>
                      <h4 className="font-sans text-xl font-bold text-ink leading-snug mt-1">{item.company}</h4>
                      <p className="font-mono text-xs text-ink-muted mt-0.5">{item.role} • {item.location}</p>
                    </div>
                  </div>

                  {/* Bullet points strictly from resume */}
                  <ul className="space-y-3 my-6 border-t border-line/60 pt-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink-muted leading-relaxed">
                        <CheckCircle2 size={14} className="text-cobalt shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-muted group-hover:text-cobalt">
                  <span>{item.highlight}</span>
                  <span className="font-semibold text-ink">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
