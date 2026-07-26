"use client";

import { ArrowUp, Terminal, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

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
    <footer className="relative isolate bg-canvas px-gutter py-12 border-t border-line">
      <div className="mx-auto max-w-[1600px]">
        {/* Top Footer */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center border-b border-line pb-8">
          <div>
            <span className="font-mono text-2xl font-semibold text-ink tracking-tight">{SITE.name}</span>
            <p className="font-mono text-xs text-ink-muted mt-1">{SITE.role} • Building Resilient Systems & Tactile UIs</p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-ping" />
              <span className="text-ink font-medium">IST: {time || "15:14:05"} UTC+5:30</span>
            </div>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors hover:text-cobalt"
            >
              GitHub / ayush931
            </a>
          </div>
        </div>

        {/* Easter Egg Banner if unlocked */}
        {konamiActivated && (
          <div className="my-6 rounded-xl border border-acid bg-acid/10 p-4 font-mono text-xs text-ink flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-cobalt" />
              <span>🎮 Secret Konami Mode Unlocked! Open Browser DevTools Console for additional telemetry output.</span>
            </div>
            <button onClick={() => setKonamiActivated(false)} className="text-ink-muted hover:text-ink">✕</button>
          </div>
        )}

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center font-mono text-[0.6875rem] text-ink-muted">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Ayush. All rights reserved.</span>
            <span>•</span>
            <span className="hidden sm:inline">Built with Next.js 15, R3F, GSAP & Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-ink hover:text-cobalt transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
