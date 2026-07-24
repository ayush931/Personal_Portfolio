"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScrollVelocity } from "@/lib/useScrollVelocity";

interface SceneProps {
  activeSection: string;
  mousePos: { x: number; y: number };
}

// 3D Undulating Mesh Plane Backdrop
const StripeWavePlane: React.FC<{ scrollVelocity: number; mousePos: { x: number; y: number } }> = ({
  scrollVelocity,
  mousePos,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.PlaneGeometry>(null!);

  useFrame((state) => {
    if (!geometryRef.current || !meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttribute = geometryRef.current.attributes.position;
    const count = posAttribute.count;

    const speed = 0.8 + Math.min(Math.abs(scrollVelocity) / 300, 1.2);

    for (let i = 0; i < count; i++) {
      const u = posAttribute.getX(i);
      const v = posAttribute.getY(i);

      // Multi-frequency wave displacement
      const wave1 = Math.sin(u * 0.4 + time * speed) * Math.cos(v * 0.4 + time * speed) * 0.45;
      const wave2 = Math.sin(u * 0.8 - time * 1.0) * 0.15;

      // Mouse proximity wave distortion
      const dx = u - mousePos.x * 6;
      const dy = v - mousePos.y * 6;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseWave = Math.max(0, 1 - dist / 5) * 0.6 * Math.sin(dist * 3 - time * 2.5);

      posAttribute.setZ(i, wave1 + wave2 + mouseWave);
    }

    posAttribute.needsUpdate = true;
    geometryRef.current.computeVertexNormals();

    // Camera parallax rotation
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mousePos.x * 0.05, 0.05);
  });

  return (
    <group position={[0, -1, -2]}>
      {/* Primary Vibrant Wireframe Grid */}
      <mesh ref={meshRef} rotation={[-Math.PI * 0.38, 0, 0]}>
        <planeGeometry ref={geometryRef} args={[26, 26, 60, 60]} />
        <meshStandardMaterial
          color="#635BFF"
          emissive="#4B45C6"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent={true}
          opacity={0.55}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
};

// Interactive Floating 3D Object that transforms based on Active Section
const Floating3DCore: React.FC<SceneProps & { scrollVelocity: number }> = ({
  activeSection,
  mousePos,
  scrollVelocity,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Target 3D coordinates based on active section
    let targetX = 2.4;
    let targetY = 0.3;
    let targetZ = 0;
    let targetScale = 1.15;

    switch (activeSection) {
      case "hero":
        targetX = 2.4;
        targetY = 0.2;
        targetZ = 0;
        targetScale = 1.25;
        break;
      case "experience":
        targetX = -2.6;
        targetY = 0.3;
        targetZ = -0.5;
        targetScale = 1.1;
        break;
      case "projects":
        targetX = 2.6;
        targetY = -0.4;
        targetZ = -0.2;
        targetScale = 1.2;
        break;
      case "infrastructure":
        targetX = -2.4;
        targetY = -0.5;
        targetZ = 0.2;
        targetScale = 1.0;
        break;
      case "education":
        targetX = 2.2;
        targetY = 0.5;
        targetZ = -0.5;
        targetScale = 1.1;
        break;
      case "contact":
        targetX = 0;
        targetY = 0;
        targetZ = 0.5;
        targetScale = 1.35;
        break;
    }

    // Hide on small mobile screens
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      targetScale = 0;
    }

    // Smooth LERP movement & mouse parallax
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + mousePos.x * 0.7, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + mousePos.y * 0.7, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);

    const velocityScale = 1 + Math.min(Math.abs(scrollVelocity) / 350, 0.3);
    const finalScale = targetScale * velocityScale;
    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.05);

    // Continuous rotation
    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.45;
      knotRef.current.rotation.y = time * 0.55;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * -0.35;
      ringRef.current.rotation.x = time * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[2.4, 0.2, 0]}>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#635BFF"
            emissive="#3730A3"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.8}
            distort={0.4}
            speed={2.2}
          />
        </mesh>
      </Float>

      {/* Rotating Outer Wireframe Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.1, 0.025, 16, 100]} />
        <MeshWobbleMaterial color="#00D4B2" factor={0.5} speed={2} wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  );
};

// Floating Particle Starfield
const AmbientParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const purple = new THREE.Color("#635BFF");
    const cyan = new THREE.Color("#00D4B2");
    const magenta = new THREE.Color("#FF6B8B");

    const palette = [purple, cyan, magenta];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

export const Stripe3DMeshScene: React.FC<SceneProps> = ({ activeSection, mousePos }) => {
  const velocity = useScrollVelocity();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(246,249,252,0.95) 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 58 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#635BFF" />
        <pointLight position={[-10, -5, 5]} intensity={1.4} color="#00D4B2" />
        <pointLight position={[0, 10, -5]} intensity={1.0} color="#FF6B8B" />

        <StripeWavePlane scrollVelocity={velocity} mousePos={mousePos} />
        <Floating3DCore activeSection={activeSection} mousePos={mousePos} scrollVelocity={velocity} />
        <AmbientParticles />
      </Canvas>
    </div>
  );
};

export default Stripe3DMeshScene;
