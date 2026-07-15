'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { type StationId } from '@/lib/portfolio-data';

type TerminalSceneProps = {
  activeStation: StationId;
  onStationChange: (station: StationId) => void;
  isInteractiveMode?: boolean;
};

const stationPositions: Record<StationId, [number, number, number]> = {
  boot: [0, 0.55, 0.25],
  about: [-2.35, 0.45, 0.65],
  skills: [0, 1.45, -0.9],
  experience: [2.25, 0.55, 0.2],
  projects: [-1.55, 0.75, -1.65],
  github: [1.55, 0.82, -1.7],
  contact: [2.65, 0.8, 1.25],
};

const packetPositions = new Float32Array(220 * 3).map((_, index) => {
  const axis = index % 3;
  const seed = Math.sin(index * 91.17) * 10000;
  const normalized = seed - Math.floor(seed);
  if (axis === 0) return (normalized - 0.5) * 6;
  if (axis === 1) return normalized * 2.8 + 0.2;
  return (normalized - 0.5) * 4.5;
});

export default function TerminalScene({ activeStation, onStationChange, isInteractiveMode = false }: TerminalSceneProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new MutationObserver(() => {
      const light = document.documentElement.classList.contains('light');
      setTheme(light ? 'light' : 'dark');
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const bgColor = theme === 'light' ? '#F7FAFF' : '#061018';

  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} className="h-full w-full">
      <PerspectiveCamera makeDefault position={[4.8, 4.2, 5.8]} fov={45} />
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 7, 15]} />
      <ambientLight intensity={theme === 'light' ? 1.05 : 0.65} />
      <pointLight position={[1, 4, 2]} intensity={theme === 'light' ? 12 : 20} color={theme === 'light' ? '#2563EB' : '#1f6f78'} />
      <pointLight position={[-3, 3, 3]} intensity={theme === 'light' ? 4 : 8} color={theme === 'light' ? '#F97316' : '#d8a657'} />
      <Rig activeStation={activeStation} isInteractiveMode={isInteractiveMode} />
      <Workstation activeStation={activeStation} onStationChange={onStationChange} theme={theme} />
      
      {/* Space Constellation Particle Background (Only show stars in dark mode for premium look) */}
      {theme === 'dark' && (
        <Stars radius={100} depth={50} count={1200} factor={3.5} saturation={0.5} fade speed={1} />
      )}
      <Sparkles count={theme === 'light' ? 20 : 40} scale={6} size={1.2} speed={0.3} color={theme === 'light' ? '#2563EB' : '#22D3EE'} opacity={theme === 'light' ? 0.15 : 0.25} />

      <OrbitControls 
        enablePan={false} 
        enableRotate={isInteractiveMode}
        enableZoom={isInteractiveMode}
        minDistance={4.8} 
        maxDistance={8.5} 
        maxPolarAngle={Math.PI / 2.15} 
        minPolarAngle={Math.PI / 4.5} 
      />
    </Canvas>
  );
}

function Rig({ activeStation, isInteractiveMode = false }: { activeStation: StationId; isInteractiveMode?: boolean }) {
  useFrame((state) => {
    const { camera, pointer, size } = state;
    const pos = stationPositions[activeStation];
    
    // Calculate aspect ratio zoom factor (pull camera back on narrow portrait screens)
    const aspect = size.width / size.height;
    const zoomFactor = aspect < 1.25 ? Math.min(1.85, 1.25 / aspect) : 1;

    // Shift the camera left on desktop screens in scroll mode to push the desk target to the right side
    const isMobile = size.width < 1024;
    const xOffset = (!isInteractiveMode && !isMobile) ? -2.2 : 0;
    const yOffset = (!isInteractiveMode && !isMobile) ? 0.3 : 0;
    
    // Scale position coordinates by zoomFactor to pull camera back on narrow screens
    const desired = new THREE.Vector3(
      (pos[0] + 3.7 + xOffset) * zoomFactor,
      (pos[1] + 2.8 + yOffset) * zoomFactor,
      (pos[2] + 4.6) * zoomFactor
    );
    
    // Create local target vector inside useFrame to avoid mutate hook warnings
    const target = new THREE.Vector3(pos[0], pos[1], pos[2]);
    
    // Add subtle pointer parallax when not in interactive orbit mode
    if (!isInteractiveMode) {
      desired.x += pointer.x * 0.45;
      desired.y += pointer.y * 0.35;
      target.x += pointer.x * 0.25;
      target.y += pointer.y * 0.15;
    }
    
    camera.position.lerp(desired, 0.035);
    camera.lookAt(target);
  });
  return null;
}

