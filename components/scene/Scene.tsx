"use client";

import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { SCENE } from "@/lib/constants";
import { useExperienceStore } from "@/store/experience-store";
import { Experience } from "./Experience";

function LoadingBridge() {
  const { active, progress } = useProgress();
  const setAssetProgress = useExperienceStore((state) => state.setAssetProgress);

  useEffect(() => { setAssetProgress(progress); }, [progress, setAssetProgress]);
  useEffect(() => { if (!active) setAssetProgress(100); }, [active, setAssetProgress]);
  return null;
}

export default function Scene({ lowPower }: { lowPower: boolean }) {
  const setSceneReady = useExperienceStore((state) => state.setSceneReady);

  return (
    <Canvas
      camera={SCENE.camera}
      dpr={lowPower ? SCENE.dpr.lowPower : SCENE.dpr.desktop}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => setSceneReady(true)}
    >
      <Suspense fallback={null}><Experience effectsEnabled={!lowPower} /></Suspense>
      <LoadingBridge />
    </Canvas>
  );
}
