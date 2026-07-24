import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, MeshWobbleMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { useScrollVelocity } from "@/lib/useScrollVelocity";

// Simple rotating sphere that reacts to scroll velocity
const AnimatedSphere: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const velocity = useScrollVelocity();

  useFrame(() => {
    if (!mesh.current) return;
    // Scale up a bit when scrolling fast
    const scale = 1 + Math.min(velocity / 200, 0.3);
    mesh.current.scale.set(scale, scale, scale);
    // Continuous slow rotation
    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshWobbleMaterial color="#B7A176" speed={2} factor={0.6} />
    </mesh>
  );
};

export const ThreeScrollCanvas: React.FC = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <AnimatedSphere />
      <Html center>
        <div className="text-xs text-white opacity-70">Scroll to interact</div>
      </Html>
    </Canvas>
  );
};
