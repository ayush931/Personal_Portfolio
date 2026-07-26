"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SCENE } from "@/lib/constants";
import { useExperienceStore } from "@/store/experience-store";

const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false, loading: () => null });

export function HeroVisual() {
  const [lowPower] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limitedCpu = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= SCENE.performance.lowPowerCores;
    return Boolean(reducedMotion || limitedCpu);
  });

  const setSceneReady = useExperienceStore((state) => state.setSceneReady);

  useEffect(() => {
    if (lowPower) {
      setSceneReady(true);
    }
  }, [lowPower, setSceneReady]);

  if (lowPower) return <div aria-hidden className="hero-poster" />;
  return <Scene lowPower={false} />;
}
