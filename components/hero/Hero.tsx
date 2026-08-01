"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Download, Terminal, ScrollText, Code2, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { MOTION } from "@/lib/constants";
import { Preloader } from "./Preloader";
import { Magnetic } from "@/components/common/Magnetic";
import { LiveStatusLine } from "@/components/navigation/LiveStatusLine";
import { TerminalSection } from "@/components/terminal/TerminalSection";

const firstNameCharacters = Array.from("AYUSH");
const lastNameCharacters = Array.from("KUMAR");

const keyHighlights = [
  { label: "Pipeline Turnaround", value: "-45%", sub: "FastAPI microservices" },
  { label: "Query Optimization", value: "+25%", sub: "PERN database speedup" },
  { label: "Monorepo Code Reuse", value: "+40%", sub: "Turborepo architecture" },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-hero-reveal]", { autoAlpha: 1, y: 0 });
      gsap.set("[data-hero-character]", { autoAlpha: 1, yPercent: 0 });
      return;
    }

    gsap.timeline({ delay: 0.1 })
      .fromTo("[data-hero-status]", { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .fromTo("[data-hero-character]", { autoAlpha: 0, yPercent: 100 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.04, ease: MOTION.ease.chrome }, "-=0.2")
      .fromTo("[data-hero-reveal]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: MOTION.ease.chrome }, "-=0.3");
  }, { scope: root });

  return (
    <>
      <Preloader />
      <div ref={root} className="relative isolate flex min-h-svh w-full flex-col justify-between overflow-y-auto sm:overflow-hidden bg-canvas blueprint-grid px-gutter py-4 md:py-6">
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between h-full pt-16 md:pt-20">

          {/* Top System Status Bar */}
          <div data-hero-status className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.6875rem] sm:text-xs uppercase tracking-wider text-ink-muted border-b border-line pb-3.5 mb-2">
            {/* Left: Availability Status Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-600 shadow-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="hidden sm:inline">AVAILABLE FOR FULL-TIME &amp; REMOTE ROLES</span>
                <span className="sm:hidden">AVAILABLE FOR REMOTE ROLES</span>
              </div>

              <span className="rounded-full border border-line bg-canvas-raised px-2.5 py-1 text-ink-muted font-medium text-[0.65rem] sm:text-xs">
                PATNA, BIHAR, INDIA
              </span>
            </div>

            {/* Right: Live Telemetry & System Version */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <LiveStatusLine showScroll />
              <div className="font-mono text-xs text-cobalt font-medium items-center gap-1.5 hidden md:flex">
                <Terminal size={13} />
                <span>SYS_VER: 2026.4</span>
              </div>
            </div>
          </div>

          {/* Hero Content: 2-Column Split (Left Info + Right Interactive Terminal) */}
          <div className="my-auto flex-1 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center py-6 sm:py-0">
            
            {/* Left Column: Fixed Headline & Value Proposition */}
            <div className="space-y-5 sm:space-y-6">
              
              {/* Category Kicker */}
              <div data-hero-reveal className="inline-flex items-center gap-2 rounded-full border border-cobalt/30 bg-cobalt/5 px-3.5 py-1.5 font-mono text-xs text-cobalt font-semibold tracking-wider">
                <Code2 size={14} className="text-cobalt shrink-0" />
                <span>FULL-STACK SOFTWARE ENGINEER (PERN / MERN)</span>
              </div>

              {/* Headline (Ayush Kumar) */}
              <h1 aria-label="AYUSH KUMAR" className="font-mono text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.92] text-ink uppercase tracking-tight">
                <span className="inline-block whitespace-nowrap mr-3 sm:mr-4">
                  {firstNameCharacters.map((char, idx) => (
                    <span key={`first-${char}-${idx}`} className="inline-block overflow-hidden">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                </span>
                <span className="inline-block whitespace-nowrap">
                  {lastNameCharacters.map((char, idx) => (
                    <span key={`last-${char}-${idx}`} className="inline-block overflow-hidden">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                </span>
                <span className="inline-flex items-end ml-1.5 text-cobalt select-none">
                  <span className="text-[0.45em] animate-bounce mr-[0.05em]" style={{ animationDelay: '0ms', animationDuration: '0.7s' }}>.</span>
                  <span className="text-[0.45em] animate-bounce mr-[0.05em]" style={{ animationDelay: '150ms', animationDuration: '0.7s' }}>.</span>
                  <span className="text-[0.45em] animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.7s' }}>.</span>
                </span>
              </h1>

              {/* Subtitle / Description */}
              <p data-hero-reveal className="max-w-xl font-mono text-xs sm:text-sm md:text-base text-ink-muted leading-relaxed">
                Specializing in event-driven microservices, high-throughput document processing pipelines (FastAPI, React), and sub-100ms real-time WebSockets synchronization.
              </p>

              {/* Key Highlights Metrics */}
              <div data-hero-reveal className="grid grid-cols-3 gap-3 max-w-xl pt-1">
                {keyHighlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-line bg-canvas-raised p-3 text-center transition-colors hover:border-cobalt/50">
                    <div className="font-sans text-base sm:text-xl font-bold text-cobalt">{h.value}</div>
                    <div className="font-mono text-[0.625rem] uppercase tracking-wider text-ink font-semibold mt-0.5">{h.label}</div>
                    <div className="font-mono text-[0.55rem] text-ink-muted mt-0.5 truncate">{h.sub}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div data-hero-reveal className="flex flex-wrap items-center gap-3 pt-2">
                <Magnetic>
                  <a
                    className="group inline-flex items-center gap-2.5 rounded-md bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-canvas transition-all duration-200 hover:bg-cobalt hover:shadow-md hover:scale-[1.02] shadow-sm font-bold"
                    href="#work"
                  >
                    <span>VIEW PROJECTS</span>
                    <ArrowRight size={15} className="transition-all duration-200 group-hover:translate-x-1" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    className="group inline-flex items-center gap-2.5 rounded-md border border-line bg-canvas-raised px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-all duration-200 hover:border-cobalt hover:text-cobalt shadow-sm"
                    href="/resume.pdf"
                    target="_blank"
                    download="Ayush_Full_Stack_Developer_Resume.pdf"
                  >
                    <Download size={13} />
                    <span>RESUME PDF ↓</span>
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-4 py-3.5 font-mono text-xs uppercase tracking-wider text-cobalt transition-all duration-200 hover:border-cobalt font-semibold"
                    href="#contact"
                  >
                    <span>GET IN TOUCH</span>
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Interactive Terminal Window */}
            <div data-hero-reveal className="w-full flex items-center justify-center">
              <TerminalSection isInline={true} />
            </div>

          </div>

          {/* Scroll Cue + Bottom Bar */}
          <div data-hero-reveal className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted border-t border-line pt-4 pb-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-cobalt" />
                PORTFOLIO — LOADED
              </span>
              <span className="text-ink-muted/30 hidden sm:inline">/</span>
              <span className="text-ink-muted/60 hidden sm:flex items-center gap-1.5">
                <ScrollText size={12} />
                SCROLL TO EXPLORE
              </span>
            </div>
            <span className="font-semibold text-ink">01 / 07</span>
          </div>

        </div>
      </div>
    </>
  );
}
