"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Mesh, ShaderMaterial } from "three";
import { useExperienceStore } from "@/store/experience-store";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y), mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
  }
  void main() {
    float grain = noise(position * 1.35 + vec3(0.0, uTime * 0.16, 0.0));
    float wave = sin(position.y * 3.0 + uTime * 0.8) * 0.11;
    float displacement = (grain - 0.5) * 0.38 + wave;
    vec3 displacedPosition = position + normal * displacement * (1.0 + uHover * 0.3);
    vec4 modelPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vec4 modelViewPosition = viewMatrix * modelPosition;
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -modelViewPosition.xyz;
    vDisplacement = displacement;
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uCobalt; uniform vec3 uVermilion; uniform vec3 uCanvas; uniform float uHover;
  varying vec3 vNormal; varying vec3 vViewPosition; varying float vDisplacement;
  void main() {
    vec3 normal = normalize(vNormal); vec3 viewDirection = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 2.2);
    float tone = smoothstep(-0.18, 0.18, vDisplacement);
    vec3 materialColor = mix(uCobalt, uVermilion, tone);
    materialColor = mix(materialColor, uCanvas, fresnel * 0.42);
    materialColor += vec3(0.12, 0.14, 0.17) * fresnel + uHover * vec3(0.08, 0.09, 0.06);
    gl_FragColor = vec4(materialColor, 1.0);
  }
`;

export function HeroObject() {
  const mesh = useRef<Mesh>(null);
  const setHoverTarget = useExperienceStore((state) => state.setHoverTarget);
  const material = useMemo(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 }, uHover: { value: 0 },
      uCobalt: { value: new Color("#2146f3") }, uVermilion: { value: new Color("#ef4d2f") }, uCanvas: { value: new Color("#f5f3ee") },
    },
  }), []);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const hover = useExperienceStore.getState().hoverTarget === "hero-object" ? 1 : 0;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uHover.value += (hover - material.uniforms.uHover.value) * Math.min(delta * 5, 1);
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.1;
    }
  });

  return <mesh ref={mesh} material={material} onPointerEnter={() => setHoverTarget("hero-object")} onPointerLeave={() => setHoverTarget(null)} scale={1.6}><icosahedronGeometry args={[1, 6]} /></mesh>;
}
