"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SCENE } from "@/lib/constants";
import { useExperienceStore } from "@/store/experience-store";

const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false, loading: () => null });

export function HeroVisual() {
  const [lowPower, setLowPower] = useState<boolean | null>(null);
  const setSceneReady = useExperienceStore((state) => state.setSceneReady);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limitedCpu = navigator.hardwareConcurrency <= SCENE.performance.lowPowerCores;
    const prefersPoster = reducedMotion || limitedCpu;
    setLowPower(prefersPoster);
    if (prefersPoster) setSceneReady(true);
  }, [setSceneReady]);

  if (lowPower !== false) return <div aria-hidden className="hero-poster" />;
  return <Scene lowPower={false} />;
}
