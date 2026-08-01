"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Vector3, Group, Mesh, CatmullRomCurve3, TorusKnotGeometry } from "three";
import { useExperienceStore } from "@/store/experience-store";

export function ProjectStage() {
  const groupRef = useRef<Group>(null);
  const activeProject = useExperienceStore((state) => state.activeProject);
  const activeSection = useExperienceStore((state) => state.activeSection);

  // References to each project's sub-group
  const aetheriaRef = useRef<Group>(null);
  const whiteboardRef = useRef<Group>(null);
  const rideSyncRef = useRef<Group>(null);
  const trackFlowRef = useRef<Group>(null);

  // Aetheria orbiting avatars data
  const avatarCount = 6;
  const avatarPositions = useMemo(() => {
    return Array.from({ length: avatarCount }).map((_, i) => {
      const angle = (i / avatarCount) * Math.PI * 2;
      return new Vector3(Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2);
    });
  }, []);

  // RideSync Route Curve
  const rideCurve = useMemo(() => {
    return new CatmullRomCurve3([
      new Vector3(-1.8, -0.5, 0),
      new Vector3(-0.6, 0.8, 0.5),
      new Vector3(0.6, -0.8, -0.5),
      new Vector3(1.8, 0.5, 0),
    ]);
  }, []);
  const rideCurvePoints = useMemo(() => rideCurve.getPoints(50), [rideCurve]);

  // TrackFlow logistics packet positions
  const packetCount = 8;
  const packets = useMemo(() => {
    return Array.from({ length: packetCount }).map((_, i) => ({
      offset: i / packetCount,
      speed: 0.15 + Math.random() * 0.1,
      yPos: (Math.random() - 0.5) * 0.8,
    }));
  }, []);

  useFrame((state, delta) => {
    const isProjects = activeSection === "projects";

    // Interpolate group visibility/scale
    if (groupRef.current) {
      const targetScale = isProjects ? 1.0 : 0.0;
      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * Math.min(delta * 4, 1);
      groupRef.current.scale.set(newScale, newScale, newScale);
      
      // Floating global rotation
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }

    // Animate Aetheria
    if (aetheriaRef.current) {
      const targetScale = activeProject === "aetheria" && isProjects ? 1.0 : 0.0;
      aetheriaRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
      aetheriaRef.current.rotation.y += delta * 0.8;
    }

    // Animate Whiteboard
    if (whiteboardRef.current) {
      const targetScale = activeProject === "whiteboard" && isProjects ? 1.0 : 0.0;
      whiteboardRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
      whiteboardRef.current.rotation.x += delta * 0.5;
      whiteboardRef.current.rotation.y += delta * 0.3;
    }

    // Animate RideSync
    if (rideSyncRef.current) {
      const targetScale = activeProject === "ridesync" && isProjects ? 1.0 : 0.0;
      rideSyncRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Move "car" tracer along path
      const tracer = rideSyncRef.current.children[1] as Mesh;
      if (tracer) {
        const t = (state.clock.getElapsedTime() * 0.25) % 1.0;
        const pos = rideCurve.getPointAt(t);
        tracer.position.copy(pos);
      }
    }

    // Animate TrackFlow
    if (trackFlowRef.current) {
      const targetScale = activeProject === "trackflow" && isProjects ? 1.0 : 0.0;
      trackFlowRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);

      // Move data packets along pipelines
      const packetMeshes = trackFlowRef.current.children as Mesh[];
      packets.forEach((p, idx) => {
        const mesh = packetMeshes[idx];
        if (mesh) {
          p.offset = (p.offset + delta * p.speed) % 1.0;
          // Lerp along pipeline lines (horizontal from -1.8 to 1.8)
          mesh.position.x = -1.8 + p.offset * 3.6;
          mesh.position.y = p.yPos;
          mesh.position.z = Math.sin(state.clock.getElapsedTime() * 2 + idx) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={0} position={[0, 0, 0.5]}>
      
      {/* 1. Aetheria Orbiting Avatars */}
      <group ref={aetheriaRef} scale={0}>
        {/* Core Crystal */}
        <mesh>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color="#4fd1c5" wireframe />
        </mesh>
        {/* Orbiting Nodes */}
        {avatarPositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshBasicMaterial color="#f2b56b" />
          </mesh>
        ))}
      </group>

      {/* 2. Whiteboard Torus Knot */}
      <group ref={whiteboardRef} scale={0}>
        <mesh>
          <torusKnotGeometry args={[0.5, 0.18, 50, 8]} />
          <meshBasicMaterial color="#4fd1c5" wireframe />
        </mesh>
      </group>

      {/* 3. RideSync GPS Route Tracer */}
      <group ref={rideSyncRef} scale={0}>
        <line>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array(rideCurvePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4fd1c5" linewidth={2} />
        </line>
        <mesh>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#f2b56b" />
        </mesh>
      </group>

      {/* 4. TrackFlow Logistics Streams */}
      <group ref={trackFlowRef} scale={0}>
        {/* Flow Lines */}
        <line>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-1.8, 0, 0, 1.8, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#232b38" opacity={0.5} transparent />
        </line>
        {/* Data Packets */}
        {packets.map((_, idx) => (
          <mesh key={idx}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#4fd1c5" : "#f2b56b"} />
          </mesh>
        ))}
      </group>

    </group>
  );
}
