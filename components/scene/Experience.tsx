"use client";

import { Float } from "@react-three/drei";
import { HeroObject } from "./HeroObject";
import { SceneEffects } from "./SceneEffects";

export function Experience({ effectsEnabled }: { effectsEnabled: boolean }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight color="#ffffff" intensity={2.1} position={[3, 4, 5]} />
      <pointLight color="#2146f3" intensity={15} position={[-3, 0, 2]} />
      <pointLight color="#ef4d2f" intensity={11} position={[3, -2, 1]} />
      <Float floatIntensity={0.55} rotationIntensity={0.2} speed={1.1}>
        <HeroObject />
      </Float>
      <SceneEffects enabled={effectsEnabled} />
    </>
  );
}
