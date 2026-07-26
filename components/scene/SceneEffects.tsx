"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function SceneEffects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return <EffectComposer multisampling={0}><Bloom intensity={0.28} luminanceThreshold={0.76} mipmapBlur /><Vignette darkness={0.18} offset={0.24} /><Noise opacity={0.025} premultiply /></EffectComposer>;
}
