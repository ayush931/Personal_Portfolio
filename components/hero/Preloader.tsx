"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useExperienceStore } from "@/store/experience-store";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const isSceneReady = useExperienceStore((state) => state.isSceneReady);

  // Auto-dismiss safety timer (max 300ms) so user is never stuck waiting for 3D assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isSceneReady) return;
    gsap.timeline({ onComplete: () => setIsVisible(false) })
      .to(root.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
  }, { dependencies: [isSceneReady], scope: root });

  if (!isVisible) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-canvas transition-opacity duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(17rem,70vw)] text-center">
        <p className="font-mono text-kicker uppercase tracking-kicker text-ink-muted">Loading Ayush&apos;s Portfolio...</p>
        <div className="h-0.5 overflow-hidden bg-line mt-2">
          <span className="block h-full w-full origin-left bg-cobalt animate-pulse" />
        </div>
      </div>
    </div>
  );
}