// Helper component for smooth scale-in transitions of 3D animations
function FadeGroup({ active, children, targetScale = 1 }: { active: boolean; children: React.ReactNode; targetScale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) {
      const s = active ? targetScale : 0;
      ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
    }
  });
  return <group ref={ref} scale={[0, 0, 0]}>{children}</group>;
}

// 1. About Hologram: Morphing organic grid sphere
function MorphingSphere({ theme }: { theme: 'dark' | 'light' }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
      ref.current.rotation.x = clock.getElapsedTime() * 0.08;
      const s = 1.35 + Math.sin(clock.getElapsedTime() * 1.5) * 0.12;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.3, -0.2]}>
      <sphereGeometry args={[1.0, 18, 18]} />
      <meshBasicMaterial color={theme === 'light' ? '#2563EB' : '#22D3EE'} wireframe transparent opacity={theme === 'light' ? 0.22 : 0.15} />
    </mesh>
  );
}

// 2. Skills Hologram: Rotating constellation skill nodes
function SkillsConstellation({ theme }: { theme: 'dark' | 'light' }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.12;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });
  return (
    <group ref={ref} position={[0, 1.4, -0.2]}>
      {[
        [0.9, 0.6, 0.2], [-0.9, -0.4, 0.4], [0.2, 1.1, -0.6], 
        [-0.6, 0.8, 0.6], [0.7, -0.8, -0.4], [-0.4, 0.4, -0.9],
        [0, 0, 0]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[idx === 6 ? 0.22 : 0.1, 10, 10]} />
          <meshBasicMaterial color={idx === 6 ? (theme === 'light' ? '#2563EB' : '#22D3EE') : (theme === 'light' ? '#7C3AED' : '#A78BFA')} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Node connecting rings */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[0.95, 0.005, 8, 48]} />
        <meshBasicMaterial color={theme === 'light' ? '#2563EB' : '#22D3EE'} transparent opacity={theme === 'light' ? 0.22 : 0.15} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[1.1, 0.003, 8, 48]} />
        <meshBasicMaterial color={theme === 'light' ? '#7C3AED' : '#A78BFA'} transparent opacity={theme === 'light' ? 0.18 : 0.12} />
      </mesh>
    </group>
  );
}

// 3. Experience Hologram: Nested orbital chronology timeline rings
function TimelineOrbits({ theme }: { theme: 'dark' | 'light' }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring1.current) ring1.current.rotation.y = clock.getElapsedTime() * 0.18;
    if (ring2.current) ring2.current.rotation.x = clock.getElapsedTime() * -0.25;
  });
  return (
    <group position={[0, 1.25, -0.2]}>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 8, 80]} />
        <meshBasicMaterial color={theme === 'light' ? '#EA580C' : '#d8a657'} transparent opacity={theme === 'light' ? 0.3 : 0.22} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.01, 8, 80]} />
        <meshBasicMaterial color={theme === 'light' ? '#2563EB' : '#22D3EE'} transparent opacity={theme === 'light' ? 0.24 : 0.18} />
      </mesh>
    </group>
  );
}

// 4. Projects Hologram: Floating rotating wireframe geometry
function ProjectsGeometry({ theme }: { theme: 'dark' | 'light' }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = 1.3 + Math.sin(clock.getElapsedTime() * 0.8) * 0.12;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[-1.2, 0.2, -0.4]} rotation={[0.4, 0.2, 0.8]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial color={theme === 'light' ? '#2563EB' : '#22D3EE'} wireframe transparent opacity={theme === 'light' ? 0.22 : 0.15} />
      </mesh>
      <mesh position={[1.2, -0.2, 0.4]} rotation={[0.2, 0.6, 0.1]}>
        <octahedronGeometry args={[0.45]} />
        <meshBasicMaterial color={theme === 'light' ? '#7C3AED' : '#A78BFA'} wireframe transparent opacity={theme === 'light' ? 0.22 : 0.15} />
      </mesh>
      <mesh position={[0, 0.8, -0.8]} rotation={[0.8, 0.1, 0.4]}>
        <coneGeometry args={[0.35, 0.7, 4]} />
        <meshBasicMaterial color={theme === 'light' ? '#EA580C' : '#d8a657'} wireframe transparent opacity={theme === 'light' ? 0.18 : 0.12} />
      </mesh>
    </group>
  );
}

