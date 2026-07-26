"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { MOTION, SITE } from "@/lib/constants";
import { HeroVisual } from "./HeroVisual";
import { Preloader } from "./Preloader";

const nameCharacters = Array.from("AYUSH");

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-hero-reveal]", { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.timeline({ delay: 0.15 })
      .fromTo("[data-hero-kicker]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: MOTION.duration.enter, ease: MOTION.ease.chrome })
      .fromTo("[data-hero-character]", { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: MOTION.duration.reveal, stagger: MOTION.stagger.characters, ease: MOTION.ease.chrome }, "-=0.42")
      .fromTo("[data-hero-reveal]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: MOTION.duration.enter, stagger: MOTION.stagger.items, ease: MOTION.ease.chrome }, "-=0.6");
  }, { scope: root });

  return (
    <>
      <Preloader />
      <section ref={root} className="relative isolate flex min-h-svh overflow-hidden bg-canvas px-gutter py-6 md:py-8">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:4rem_4rem]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_48%_42%,rgb(255_255_255_/_0.94),transparent_33%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px bg-line" />
        <div className="absolute inset-0 -z-10" aria-hidden><HeroVisual /></div>
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-col justify-between">
          <header className="flex items-start justify-between font-mono text-kicker uppercase tracking-kicker text-ink-muted">
            <p data-hero-kicker className="invisible">{SITE.role}</p>
            <p data-hero-kicker className="invisible text-right">Available for selective work<br />2026</p>
          </header>
          <div className="grid items-end gap-8 pb-8 pt-24 md:grid-cols-[1.1fr_0.9fr] md:pb-14 md:pt-32">
            <div>
              <p data-hero-reveal className="invisible mb-5 max-w-xs font-mono text-kicker uppercase tracking-kicker text-ink-muted md:mb-7">Systems with tactility.<br />Interfaces with intent.</p>
              <h1 aria-label="Ayush" className="font-sans text-display font-medium leading-[0.76] tracking-display text-ink">
                {nameCharacters.map((character, index) => <span key={`${character}-${index}`} className="inline-block overflow-hidden pr-[0.035em]"><span data-hero-character className="invisible inline-block will-change-transform">{character}</span></span>)}
              </h1>
            </div>
            <div className="max-w-sm md:justify-self-end">
              <p data-hero-reveal className="invisible text-pretty text-base leading-relaxed text-ink-muted md:text-lg">Full stack engineer building resilient workflows, collaborative tools, and expressive web experiences.</p>
              <a data-hero-reveal className="group mt-7 inline-flex invisible items-center gap-3 border-b border-ink pb-2 font-mono text-kicker uppercase tracking-kicker text-ink transition-colors duration-200 hover:border-cobalt hover:text-cobalt" href="#work">
                Explore selected work <ArrowDownRight aria-hidden size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
          <div data-hero-reveal className="invisible flex items-center justify-between font-mono text-kicker uppercase tracking-kicker text-ink-muted"><span>Scroll to inspect</span><span>01 / 05</span></div>
        </div>
      </section>
    </>
  );
}
