"use client";

import { ArrowUp, Terminal, Phone, MapPin, Download, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";
import { Magnetic } from "@/components/common/Magnetic";

export function Footer() {
  const [time, setTime] = useState<string>("");
  const [konamiActivated, setKonamiActivated] = useState<boolean>(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → b a)
  useEffect(() => {
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pointer = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[pointer]) {
        pointer++;
        if (pointer === konamiCode.length) {
          setKonamiActivated(true);
          console.log("%c 🚀 KONAMI CODE UNLOCKED! Welcome to Ayush's Dev Console Sandbox. ", "background: #2146f3; color: #fff; font-size: 14px; padding: 8px; border-radius: 4px;");
          pointer = 0;
        }
      } else {
        pointer = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate bg-canvas blueprint-grid px-gutter pt-16 pb-12 border-t border-line w-full">
      <div className="mx-auto max-w-[1600px] w-full space-y-12">
        {/* Main Footer Grid */}
        <div className="grid gap-12 lg:grid-cols-4 pb-12 border-b border-line">
          {/* Column 1: Brand & Slogan */}
          <div className="lg:col-span-1 space-y-4">
            <span className="font-mono text-3xl font-semibold text-ink tracking-tight block">{SITE.name}</span>
            <p className="font-mono text-xs text-cobalt font-semibold">{SITE.role}</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              Engineering high-concurrency microservices, real-time WebSockets, sub-100ms sync engines, and production full-stack systems.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-3.5 py-1.5 font-mono text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-ping" />
              <span className="text-ink font-medium">Live IST: {time || "15:38:00"} (UTC+5:30)</span>
            </div>
          </div>

          {/* Column 2: Quick Sitemap */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block mb-4">
              Navigation Sitemap
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-ink-muted">
              <li>
                <a href="#hero" className="hover:text-cobalt transition-colors">01 / Overview &amp; Bio</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cobalt transition-colors">02 / Experience &amp; Education</a>
              </li>
              <li>
                <a href="#work" className="hover:text-cobalt transition-colors">03 / Featured Case Studies</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-cobalt transition-colors">04 / GLSL Shader Laboratory</a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-cobalt transition-colors">05 / Technical Writings &amp; Articles</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cobalt transition-colors">06 / Core Competencies</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cobalt transition-colors">07 / Direct Inquiries</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Information */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block mb-4">
              Direct Contact
            </span>
            <div className="space-y-3 text-ink-muted">
              <div>
                <span className="text-ink-muted block text-[0.6875rem] uppercase">Location</span>
                <span className="text-ink font-semibold flex items-center gap-1.5 mt-0.5"><MapPin size={13} className="text-cobalt" /> {SITE.location}</span>
              </div>
              <div>
                <span className="text-ink-muted block text-[0.6875rem] uppercase">Direct Phone</span>
                <a href={`tel:${SITE.phone}`} className="text-ink font-semibold hover:text-cobalt transition-colors flex items-center gap-1.5 mt-0.5">
                  <Phone size={13} className="text-cobalt" /> {SITE.phone}
                </a>
              </div>
              <div>
                <span className="text-ink-muted block text-[0.6875rem] uppercase">GitHub Profile</span>
                <a href={SITE.github} target="_blank" rel="noreferrer" className="text-cobalt font-semibold hover:underline inline-flex items-center gap-1 mt-0.5">
                  github.com/ayush931 <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Resume Download & Status */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block mb-2">
              Official Documentation
            </span>
            <p className="text-xs text-ink-muted leading-relaxed font-mono">
              Complete resume extracted directly from professional experience. Available for immediate evaluation.
            </p>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                download="Ayush_Full_Stack_Developer_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-line bg-canvas-raised px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink hover:border-cobalt hover:text-cobalt transition-colors font-semibold shadow-sm"
              >
                <Download size={14} />
                <span>Download Resume PDF</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Easter Egg Banner if unlocked */}
        {konamiActivated && (
          <div className="rounded-xl border border-acid bg-acid/10 p-4 font-mono text-xs text-ink flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-cobalt" />
              <span>🎮 Secret Konami Mode Unlocked! Open Browser DevTools Console for additional telemetry output.</span>
            </div>
            <button onClick={() => setKonamiActivated(false)} className="text-ink-muted hover:text-ink">✕</button>
          </div>
        )}

        {/* Bottom Bar - Copyright & Top Button */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center font-mono text-[0.6875rem] text-ink-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-ink">© {new Date().getFullYear()} Ayush Kumar. All rights reserved.</span>
            <span>•</span>
            <span>Built with Next.js 16, R3F, GSAP &amp; Tailwind CSS</span>
          </div>

          <Magnetic>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-4 py-2 text-ink hover:-translate-y-1 hover:border-cobalt hover:text-cobalt transition-all duration-200 self-start sm:self-auto cursor-pointer font-semibold shadow-sm"
            >
              <span>Back to top</span>
              <ArrowUp size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
