/* eslint-disable react-hooks/immutability */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Mesh } from "three";

const craftVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDisplacement;
  varying vec3 vNormal;
  varying float vDisplacement;

  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y), mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
  }

  void main() {
    float wave = sin(position.y * 3.0 + uTime * uSpeed) * 0.1;
    float disp = (noise(position * 1.5 + vec3(0.0, uTime * uSpeed * 0.2, 0.0)) - 0.5) * uDisplacement + wave;
    vec3 displaced = position + normal * disp;
    vNormal = normalize(normalMatrix * normal);
    vDisplacement = disp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const craftFragmentShader = /* glsl */ `
  uniform vec3 uPrimary;
  uniform vec3 uSecondary;
  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    float tone = smoothstep(-0.2, 0.2, vDisplacement);
    vec3 finalColor = mix(uPrimary, uSecondary, tone);
    float fresnel = pow(1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0), 2.0);
    finalColor += fresnel * 0.3;
    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

function LiveCraftMesh({
  speed,
  displacement,
  primaryColor,
  secondaryColor,
}: {
  speed: number;
  displacement: number;
  primaryColor: string;
  secondaryColor: string;
}) {
  const meshRef = useRef<Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uDisplacement: { value: displacement },
      uPrimary: { value: new Color(primaryColor) },
      uSecondary: { value: new Color(secondaryColor) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Update uniforms when props change
  uniforms.uSpeed.value = speed;
  uniforms.uDisplacement.value = displacement;
  uniforms.uPrimary.value.set(primaryColor);
  uniforms.uSecondary.value.set(secondaryColor);

  useFrame((state, delta) => {
    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    uniforms.uTime.value += delta;
    const idleBreathing = isReducedMotion ? 0 : Math.sin(uniforms.uTime.value * 0.8) * 0.06;

    uniforms.uDisplacement.value = displacement + idleBreathing;

    if (meshRef.current) {
      const rotationMultiplier = isReducedMotion ? 0 : 1;
      meshRef.current.rotation.y += delta * 0.3 * speed * rotationMultiplier;
      meshRef.current.rotation.x = Math.sin(uniforms.uTime.value * 0.4) * 0.15 * rotationMultiplier;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.45}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        vertexShader={craftVertexShader}
        fragmentShader={craftFragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function CraftShaderCanvas({
  speed,
  displacement,
  primaryColor,
  secondaryColor,
}: {
  speed: number;
  displacement: number;
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-lg bg-black/40 border border-line/40 flex items-center justify-center">
      <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: true }} camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <LiveCraftMesh
          speed={speed}
          displacement={displacement}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </Canvas>
    </div>
  );
}
