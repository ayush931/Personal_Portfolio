"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Cpu, Layers, Terminal, Workflow } from "lucide-react";
import { useRef } from "react";
import { MOTION } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experienceTimeline = [
  {
    role: "Full Stack Engineer",
    company: "NexoGrafix",
    period: "Current",
    details: "Engineering DocStream document processing ecosystem — architecting automated PDF → OCR → XML → EPUB pipelines, structural tree tagging, and document remediation tools using FastAPI, Celery, RabbitMQ, Redis, PostgreSQL & React.",
    highlight: "DocStream Pipeline",
    icon: Workflow,
  },
  {
    role: "Software Engineering Intern",
    company: "ShipU Logistics",
    period: "Prior",
    details: "Built real-time dispatch tracking, route optimization UI components, and API integrations for automated logistics fleet management.",
    highlight: "Dispatch Tracking",
    icon: Cpu,
  },
  {
    role: "Frontend Engineering Intern",
    company: "Shabra Softech",
    period: "Prior",
    details: "Developed accessible, componentized design systems and responsive dashboard modules across core web platforms.",
    highlight: "Design Systems",
    icon: Layers,
  },
];

const education = {
  degree: "Master of Computer Applications (MCA)",
  institution: "IIIT Ranchi / IIT Patna Affiliated Program",
  focus: "Distributed Systems, Data Structures, Modern Web Architecture & Compiler Design",
};

const stats = [
  { label: "Pipeline Throughput", value: "100k+", unit: "pages/day" },
  { label: "OCR Tag Accuracy", value: "99.4%", unit: "remediated" },
  { label: "Core Stack", value: "Python + React", unit: "production" },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-about-reveal]", { autoAlpha: 1, y: 0 });
      return;
    }

    const elements = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: MOTION.duration.enter,
          ease: MOTION.ease.chrome,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative isolate bg-canvas px-gutter py-section border-t border-line">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Kicker */}
        <div data-about-reveal className="invisible mb-12 flex items-center justify-between font-mono text-kicker uppercase tracking-kicker text-ink-muted">
          <span>02 / About & Experience</span>
          <span>Background & Engineering Philosophy</span>
        </div>

        {/* Top Grid: Bio & Focus */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 pb-16 border-b border-line">
          <div>
            <h2 data-about-reveal className="invisible font-sans text-title font-medium leading-[0.92] tracking-display text-ink mb-8">
              Full stack engineer building high-performance document pipelines & interactive web engines.
            </h2>
            <div data-about-reveal className="invisible space-y-6 text-base md:text-lg leading-relaxed text-ink-muted">
              <p>
                Currently at <strong className="text-ink font-medium">NexoGrafix</strong>, I lead core development on <strong className="text-ink font-medium">DocStream</strong> — an enterprise-grade document transformation platform that handles PDF ingestion, automated OCR, structural XML generation, and accessibility remediation.
              </p>
              <p>
                My work spans the full stack: building distributed background task processing with <strong className="text-ink font-medium">FastAPI, Celery, Redis, and RabbitMQ</strong> on the backend, to crafting responsive, accessible user interfaces in <strong className="text-ink font-medium">Next.js and React</strong> with smooth 3D & GSAP visual interactions.
              </p>
            </div>

            {/* Key Metrics */}
            <div data-about-reveal className="invisible mt-10 grid grid-cols-3 gap-4 rounded-panel border border-line bg-canvas-raised p-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-sans text-2xl md:text-3xl font-semibold text-ink tracking-tight">{stat.value}</p>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-muted mt-1">{stat.label}</p>
                  <span className="font-mono text-[0.625rem] text-cobalt">{stat.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Philosophy */}
          <div className="flex flex-col justify-between space-y-8">
            <div data-about-reveal className="invisible rounded-panel border border-line bg-canvas-raised p-8">
              <div className="flex items-center gap-2 font-mono text-kicker uppercase tracking-kicker text-cobalt mb-4">
                <Terminal size={16} />
                <span>Education & Credentials</span>
              </div>
              <h3 className="font-sans text-xl font-medium text-ink">{education.degree}</h3>
              <p className="font-mono text-xs text-ink-muted mt-1">{education.institution}</p>
              <p className="text-sm text-ink-muted mt-4 leading-relaxed">{education.focus}</p>
            </div>

            <div data-about-reveal className="invisible rounded-panel border border-line bg-canvas-raised p-8">
              <span className="font-mono text-kicker uppercase tracking-kicker text-vermilion block mb-3">Prior Internships</span>
              <p className="text-sm text-ink-muted leading-relaxed">
                Before NexoGrafix, honed frontend & backend capabilities at <strong className="text-ink">ShipU Logistics</strong> (real-time dispatch dashboard) and <strong className="text-ink">Shabra Softech</strong> (accessible component design systems).
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="pt-16">
          <h3 data-about-reveal className="invisible font-mono text-kicker uppercase tracking-kicker text-ink-muted mb-10">
            Work History & Trajectory
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {experienceTimeline.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.company}
                  data-about-reveal
                  className="invisible group relative rounded-panel border border-line bg-canvas-raised p-8 transition-colors duration-300 hover:border-cobalt"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-line text-ink transition-colors group-hover:bg-cobalt group-hover:text-canvas">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-sans text-lg font-semibold text-ink leading-none">{item.company}</h4>
                        <span className="font-mono text-[0.6875rem] text-ink-muted">{item.role}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-line bg-canvas text-ink-muted">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-ink-muted mb-6">{item.details}</p>

                  <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-muted group-hover:text-cobalt">
                    <span>{item.highlight}</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
