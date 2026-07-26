"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useExperienceStore } from "@/store/experience-store";

const LOADING_STEPS = [
  "initializing modules...",
  "mounting 3D scene...",
  "connecting services...",
  "ready.",
];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const isSceneReady = useExperienceStore((state) => state.isSceneReady);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 100);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 10);
    const hide = setTimeout(() => setIsVisible(false), 560);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, []);

  useGSAP(() => {
    if (!isSceneReady) return;
    setProgress(100);
    gsap.timeline({ onComplete: () => setIsVisible(false) })
      .to(root.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
  }, { dependencies: [isSceneReady], scope: root });

  if (!isVisible) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(22rem,80vw)] space-y-4 font-mono">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-muted">
          <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
          <span>BOOT_SEQUENCE</span>
          <span className="text-ink-muted/40">v2026.4</span>
        </div>

        <div className="space-y-1 border border-line rounded-panel bg-canvas-raised p-4">
          {LOADING_STEPS.map((s, i) => (
            <div
              key={s}
              className={`font-mono text-xs transition-opacity duration-300 ${
                i < step ? "text-ink-muted" : i === step ? "text-ink" : "text-ink-muted/20"
              }`}
            >
              <span className="text-cobalt">{i < step ? "✓" : "»"}</span> {s}
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wider">
            <span className="text-ink-muted">LOADING PORTFOLIO</span>
            <span className="text-cobalt font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 overflow-hidden bg-line rounded-full">
            <span
              className="block h-full bg-cobalt rounded-full transition-all duration-[500ms] ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
