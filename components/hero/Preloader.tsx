"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useExperienceStore } from "@/store/experience-store";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const assetProgress = useExperienceStore((state) => state.assetProgress);
  const isSceneReady = useExperienceStore((state) => state.isSceneReady);

  useGSAP(() => {
    if (!isSceneReady) return;
    gsap.timeline({ onComplete: () => setIsVisible(false) })
      .to("[data-preloader-progress]", { scaleX: 1, duration: 0.35, ease: "power2.out" })
      .to(root.current, { yPercent: -102, duration: 0.85, ease: "power4.inOut" }, "+=0.12");
  }, { dependencies: [isSceneReady], scope: root });

  if (!isVisible) return null;
  const progressStyle = { transform: `scaleX(${Math.min(assetProgress, 100) / 100})` };

  return (
    <div ref={root} className="fixed inset-0 z-50 grid place-items-center bg-canvas" role="status" aria-live="polite">
      <div className="w-[min(17rem,70vw)]">
        <p className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">Preparing material study / {Math.round(assetProgress).toString().padStart(3, "0")}</p>
        <div className="h-px overflow-hidden bg-line"><span data-preloader-progress className="block h-full origin-left bg-cobalt" style={progressStyle} /></div>
      </div>
    </div>
  );
}
