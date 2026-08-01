"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, ShaderMaterial } from "three";
import { useExperienceStore } from "@/store/experience-store";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.2 * cos(pos.y * 2.0 + uTime * 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uGridColor;
  uniform vec3 uAccentColor;
  varying vec2 vUv;
  void main() {
    float size = 0.015;
    float gx = step(1.0 - size, fract(vUv.x * 40.0)) + step(fract(vUv.x * 40.0), size);
    float gy = step(1.0 - size, fract(vUv.y * 30.0)) + step(fract(vUv.y * 30.0), size);
    float grid = max(gx, gy);

    float dist = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.1, dist);

    vec3 finalColor = mix(uGridColor, uAccentColor, grid * 0.6);
    gl_FragColor = vec4(finalColor, grid * 0.12 * vignette);
  }
`;

export function BackgroundGrid() {
  const materialRef = useRef<ShaderMaterial>(null);
  const activeAccentColor = useExperienceStore((state) => state.activeAccentColor);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridColor: { value: new Color("#1E293B") },
      uAccentColor: { value: new Color(activeAccentColor) },
    }),
    [activeAccentColor]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uAccentColor.value.lerp(new Color(activeAccentColor), Math.min(delta * 4, 1));
    }
  });

  return (
    <mesh position={[0, 0, -6]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1, 40, 40]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
