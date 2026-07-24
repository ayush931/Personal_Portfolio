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

// Interactive 3D Particles Field
const ParticleStarfield: React.FC<{ scrollVelocity: number; mousePos: { x: number; y: number } }> = ({
  scrollVelocity,
  mousePos,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color("#D8C7A1");
    const green = new THREE.Color("#B7A176");
    const purple = new THREE.Color("#8B7A58");
    const white = new THREE.Color("#FAFAFA");

    const colorPalette = [cyan, green, purple, white];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    // Rotate particle universe gently
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    // React to mouse
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mousePos.x * 0.5, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mousePos.y * 0.5, 0.05);

    // Stretch particles slightly during scroll velocity spike
    const targetScale = 1 + Math.min(Math.abs(scrollVelocity) / 500, 0.4);
    pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Morphing 3D Geometry Core
const DynamicCoreGeometry: React.FC<SceneProps & { scrollVelocity: number }> = ({
  activeSection,
  mousePos,
  scrollVelocity,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRing1 = useRef<THREE.Mesh>(null!);
  const outerRing2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Target positions & rotations based on active section
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1;

    switch (activeSection) {
      case "hero":
        targetX = 2.2;
        targetY = 0;
        targetZ = 0;
        targetScale = 1.3;
        break;
      case "experience":
        targetX = -2.5;
        targetY = 0.5;
        targetZ = -1;
        targetScale = 1.1;
        break;
      case "projects":
        targetX = 2.8;
        targetY = -0.5;
        targetZ = -0.5;
        targetScale = 1.25;
        break;
      case "infrastructure":
        targetX = -2.2;
        targetY = -0.8;
        targetZ = 0.5;
        targetScale = 1.0;
        break;
      case "education":
        targetX = 2.0;
        targetY = 0.8;
        targetZ = -1;
        targetScale = 1.1;
        break;
      case "contact":
        targetX = 0;
        targetY = 0;
        targetZ = 1;
        targetScale = 1.4;
        break;
      default:
        targetX = 0;
        targetY = 0;
        targetZ = 0;
    }

    // Adjust target position on smaller screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      targetX = 0;
      targetY = activeSection === "hero" ? -1.5 : 0;
      targetScale = targetScale * 0.75;
    }

    // Smooth position interpolation (LERP)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + mousePos.x * 0.8, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + mousePos.y * 0.8, 0.04);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);

    // Smooth scale interpolation reacting to scroll velocity
    const velocityFactor = 1 + Math.min(Math.abs(scrollVelocity) / 300, 0.3);
    const finalScale = targetScale * velocityFactor;
    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.06);

    // Continuous 3D Rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
    }
    if (outerRing1.current) {
      outerRing1.current.rotation.x = time * -0.5;
      outerRing1.current.rotation.z = time * 0.2;
    }
    if (outerRing2.current) {
      outerRing2.current.rotation.y = time * 0.6;
      outerRing2.current.rotation.x = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Floating Mesh with Distort & Wobble Material */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.4, 4]} />
          <MeshDistortMaterial
            color="#D8C7A1"
            emissive="#B7A176"
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.8}
            distort={0.45}
            speed={2.5}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Inner Metallic Wireframe Core */}
      <mesh>
        <icosahedronGeometry args={[1.45, 2]} />
        <meshBasicMaterial color="#B7A176" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Dual Outer Rotating Holographic Wireframe Rings */}
      <mesh ref={outerRing1}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <MeshWobbleMaterial color="#D8C7A1" factor={0.4} speed={2} wireframe transparent opacity={0.28} />
      </mesh>

      <mesh ref={outerRing2}>
        <torusGeometry args={[2.6, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8B7A58" wireframe transparent opacity={0.24} />
      </mesh>
    </group>
  );
};

export const Interactive3DScene: React.FC<SceneProps> = ({ activeSection, mousePos }) => {
  const velocity = useScrollVelocity();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "radial-gradient(circle at 50% 50%, #121216 0%, #09090b 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        {/* Lights setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.1} color="#D8C7A1" />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#B7A176" />
        <pointLight position={[0, 10, 5]} intensity={0.4} color="#8B7A58" />

        {/* Dynamic 3D Objects */}
        <ParticleStarfield scrollVelocity={velocity} mousePos={mousePos} />
        <DynamicCoreGeometry activeSection={activeSection} mousePos={mousePos} scrollVelocity={velocity} />
      </Canvas>
    </div>
  );
};