// 5. GitHub Hologram: Realtime sinus data stream grid points
function GitHubWave({ theme }: { theme: 'dark' | 'light' }) {
  const waveRef = useRef<THREE.Points>(null);
  const gridCount = 14;
  const positions = useMemo(() => {
    const pos = [];
    for (let x = 0; x < gridCount; x++) {
      for (let z = 0; z < gridCount; z++) {
        pos.push((x - gridCount / 2) * 0.22, 0, (z - gridCount / 2) * 0.22);
      }
    }
    return new Float32Array(pos);
  }, []);
  
  useFrame(({ clock }) => {
    if (waveRef.current) {
      const time = clock.getElapsedTime() * 1.5;
      const array = waveRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < gridCount * gridCount; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        array[i * 3 + 1] = Math.sin(x * 1.8 + time) * Math.cos(z * 1.8 + time) * 0.22;
      }
      waveRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={waveRef} position={[0, 1.2, -0.2]}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={theme === 'light' ? '#2563EB' : '#22D3EE'} transparent opacity={theme === 'light' ? 0.7 : 0.5} />
    </points>
  );
}

// 6. Contact Hologram: Rotating space nebula vortex
function GalaxyVortex({ theme }: { theme: 'dark' | 'light' }) {
  const ref = useRef<THREE.Points>(null);
  const localPackets = useMemo(() => packetPositions, []);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.16;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.08;
    }
  });
  return (
    <points ref={ref} position={[0, 1.25, -0.2]}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[localPackets, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={theme === 'light' ? '#7C3AED' : '#A78BFA'} transparent opacity={theme === 'light' ? 0.6 : 0.4} />
    </points>
  );
}

function HologramRings({ theme }: { theme: 'dark' | 'light' }) {
  const ringRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.4) * 0.08;
    }
  });
  return (
    <group ref={ringRef} position={[0, 0.08, 0]}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 8, 80]} />
        <meshBasicMaterial color={theme === 'light' ? '#2563EB' : '#22D3EE'} transparent opacity={0.16} />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.85}>
        <torusGeometry args={[3.2, 0.008, 8, 80]} />
        <meshBasicMaterial color={theme === 'light' ? '#7C3AED' : '#A78BFA'} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Workstation({ activeStation, onStationChange, theme }: { activeStation: StationId; onStationChange: (station: StationId) => void; theme: 'dark' | 'light' }) {
  const particles = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => packetPositions, []);

  useFrame((_, delta) => {
    if (particles.current) particles.current.rotation.y += delta * 0.08;
  });

  return (
    <group rotation={[0, -0.35, 0]}>
      {/* Table grid helper (Sci-fi hologram overlay) */}
      <gridHelper args={[6.4, 16, theme === 'light' ? '#2563EB' : '#22D3EE', theme === 'light' ? '#CFE0F6' : '#17324A']} position={[0, 0.075, 0]} />
      
      {/* Rotating Hologram Rings */}
      <HologramRings theme={theme} />

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTOR-SPECIFIC 3D HOLOGRAPHIC BACKGROUND PROJECTIONS    */}
      {/* ──────────────────────────────────────────────────────── */}
      <FadeGroup active={activeStation === 'boot'}>
        <DocStreamSignature theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'about'}>
        <MorphingSphere theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'skills'}>
        <SkillsConstellation theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'experience'}>
        <TimelineOrbits theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'projects'}>
        <ProjectsGeometry theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'github'}>
        <GitHubWave theme={theme} />
      </FadeGroup>

      <FadeGroup active={activeStation === 'contact'}>
        <GalaxyVortex theme={theme} />
      </FadeGroup>

      {/* Desk structures */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[6.6, 0.28, 4.2]} />
        <meshStandardMaterial color={theme === 'light' ? '#E4EBF5' : '#17252b'} roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.26, 0]}>
        <boxGeometry args={[6.9, 0.16, 4.5]} />
        <meshStandardMaterial color={theme === 'light' ? '#D5DFED' : '#0a1116'} roughness={0.8} />
      </mesh>
      <ClickableBox id="boot" activeStation={activeStation} onStationChange={onStationChange} position={[0, 0.38, 0.78]} scale={[1.5, 0.35, 0.8]} color={theme === 'light' ? '#2563EB' : '#1f6f78'} label="BOOT" theme={theme} />
      <Monitor id="skills" activeStation={activeStation} onStationChange={onStationChange} position={[-0.75, 1.02, -1.05]} label="SKILLS" theme={theme} />
      <Monitor id="github" activeStation={activeStation} onStationChange={onStationChange} position={[0.9, 0.94, -1.12]} label="GITHUB" theme={theme} />
      <ClickableBox id="experience" activeStation={activeStation} onStationChange={onStationChange} position={[2.25, 0.32, 0.15]} scale={[0.95, 0.95, 1.25]} color={theme === 'light' ? '#EA580C' : '#d8a657'} label="LOGS" theme={theme} />
      <ClickableBox id="about" activeStation={activeStation} onStationChange={onStationChange} position={[-2.2, 0.28, 0.45]} scale={[1.1, 0.24, 1.25]} color={theme === 'light' ? '#7C3AED' : '#6c7f88'} label="ABOUT" theme={theme} />
      <BuildShelf activeStation={activeStation} onStationChange={onStationChange} theme={theme} />
      <Radio activeStation={activeStation} onStationChange={onStationChange} theme={theme} />
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color={theme === 'light' ? '#42526B' : '#b7c6d1'} transparent opacity={theme === 'light' ? 0.3 : 0.48} />
      </points>
    </group>
  );
}

