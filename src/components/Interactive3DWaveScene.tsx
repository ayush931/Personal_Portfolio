"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dy = window.scrollY - lastScroll.current;
        setVelocity(dy / dt * 16);
      }
      lastScroll.current = window.scrollY;
      lastTime.current = now;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
}

function CameraRig({ mousePos, activeSection }: { mousePos: { x: number; y: number }; activeSection: string }) {
  const { camera } = useThree();

  useFrame(() => {
    let ty = 1;
    switch (activeSection) {
      case "hero": ty = 1.2; break;
      case "experience": ty = 0.4; break;
      case "projects": ty = -0.2; break;
      case "infrastructure": ty = -0.6; break;
      case "education": ty = -0.8; break;
      case "contact": ty = -1.0; break;
    }
    camera.position.x += (mousePos.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (ty - camera.position.y) * 0.02;
    camera.lookAt(mousePos.x * 0.1, ty - 1, -2);
  });

  return null;
}

function WaveGrid({ scrollVelocity, mousePos }: { scrollVelocity: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geoRef = useRef<THREE.PlaneGeometry>(null!);

  const gridW = 28;
  const gridH = 28;
  const segments = 72;

  const originalZ = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridW, gridH, segments, segments);
    return new Float32Array(geo.attributes.position.count);
  }, []);

  useFrame((state) => {
    if (!geoRef.current || !meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = geoRef.current.attributes.position;
    const count = pos.count;
    const speed = 0.7 + Math.min(Math.abs(scrollVelocity) / 350, 1.4);

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const w1 = Math.sin(x * 0.35 + t * speed) * Math.cos(y * 0.35 + t * speed) * 0.5;
      const w2 = Math.sin(x * 0.7 - t * 1.1) * 0.18;
      const w3 = Math.cos(y * 0.5 + t * 0.6) * 0.1;

      const dx = x - mousePos.x * 8;
      const dy = y - mousePos.y * 8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.max(0, 1 - dist / 6) * 0.6 * Math.sin(dist * 1.8 - t * 3.5);

      pos.setZ(i, originalZ[i] + w1 + w2 + w3 + ripple);
    }

    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -Math.PI * 0.4, 0.04);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.5, 0.04);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mousePos.x * 0.04, 0.04);
  });

  return (
    <group position={[0, -1, -3]}>
      <mesh ref={meshRef} rotation={[-Math.PI * 0.4, 0, 0]}>
        <planeGeometry ref={geoRef} args={[gridW, gridH, segments, segments]} />
        <meshStandardMaterial
          color="#E8C9A0"
          emissive="#C9956A"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.28}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 5 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.cos(phi);
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 5;
      sz[i] = 0.3 + Math.random() * 1.2;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.004;
    ref.current.rotation.x = Math.sin(t * 0.003) * 0.05;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = sizes[i] * 0.08;
      posArr[i3 + 1] += Math.sin(t * speed + i * 0.5) * 0.0008;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#FFFFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function StarLayer2() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 8;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#E8C9A0"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function DepthGrid() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.z = -7 + Math.sin(t * 0.025) * 0.4;
  });

  return (
    <mesh ref={ref} position={[0, -4, -7]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#E8C9A0" wireframe transparent opacity={0.012} />
    </mesh>
  );
}

export function Interactive3DWaveScene({ mousePos, activeSection }: { mousePos: { x: number; y: number }; activeSection: string }) {
  const velocity = useScrollVelocity();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 1, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#050607"]} />
        <fog attach="fog" args={["#050607", 10, 28]} />
        <CameraRig mousePos={mousePos} activeSection={activeSection} />
        <ambientLight intensity={0.08} />
        <directionalLight position={[5, 8, 6]} intensity={0.4} color="#FFFFFF" />
        <WaveGrid scrollVelocity={velocity} mousePos={mousePos} />
        <Starfield />
        <StarLayer2 />
        <DepthGrid />
      </Canvas>
    </div>
  );
}

export default Interactive3DWaveScene;
