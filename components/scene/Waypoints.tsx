"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Vector3, Mesh, CatmullRomCurve3 } from "three";
import { useExperienceStore } from "@/store/experience-store";

export function Waypoints() {
  const lineRef = useRef<any>(null);
  const tracerRef = useRef<Mesh>(null);
  const nodeRefs = useRef<Mesh[]>([]);

  const activeSection = useExperienceStore((state) => state.activeSection);
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);

  // Define 3 spatial nodes representing Chemistry (left), MBA (right), Engineering (center)
  const points = useMemo(() => [
    new Vector3(-2, 1.2, 0),    // Chemistry Node
    new Vector3(2, 0, -1),      // MBA Node
    new Vector3(0, -1.8, 1),    // Engineering Node
  ], []);

  // Generate a smooth path curve connecting these nodes
  const curve = useMemo(() => new CatmullRomCurve3(points), [points]);

  // Generate line geometry vertices
  const curvePoints = useMemo(() => curve.getPoints(50), [curve]);

  useFrame((state, delta) => {
    const isAbout = activeSection === "about";
    const targetOpacity = isAbout ? 1.0 : 0.0;

    // Smoothly fade in/out nodes and lines based on active section
    if (lineRef.current) {
      lineRef.current.material.opacity += (targetOpacity - lineRef.current.material.opacity) * Math.min(delta * 4, 1);
    }
    nodeRefs.current.forEach((node) => {
      if (node && node.material) {
        (node.material as any).opacity += (targetOpacity - (node.material as any).opacity) * Math.min(delta * 4, 1);
      }
    });

    if (tracerRef.current) {
      (tracerRef.current.material as any).opacity += (targetOpacity - (tracerRef.current.material as any).opacity) * Math.min(delta * 4, 1);

      if (isAbout) {
        // Move tracer along the curve based on scroll progress
        const t = Math.min(Math.max(scrollProgress, 0), 1);
        const newPos = curve.getPointAt(t);
        tracerRef.current.position.copy(newPos);

        // Add a soft breathing pulse
        const scale = 0.15 + Math.sin(state.clock.getElapsedTime() * 8) * 0.03;
        tracerRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group>
      {/* Curved path connecting the waypoints */}
      <line ref={lineRef}>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            args={[new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4fd1c5"
          transparent
          opacity={0}
          linewidth={2}
          depthWrite={false}
        />
      </line>

      {/* Waypoint Node Spheres */}
      {points.map((pt, idx) => (
        <mesh
          key={idx}
          position={pt}
          ref={(el) => { if (el) nodeRefs.current[idx] = el; }}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={idx === 2 ? "#f2b56b" : "#4fd1c5"} // Orange accent for engineering
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Path Tracer Ball */}
      <mesh ref={tracerRef} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#4fd1c5"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
