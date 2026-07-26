/* eslint-disable react-hooks/immutability */
"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Mesh } from "three";
import { useExperienceStore } from "@/store/experience-store";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y), mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
  }
  void main() {
    float displacement = (noise(position * 1.5 + vec3(0.0, uTime * 0.25, 0.0)) - 0.5) * 0.22;
    vec3 displacedPosition = position + normal * displacement * (1.0 + uHover * 0.25);
    vec4 modelPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vec4 modelViewPosition = viewMatrix * modelPosition;
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -modelViewPosition.xyz;
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uAccentBlue;
  uniform vec3 uBgCanvas;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);
    
    // Crisp technical glass base with blue fresnel rim light
    vec3 glassBase = mix(uBgCanvas, vec3(0.96, 0.96, 0.98), 0.5);
    vec3 rimColor = uAccentBlue;
    vec3 finalColor = mix(glassBase, rimColor, fresnel * 0.85);
    finalColor += uHover * vec3(0.05, 0.1, 0.2);

    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

export function HeroObject() {
  const mesh = useRef<Mesh>(null);
  const setHoverTarget = useExperienceStore((state) => state.setHoverTarget);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uAccentBlue: { value: new Color("#2563eb") },
      uBgCanvas: { value: new Color("#f5f5f0") },
    }),
    []
  );

  useFrame((state, delta) => {
    const hover = useExperienceStore.getState().hoverTarget === "hero-object" ? 1 : 0;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uHover.value += (hover - uniforms.uHover.value) * Math.min(delta * 5, 1);

    if (mesh.current) {
      // Slow idle rotation
      mesh.current.rotation.y += delta * 0.2;
      
      // Smooth lerp cursor-follow tilt
      const targetRotX = state.pointer.y * 0.35;
      const targetRotY = state.pointer.x * 0.45;
      mesh.current.rotation.x += (targetRotX - mesh.current.rotation.x) * Math.min(delta * 4, 1);
      mesh.current.rotation.y += (targetRotY - mesh.current.rotation.y) * Math.min(delta * 4, 1);
    }
  });

  return (
    <group>
      {/* Primary Distorted Icosahedron Mesh */}
      <mesh
        ref={mesh}
        onPointerEnter={() => setHoverTarget("hero-object")}
        onPointerLeave={() => setHoverTarget(null)}
        scale={1.5}
      >
        <icosahedronGeometry args={[1.2, 3]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>

      {/* Outer Wireframe Cage overlay for precision HUD aesthetic */}
      <mesh scale={1.55} rotation={[0, 0.5, 0]}>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}