function ClickableBox({ id, activeStation, onStationChange, position, scale, color, label, theme }: TerminalSceneProps & { id: StationId; position: [number, number, number]; scale: [number, number, number]; color: string; label: string; theme: 'dark' | 'light' }) {
  const active = activeStation === id;
  return (
    <Float speed={active ? 2.5 : 1} floatIntensity={active ? 0.22 : 0.04}>
      <group position={position} onClick={(event) => { event.stopPropagation(); onStationChange(id); }}>
        <mesh scale={scale}>
          <boxGeometry />
          <meshStandardMaterial color={color} emissive={active ? color : '#000000'} emissiveIntensity={active ? 0.55 : 0.05} roughness={0.3} metalness={0.3} />
        </mesh>
        <Html center position={[0, scale[1] + 0.25, 0]} className="pointer-events-none select-none">
          <span className={`whitespace-nowrap rounded-lg border font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 transition-all duration-300 ${
            active 
              ? theme === 'light'
                ? 'border-blue-600 bg-white text-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.25)] font-bold'
                : 'border-accent-primary bg-[#030c12] text-accent-primary shadow-[0_0_8px_rgba(34,211,238,0.35)] font-bold' 
              : theme === 'light'
                ? 'border-slate-300 bg-white/90 text-slate-600'
                : 'border-border-subtle bg-bg-void/90 text-text-secondary'
          }`}>
            {active ? `▶ ${label}` : label}
          </span>
        </Html>
      </group>
    </Float>
  );
}

