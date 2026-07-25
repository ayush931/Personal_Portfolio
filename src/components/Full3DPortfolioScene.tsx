"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

function CameraRig({ progress, mousePos }: { progress: number; mousePos: { x: number; y: number } }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.8, 8));

  useFrame(() => {
    const t = target.current;
    t.x = mousePos.x * 2;
    t.y = 0.6 - progress * 3 + mousePos.y * 0.35;
    t.z = 8 - progress * 3;
    camera.position.lerp(t, 0.018);
    camera.lookAt(mousePos.x * 0.15, -progress * 2, -2);
  });

  return null;
}

function CentralOrb({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.04) * 0.1;
      group.current.position.y = Math.sin(t * 0.06) * 0.3 - scrollProgress * 0.8;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.15;
      innerRef.current.rotation.z = t * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.06;
      outerRef.current.rotation.x = t * 0.04;
    }
    if (glowRef.current) {
      const scale = 2.2 + Math.sin(t * 0.8) * 0.15;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={[0, 0.5, -4]}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshBasicMaterial color="#D5AA84" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={outerRef} scale={[1.6, 1.6, 1.6]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#A36B4F" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#D5AA84" transparent opacity={0.03} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#D5AA84" distance={10} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#A36B4F" distance={6} />
    </group>
  );
}

function OrbitalRings() {
  const rings = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!rings.current) return;
    const t = clock.getElapsedTime();
    rings.current.rotation.y = t * 0.03;
    rings.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.05 + i * 0.015) * (i % 2 === 0 ? 1 : -1);
      child.rotation.x = Math.sin(t * 0.02 + i) * 0.15;
    });
  });

  const ringData = useMemo(() => [
    { radius: 2.8, color: "#D5AA84", opacity: 0.06, tilt: 0.3 },
    { radius: 3.4, color: "#A36B4F", opacity: 0.04, tilt: -0.5 },
    { radius: 4.0, color: "#D5AA84", opacity: 0.03, tilt: 0.8 },
    { radius: 4.6, color: "#8B7355", opacity: 0.025, tilt: -0.2 },
  ], []);

  return (
    <group ref={rings} position={[0, 0.5, -4]}>
      {ringData.map((r, i) => (
        <mesh key={i} rotation={[r.tilt, 0, 0]}>
          <torusGeometry args={[r.radius, 0.003, 16, 200]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function Constellation() {
  const group = useRef<THREE.Group>(null);
  const nodeCount = 60;
  const lineRef = useRef<THREE.LineSegments>(null);

  const { nodes, nodeSpeeds } = useMemo(() => {
    const n = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 10 - 3,
    }));
    const sp = Array.from({ length: nodeCount }, () => 0.3 + Math.random() * 0.7);
    return { nodes: n, nodeSpeeds: sp };
  }, []);

  const lineGeo = useMemo(() => {
    const maxLines = 80;
    const positions = new Float32Array(maxLines * 6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.012;
    }

    const posArr = lineGeo.attributes.position.array as Float32Array;
    let lineIdx = 0;
    const maxLines = 80;
    const connectDist = 4.5;

    for (let i = 0; i < nodeCount && lineIdx < maxLines; i++) {
      const a = nodes[i];
      const ax = a.x + Math.sin(t * nodeSpeeds[i] * 0.2 + i) * 0.3;
      const ay = a.y + Math.cos(t * nodeSpeeds[i] * 0.15 + i * 0.7) * 0.2;
      const az = a.z;

      for (let j = i + 1; j < nodeCount && lineIdx < maxLines; j++) {
        const b = nodes[j];
        const bx = b.x + Math.sin(t * nodeSpeeds[j] * 0.2 + j) * 0.3;
        const by = b.y + Math.cos(t * nodeSpeeds[j] * 0.15 + j * 0.7) * 0.2;
        const bz = b.z;

        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectDist) {
          posArr[lineIdx * 6] = ax;
          posArr[lineIdx * 6 + 1] = ay;
          posArr[lineIdx * 6 + 2] = az;
          posArr[lineIdx * 6 + 3] = bx;
          posArr[lineIdx * 6 + 4] = by;
          posArr[lineIdx * 6 + 5] = bz;
          lineIdx++;
        }
      }
    }
    lineGeo.setDrawRange(0, lineIdx * 2);
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color="#D5AA84" transparent opacity={0.06} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#D5AA84" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingShards() {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 5,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.3,
      speedX: 0.1 + Math.random() * 0.3,
      speedY: 0.15 + Math.random() * 0.25,
      rotSpeed: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const s = shards[i];
      if (!s) return;
      child.position.y = s.position[1] + Math.sin(t * s.speedY + i * 0.8) * 0.5;
      child.position.x = s.position[0] + Math.cos(t * s.speedX + i * 0.4) * 0.3;
      child.rotation.x = t * s.rotSpeed * 0.2;
      child.rotation.y = t * s.rotSpeed * 0.35;
    });
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#D5AA84" wireframe transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function DepthGrid() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.z = -6 + Math.sin(t * 0.03) * 0.5;
    ref.current.rotation.x = -Math.PI * 0.5 + Math.sin(t * 0.02) * 0.02;
  });

  return (
    <mesh ref={ref} position={[0, -3.5, -6]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[50, 50, 60, 60]} />
      <meshBasicMaterial color="#D5AA84" wireframe transparent opacity={0.015} />
    </mesh>
  );
}

function AmbientDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.008;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.1 + i * 0.2) * 0.0005;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#D5AA84" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function Full3DPortfolioScene({ mousePos }: { mousePos: { x: number; y: number } }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = Math.min(scrollY / 3200, 1);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0.6, 8], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#050607"]} />
        <fog attach="fog" args={["#050607", 8, 18]} />
        <CameraRig progress={progress} mousePos={mousePos} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 6, 5]} intensity={0.8} color="#F0EEE8" />
        <CentralOrb scrollProgress={progress} />
        <OrbitalRings />
        <Constellation />
        <FloatingShards />
        <DepthGrid />
        <AmbientDust />
      </Canvas>
    </div>
  );
}

export default Full3DPortfolioScene;
