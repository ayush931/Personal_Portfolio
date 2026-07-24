"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CameraRig({ mouseRef, scrollRef }: { mouseRef: React.RefObject<{ x: number; y: number }>; scrollRef: React.RefObject<number> }) {
    const { camera } = useThree();
    const target = useRef(new THREE.Vector3(0, 1.8, 8));

    useFrame(() => {
        const t = target.current;
        const cam = camera as THREE.PerspectiveCamera;
        const mouse = mouseRef.current;
        const scroll = scrollRef.current;

        const ty = 1.8 - scroll * 2.0;
        const tz = 8 - scroll * 1.5;

        t.x = mouse.x * 0.6;
        t.y = ty;
        t.z = tz;

        cam.position.lerp(t, 0.025);
        cam.lookAt(mouse.x * 0.1, ty - 1.2, -4);
    });

    return null;
}

function WaveGrid({ mouseRef, scrollRef }: { mouseRef: React.RefObject<{ x: number; y: number }>; scrollRef: React.RefObject<number> }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const geoRef = useRef<THREE.PlaneGeometry>(null!);

    const gridW = 22;
    const gridH = 22;
    const segments = 36;

    const originalZ = useMemo(() => {
        const geo = new THREE.PlaneGeometry(gridW, gridH, segments, segments);
        const z = new Float32Array(geo.attributes.position.count);
        for (let i = 0; i < z.length; i++) {
            z[i] = geo.attributes.position.getZ(i);
        }
        return z;
    }, []);

    useFrame((state) => {
        if (!geoRef.current || !meshRef.current) return;
        const t = state.clock.getElapsedTime();
        const pos = geoRef.current.attributes.position;
        const count = pos.count;
        const mouse = mouseRef.current;
        const scroll = scrollRef.current;

        for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);

            const w1 = Math.sin(x * 0.35 + t * 0.7) * Math.cos(y * 0.35 + t * 0.7) * 0.45;
            const w2 = Math.sin(x * 0.7 - t * 1.1) * 0.15;
            const w3 = Math.cos(y * 0.5 + t * 0.6) * 0.08;

            const dx = x - mouse.x * 6;
            const dy = y - mouse.y * 6;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ripple = Math.max(0, 1 - dist / 5) * 0.5 * Math.sin(dist * 1.8 - t * 3.5);

            pos.setZ(i, originalZ[i] + w1 + w2 + w3 + ripple);
        }

        pos.needsUpdate = true;

        const scaleY = THREE.MathUtils.lerp(1.0, 1.6, scroll);
        const posY = THREE.MathUtils.lerp(-2.5, -0.6, scroll);
        const rotX = THREE.MathUtils.lerp(-Math.PI * 0.45, -Math.PI * 0.35, scroll);
        const opacity = THREE.MathUtils.lerp(0.18, 0.32, scroll);

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotX, 0.03);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, posY, 0.03);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scaleY, 0.03);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mouse.x * 0.03, 0.03);

        const mat = meshRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, opacity, 0.03);
    });

    return (
        <group position={[0, 0, -3]}>
            <mesh ref={meshRef} rotation={[-Math.PI * 0.45, 0, 0]}>
                <planeGeometry ref={geoRef} args={[gridW, gridH, segments, segments]} />
                <meshBasicMaterial
                    color="#C9956A"
                    wireframe
                    transparent
                    opacity={0.18}
                />
            </mesh>
        </group>
    );
}

function TwinklingStars({ scrollRef }: { scrollRef: React.RefObject<number> }) {
    const ref = useRef<THREE.Points>(null);
    const count = 500;

    const { positions, baseSizes, twinkleSpeeds, twinkleOffsets } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        const sp = new Float32Array(count);
        const of = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = 5 + Math.random() * 22;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i3 + 1] = radius * Math.cos(phi) + 4;
            pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 5;
            sz[i] = 0.02 + Math.random() * 0.06;
            sp[i] = 0.5 + Math.random() * 2.5;
            of[i] = Math.random() * Math.PI * 2;
        }
        return { positions: pos, baseSizes: sz, twinkleSpeeds: sp, twinkleOffsets: of };
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        const scroll = scrollRef.current;

        ref.current.rotation.y = t * 0.003;

        const starOpacity = THREE.MathUtils.lerp(0.7, 0.25, scroll);
        const mat = ref.current.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, starOpacity, 0.03);

        const sizeAttr = ref.current.geometry.getAttribute("size");
        if (sizeAttr) {
            const arr = sizeAttr.array as Float32Array;
            for (let i = 0; i < count; i++) {
                arr[i] = baseSizes[i] * (0.5 + 0.5 * Math.sin(t * twinkleSpeeds[i] + twinkleOffsets[i]));
            }
            sizeAttr.needsUpdate = true;
        }
    });

    const sizes = useMemo(() => {
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) s[i] = baseSizes[i];
        return s;
    }, []);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#FFFFFF"
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
}

function GoldenDust({ scrollRef }: { scrollRef: React.RefObject<number> }) {
    const ref = useRef<THREE.Points>(null);
    const count = 150;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30 + 5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 8;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const scroll = scrollRef.current;
        ref.current.rotation.y = clock.getElapsedTime() * 0.0015;

        const dustOpacity = THREE.MathUtils.lerp(0.2, 0.08, scroll);
        const mat = ref.current.material as THREE.PointsMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, dustOpacity, 0.03);
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.035}
                color="#E8C9A0"
                transparent
                opacity={0.2}
                sizeAttenuation
            />
        </points>
    );
}

export function Interactive3DWaveScene({ mousePos, activeSection }: { mousePos: { x: number; y: number }; activeSection: string }) {
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef(0);

    useEffect(() => {
        mouseRef.current = mousePos;
    }, [mousePos]);

    useEffect(() => {
        const handleScroll = () => {
            scrollRef.current = Math.min(window.scrollY / 3200, 1);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas
                camera={{ position: [0, 1.8, 8], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <CameraRig mouseRef={mouseRef} scrollRef={scrollRef} />
                <ambientLight intensity={0.03} />
                <WaveGrid mouseRef={mouseRef} scrollRef={scrollRef} />
                <TwinklingStars scrollRef={scrollRef} />
                <GoldenDust scrollRef={scrollRef} />
            </Canvas>
        </div>
    );
}

export default Interactive3DWaveScene;