function Monitor({ id, activeStation, onStationChange, position, label, theme }: TerminalSceneProps & { id: StationId; position: [number, number, number]; label: string; theme: 'dark' | 'light' }) {
  const active = activeStation === id;
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onStationChange(id); }}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.35, 0.85, 0.08]} />
        <meshStandardMaterial color={theme === 'light' ? '#D5DFED' : '#07131a'} emissive={active ? (theme === 'light' ? '#3B82F6' : '#1f6f78') : (theme === 'light' ? '#CFE0F6' : '#0d1b22')} emissiveIntensity={active ? 0.75 : 0.25} />
      </mesh>
      <mesh position={[0, -0.58, 0.15]}>
        <boxGeometry args={[0.18, 0.45, 0.12]} />
        <meshStandardMaterial color={theme === 'light' ? '#BAC9DC' : '#101820'} />
      </mesh>
      <mesh position={[0, -0.83, 0.18]}>
        <boxGeometry args={[0.8, 0.08, 0.42]} />
        <meshStandardMaterial color={theme === 'light' ? '#BAC9DC' : '#101820'} />
      </mesh>
      <Html center position={[0, 0, 0.08]} className="pointer-events-none select-none">
        <div className={`w-32 rounded border transition-all duration-300 p-2 font-mono text-[7px] leading-3 ${
          theme === 'light'
            ? active
              ? 'bg-white/95 border-blue-500 text-slate-800 shadow-[0_0_12px_rgba(59,130,246,0.2)] font-bold'
              : 'bg-white/80 border-slate-300 text-slate-600'
            : active 
              ? 'bg-black/90 border-accent-primary/60 shadow-[0_0_15px_rgba(34,211,238,0.25)] text-[#b7c6d1]' 
              : 'bg-black/70 border-border-subtle/50 text-[#b7c6d1]'
        }`}>
          <div className={`flex justify-between border-b pb-0.5 mb-1 text-[8px] ${theme === 'light' ? 'border-slate-200' : 'border-border-subtle'}`}>
            <span className={`${theme === 'light' ? 'text-blue-600' : 'text-accent-primary'} font-bold`}>{label}</span>
            <span className={active ? 'text-emerald-500 animate-pulse' : 'text-text-tertiary'}>
              {active ? '● LIVE' : '○ STBY'}
            </span>
          </div>
          <div className="space-y-0.5 text-left opacity-90">
            <p className={theme === 'light' ? 'text-slate-700' : 'text-[#dce7ee]'}>LOAD: {active ? '48%' : '12%'}</p>
            <div className={`h-1 rounded-sm overflow-hidden flex mb-1 ${theme === 'light' ? 'bg-slate-100' : 'bg-bg-void'}`}>
              <div 
                className={`h-full ${active ? (theme === 'light' ? 'bg-blue-600' : 'bg-accent-primary animate-pulse') : 'bg-[#1f6f78]/55'}`} 
                style={{ width: active ? '48%' : '12%' }} 
              />
            </div>
            <p>PORT: 8080 // SSL</p>
            <p className={theme === 'light' ? 'text-blue-500' : 'text-accent-glow'}>SYS: OCR-XML-EPUB</p>
            <p className="text-text-tertiary text-[6px]">Uptime: 247:18:09</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function BuildShelf({ activeStation, onStationChange, theme }: TerminalSceneProps & { theme: 'dark' | 'light' }) {
  return (
    <group position={[-1.45, 0.55, -1.68]} onClick={(event) => { event.stopPropagation(); onStationChange('projects'); }}>
      {[-0.55, -0.18, 0.19, 0.56].map((x, index) => (
        <mesh key={x} position={[x, index % 2 ? 0.12 : 0, 0]} rotation={[0.2, index * 0.18, 0.12]}>
          <boxGeometry args={[0.32, 0.55, 0.55]} />
          <meshStandardMaterial color={activeStation === 'projects' ? (theme === 'light' ? '#EA580C' : '#d8a657') : (theme === 'light' ? '#2563EB' : '#1f6f78')} emissive={activeStation === 'projects' ? (theme === 'light' ? '#EA580C' : '#d8a657') : '#000000'} emissiveIntensity={activeStation === 'projects' ? 0.35 : 0.05} />
        </mesh>
      ))}
      <Html center position={[0, 0.65, 0]} className="pointer-events-none"><span className="station-scene-label">BUILDS</span></Html>
    </group>
  );
}

function Radio({ activeStation, onStationChange, theme }: TerminalSceneProps & { theme: 'dark' | 'light' }) {
  return (
    <group position={[2.65, 0.38, 1.22]} onClick={(event) => { event.stopPropagation(); onStationChange('contact'); }}>
      <mesh>
        <boxGeometry args={[0.75, 0.55, 0.55]} />
        <meshStandardMaterial color={theme === 'light' ? '#BAC9DC' : '#20272b'} emissive={activeStation === 'contact' ? (theme === 'light' ? '#EF4444' : '#ff5f56') : '#000000'} emissiveIntensity={activeStation === 'contact' ? 0.45 : 0.04} />
      </mesh>
      <mesh position={[0.2, 0.35, 0]} rotation={[0, 0, 0.4]}>
        <torusGeometry args={[0.18, 0.03, 8, 32]} />
        <meshStandardMaterial color={theme === 'light' ? '#EA580C' : '#d8a657'} />
      </mesh>
      <Html center position={[0, 0.55, 0]} className="pointer-events-none"><span className="station-scene-label">CONTACT</span></Html>
    </group>
  );
}

function DocStreamSignature({ theme }: { theme: 'dark' | 'light' }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = 1.35 + Math.sin(clock.elapsedTime * 2) * 0.04;
  });
  return (
    <group ref={group} position={[0, 1.35, 0]}>
      {['OCR', 'XML', 'EPUB'].map((label, index) => (
        <group key={label} position={[-0.85 + index * 0.85, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.55, 0.18, 0.08]} />
            <meshStandardMaterial color={index === 1 ? (theme === 'light' ? '#EA580C' : '#d8a657') : (theme === 'light' ? '#2563EB' : '#1f6f78')} emissive={index === 1 ? (theme === 'light' ? '#EA580C' : '#d8a657') : (theme === 'light' ? '#2563EB' : '#1f6f78')} emissiveIntensity={0.45} />
          </mesh>
          <Html center position={[0, 0.22, 0]} className="pointer-events-none">
            <span className={`font-mono text-[9px] ${theme === 'light' ? 'text-slate-800 font-bold' : 'text-white'}`}>
              {label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}
