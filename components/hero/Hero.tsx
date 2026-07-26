"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { useRef } from "react";
import { MOTION } from "@/lib/constants";
import { Preloader } from "./Preloader";

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
      <div ref={root} className="relative isolate flex h-svh min-h-svh w-full flex-col justify-between overflow-hidden bg-canvas blueprint-grid px-gutter py-4 md:py-6">
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between h-full pt-16 md:pt-20">
          
          {/* Status Line */}
          <header data-hero-status className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider text-ink-muted border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
              <span className="font-semibold text-ink">AVAILABLE FOR FULL-TIME &amp; SENIOR ROLES</span>
              <span>·</span>
              <span>PATNA, BIHAR, INDIA</span>
            </div>
            <div className="font-mono text-xs text-cobalt font-medium flex items-center gap-1.5">
              <Terminal size={13} />
              <span>SYS_VER: 2026.4</span>
            </div>
          </header>

          {/* Hero Main Content - Vertically Centered */}
          <div className="my-auto flex-1 flex flex-col justify-center max-w-4xl py-4">
            <div className="space-y-6">
              <div data-hero-reveal className="font-mono text-xs md:text-sm text-cobalt font-semibold tracking-wider">
                &gt; full-stack engineer · systems &amp; pipelines
              </div>

              {/* Headline with Blinking Cursor ▌ */}
              <h1 aria-label="AYUSH KUMAR" className="font-mono text-display font-bold leading-[0.85] tracking-display text-ink uppercase">
                <span className="inline-block">
                  {firstNameCharacters.map((char, idx) => (
                    <span key={`first-${char}-${idx}`} className="inline-block overflow-hidden pr-[0.02em]">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                  <span className="inline-block px-1"> </span>
                  {lastNameCharacters.map((char, idx) => (
                    <span key={`last-${char}-${idx}`} className="inline-block overflow-hidden pr-[0.02em]">
                      <span data-hero-character className="inline-block will-change-transform">{char}</span>
                    </span>
                  ))}
                  <span className="inline-block text-cobalt animate-cursor-blink ml-1">▌</span>
                </span>
              </h1>

              {/* One-Line Real Differentiator */}
              <p data-hero-reveal className="max-w-2xl font-mono text-sm md:text-base text-ink-muted leading-relaxed">
                &quot;I build real-time multiplayer systems, document processing pipelines, and the tools in between.&quot;
              </p>

              {/* Two CTA Buttons */}
              <div data-hero-reveal className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="group inline-flex items-center gap-2.5 rounded-md bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-canvas transition-colors duration-200 hover:bg-cobalt shadow-sm"
                  href="#work"
                >
                  <span>VIEW WORK</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <a
                  className="group inline-flex items-center gap-2.5 rounded-md border border-line bg-canvas-raised px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-200 hover:border-cobalt hover:text-cobalt shadow-sm"
                  href="/resume.pdf"
                  target="_blank"
                  download="Ayush_Full_Stack_Developer_Resume.pdf"
                >
                  <Download size={14} />
                  <span>DOWNLOAD RESUME ↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div data-hero-reveal className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted border-t border-line pt-4 pb-2">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-cobalt" />
              PORTFOLIO — LOADED
            </span>
            <span className="font-semibold text-ink">01 / 06</span>
          </div>

        </div>
      </div>
    </>
  );
}
