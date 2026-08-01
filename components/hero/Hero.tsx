"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Download, Terminal, ScrollText } from "lucide-react";
import { useRef } from "react";
import { MOTION } from "@/lib/constants";
import { Preloader } from "./Preloader";
import { Magnetic } from "@/components/common/Magnetic";
import { LiveStatusLine } from "@/components/navigation/LiveStatusLine";

const firstNameCharacters = Array.from("AYUSH");
const lastNameCharacters = Array.from("KUMAR");

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

          {/* Consolidated Status Bar */}
          <header data-hero-status className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.6875rem] sm:text-xs uppercase tracking-wider text-ink-muted border-b border-line pb-3 sm:pb-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
              <span className="font-semibold text-ink">AVAILABLE FOR FULL-TIME &amp; SENIOR ROLES</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-ink-muted">PATNA, BIHAR, INDIA</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <LiveStatusLine showScroll />
              <div className="font-mono text-xs text-cobalt font-medium items-center gap-1.5 hidden sm:flex">
                <Terminal size={13} />
                <span>SYS_VER: 2026.4</span>
              </div>
            </div>
          </header>

          {/* Hero Main Content - Vertically Centered */}
          <div className="my-auto flex-1 flex flex-col justify-center max-w-4xl py-6 sm:py-0">
            <div className="space-y-4 sm:space-y-6">
              {/* Tagline */}
              <div data-hero-reveal className="font-mono text-xs md:text-sm text-cobalt font-semibold tracking-wider">
                &gt; full-stack engineer · systems &amp; pipelines
              </div>

              {/* Headline */}
              <h1 aria-label="AYUSH KUMAR" className="font-mono text-display font-bold leading-[0.85] text-ink uppercase max-w-full">
                <span className="inline-flex flex-wrap items-end">
                  {firstNameCharacters.map((char, idx) => (
                    <span key={`first-${char}-${idx}`} className="inline-block overflow-hidden pr-[0.04em]">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                  <span className="inline-block w-[0.4ch]" />
                  {lastNameCharacters.map((char, idx) => (
                    <span key={`last-${char}-${idx}`} className="inline-block overflow-hidden pr-[0.04em]">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                  <span className="inline-flex items-end ml-1 text-cobalt">
                    <span className="text-[0.45em] animate-bounce mr-[0.05em]" style={{ animationDelay: '0ms', animationDuration: '0.7s' }}>.</span>
                    <span className="text-[0.45em] animate-bounce mr-[0.05em]" style={{ animationDelay: '150ms', animationDuration: '0.7s' }}>.</span>
                    <span className="text-[0.45em] animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.7s' }}>.</span>
                  </span>
                </span>
              </h1>

              {/* One-Line Differentiator */}
              <p data-hero-reveal className="max-w-2xl font-mono text-xs sm:text-sm md:text-base text-ink-muted leading-relaxed">
                &ldquo;I build real-time multiplayer systems, document processing pipelines,<br className="hidden sm:inline" />
                and the tools in between.&rdquo;
              </p>

              {/* Two CTA Buttons — primary visually dominant */}
              <div data-hero-reveal className="flex flex-wrap items-center gap-4 pt-2">
                <Magnetic>
                  <a
                    className="group inline-flex items-center gap-2.5 rounded-md bg-ink px-7 py-4 font-mono text-xs uppercase tracking-wider text-canvas transition-all duration-200 hover:bg-cobalt hover:shadow-md hover:scale-[1.02] shadow-sm font-bold"
                    href="#work"
                  >
                    <span>VIEW WORK</span>
                    <ArrowRight size={16} className="transition-all duration-200 group-hover:translate-x-1" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    className="group inline-flex items-center gap-2.5 rounded-md border border-line bg-canvas-raised px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-all duration-200 hover:border-cobalt hover:text-cobalt shadow-sm"
                    href="/resume.pdf"
                    target="_blank"
                    download="Ayush_Full_Stack_Developer_Resume.pdf"
                  >
                    <Download size={13} />
                    <span>DOWNLOAD RESUME ↓</span>
                  </a>
                </Magnetic>
              </div>
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
            <span className="font-semibold text-ink">01 / 06</span>
          </div>

        </div>
      </div>
    </>
  );
}
