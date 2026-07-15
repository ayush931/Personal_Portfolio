'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useCursor } from '@/components/cursor/useCursor';

export type JourneyChapter = {
  id: string;
  nav: string;
  kicker: string;
  title: string;
  subtitle: string;
  body: string;
  stats?: string[];
  bullets?: string[];
  chips?: string[];
};

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'hero',
    nav: 'Home',
    kicker: 'Launch Sequence',
    title: 'Ayush Kumar',
    subtitle: 'Full Stack Engineer building production systems that scale.',
    body: 'A 3D career map through the systems, products, and teams I have shipped with TypeScript, React, FastAPI, React Native, and distributed backend architecture.',
    stats: ['3 companies shipped', '1,000+ users in production', '6 production systems built'],
    chips: ['Open to Work', 'Patna, India', 'Full Stack'],
  },
  {
    id: 'about',
    nav: 'About',
    kicker: 'Origin Point',
    title: 'Systems-first product engineer',
    subtitle: 'I connect product UI with dependable backend workflows.',
    body: 'My work sits at the intersection of frontend polish, backend reliability, automation, and developer velocity. I care about products that feel fast and systems that remain understandable under pressure.',
    bullets: ['Microservices, event-driven jobs, and real-time apps', 'Document automation, logistics workflows, collaborative products', 'Clean interfaces backed by measurable performance wins'],
    chips: ['React', 'Next.js', 'Node.js', 'FastAPI'],
  },
  {
    id: 'skills',
    nav: 'Skills',
    kicker: 'Technical Arsenal',
    title: 'Stack constellation',
    subtitle: 'A practical toolkit for shipping full systems.',
    body: 'I work across the full lifecycle: typed frontend, mobile, APIs, workers, databases, queues, containers, deployment, and observability-minded debugging.',
    bullets: ['Frontend: Next.js, React, React Native, Tailwind, Redux Toolkit', 'Backend: Node.js, FastAPI, Express, WebSockets, JWT, OAuth, RBAC', 'Data/Ops: PostgreSQL, MongoDB, Redis, Prisma, RabbitMQ, Docker, AWS, Turborepo'],
    chips: ['TypeScript', 'PostgreSQL', 'Docker', 'RabbitMQ', 'Redis'],
  },
  {
    id: 'experience',
    nav: 'Experience',
    kicker: 'Career Timeline',
    title: 'From apps to production pipelines',
    subtitle: 'Each node marks a real-world system or career milestone.',
    body: 'At NexoGrafix I am building document automation and conversion systems. Before that, I shipped logistics and mobile/web platforms at ShipU Logistics and Shabra Softech, while continuing MCA studies through IIIT Ranchi and IIT Patna.',
    bullets: ['NexoGrafix: Office.js add-in and DocStream OCR to XML/EPUB microservices', 'ShipU: logistics platform, RBAC, PostgreSQL optimization, Docker/AWS workflows', 'Shabra: React Native and Next.js apps serving 1,000+ monthly active users'],
    chips: ['NexoGrafix', 'ShipU', 'Shabra', 'MCA'],
  },
  {
    id: 'projects',
    nav: 'Projects',
    kicker: 'Featured Systems',
    title: 'Built work, not just demos',
    subtitle: 'Projects modeled as orbiting satellites around the career path.',
    body: 'Aetheria, RideSync, DocStream, and an Excalidraw-style collaborative whiteboard show my range across real-time networking, mobile logistics UX, document pipelines, and collaborative canvases.',
    bullets: ['Aetheria: Phaser, Socket.io, WebRTC, Prisma, PostgreSQL', 'RideSync: React Native, Expo, Clerk, Neon PostgreSQL, Zustand', 'DocStream: FastAPI, Celery, RabbitMQ, Redis, PostgreSQL, React, Docker'],
    chips: ['Aetheria', 'RideSync', 'DocStream', 'Whiteboard'],
  },
  {
    id: 'github',
    nav: 'Activity',
    kicker: 'Public Signal',
    title: 'Open-source trail',
    subtitle: 'Reusable templates, experiments, and product systems live on GitHub.',
    body: 'Explore the repositories behind the visual map: multiplayer experiments, ride booking flows, collaborative tooling, backend patterns, and full-stack product builds.',
    chips: ['github.com/ayush931', 'Open Source', 'Templates', 'Systems'],
  },
  {
    id: 'contact',
    nav: 'Contact',
    kicker: 'Next Mission',
    title: 'Let us build the next system',
    subtitle: 'Available for full-time engineering opportunities and serious product work.',
    body: 'If your team needs someone who can move across frontend, backend, mobile, integrations, and production debugging, I am ready to talk.',
    stats: ['Email: ayushkumar9315983@gmail.com', 'GitHub: ayush931', 'LinkedIn: ayush-kumar-94310522a'],
    chips: ['Hire Me', 'Resume Ready', 'Open to Work'],
  },
];

type ThreeCareerSceneProps = {
  activeIndex: number;
  scrollProgress: number;
};

type ScenePalette = {
  bg: number;
  fog: number;
  primary: number;
  secondary: number;
  tertiary: number;
  surface: string;
  text: string;
  star: number;
  grid: number;
};

const palettes: Record<'dark' | 'light', ScenePalette> = {
  dark: {
    bg: 0x030711,
    fog: 0x06111f,
    primary: 0x22d3ee,
    secondary: 0xa78bfa,
    tertiary: 0xfb7185,
    surface: 'rgba(3, 7, 18, 0.76)',
    text: '#F8FAFC',
    star: 0xbae6fd,
    grid: 0x38bdf8,
  },
  light: {
    bg: 0xf8fbff,
    fog: 0xdbeafe,
    primary: 0x2563eb,
    secondary: 0xf97316,
    tertiary: 0x14b8a6,
    surface: 'rgba(255, 255, 255, 0.78)',
    text: '#0F172A',
    star: 0x1d4ed8,
    grid: 0x60a5fa,
  },
};

function getTheme() {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function createLabelTexture(text: string, palette: ScenePalette) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext('2d');

  if (!context) return new THREE.CanvasTexture(canvas);

  const accent = `#${palette.primary.toString(16).padStart(6, '0')}`;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = palette.surface;
  context.strokeStyle = accent;
  context.lineWidth = 3;
  context.shadowColor = accent;
  context.shadowBlur = 18;
  context.beginPath();
  context.roundRect(18, 26, 476, 90, 28);
  context.fill();
  context.stroke();
  context.shadowBlur = 0;
  context.font = '700 34px JetBrains Mono, monospace';
  context.fillStyle = palette.text;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text.toUpperCase(), 256, 72, 420);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function lerpColor(color: THREE.Color, target: number, alpha = 0.08) {
  color.lerp(new THREE.Color(target), alpha);
}

export default function ThreeCareerScene({ activeIndex, scrollProgress }: ThreeCareerSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const progressRef = useRef(scrollProgress);
  const { setCursorType, setCursorText } = useCursor();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let palette = palettes[getTheme()];
    let hoveredIndex = -1;
    let canInteractWithScene = false;
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.fog, 0.026);

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 140);
    camera.position.set(0, 3.2, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(palette.bg, 0.06);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(palette.secondary, 0.76);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(palette.primary, 75, 36);
    keyLight.position.set(4, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(palette.secondary, 55, 42);
    rimLight.position.set(-7, -2, 5);
    scene.add(rimLight);

    const root = new THREE.Group();
    scene.add(root);

    const backgroundGroup = new THREE.Group();
    scene.add(backgroundGroup);

    const positions = journeyChapters.map((_, index) => {
      const angle = index * 0.86 - 2.25;
      const radius = 3.3 + (index % 2) * 0.85;
      return new THREE.Vector3(Math.cos(angle) * radius, 2.6 - index * 0.9, Math.sin(angle) * radius);
    });

    const curve = new THREE.CatmullRomCurve3(positions, false, 'catmullrom', 0.4);
    const tubeGeometry = new THREE.TubeGeometry(curve, 220, 0.038, 14, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: palette.primary, transparent: true, opacity: 0.56 });
    const pathMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    root.add(pathMesh);

    const pulseMaterial = new THREE.MeshBasicMaterial({ color: palette.secondary, transparent: true, opacity: 0.82 });
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 18), pulseMaterial);
    root.add(pulse);

    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.34, 48),
      new THREE.MeshBasicMaterial({ color: palette.tertiary, transparent: true, opacity: 0 })
    );
    reticle.rotation.x = Math.PI / 2;
    root.add(reticle);

    const gridPrimary = new THREE.GridHelper(28, 34, palette.grid, palette.grid);
    gridPrimary.position.set(0, -5.3, -4);
    gridPrimary.material.transparent = true;
    gridPrimary.material.opacity = 0.14;
    backgroundGroup.add(gridPrimary);

    const gridSecondary = new THREE.GridHelper(22, 18, palette.secondary, palette.secondary);
    gridSecondary.rotation.z = Math.PI / 2;
    gridSecondary.position.set(-8.5, -0.5, -8);
    gridSecondary.material.transparent = true;
    gridSecondary.material.opacity = 0.08;
    backgroundGroup.add(gridSecondary);

    const tunnel = new THREE.Mesh(
      new THREE.TorusKnotGeometry(5.8, 0.014, 260, 8, 3, 7),
      new THREE.MeshBasicMaterial({ color: palette.secondary, wireframe: true, transparent: true, opacity: 0.18 })
    );
    tunnel.position.set(1.5, -1, -6);
    backgroundGroup.add(tunnel);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.018, 12, 180),
      new THREE.MeshBasicMaterial({ color: palette.tertiary, transparent: true, opacity: 0.42 })
    );
    halo.position.set(0, -0.4, -2.3);
    halo.rotation.x = Math.PI / 2.2;
    backgroundGroup.add(halo);

    const arenaRings = new THREE.Group();
    [2.8, 4.4, 6.1].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.01, 8, 180),
        new THREE.MeshBasicMaterial({ color: index % 2 ? palette.secondary : palette.primary, transparent: true, opacity: 0.12 })
      );
      ring.rotation.x = Math.PI / (2.1 + index * 0.12);
      ring.rotation.z = index * 0.6;
      arenaRings.add(ring);
    });
    arenaRings.position.set(0, -0.7, -3.4);
    backgroundGroup.add(arenaRings);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(950 * 3);
    const starColors = new Float32Array(950 * 3);
    const primaryColor = new THREE.Color(palette.primary);
    const secondaryColor = new THREE.Color(palette.secondary);
    const starColor = new THREE.Color(palette.star);
    for (let index = 0; index < starPositions.length; index += 3) {
      starPositions[index] = (Math.random() - 0.5) * 42;
      starPositions[index + 1] = (Math.random() - 0.5) * 28;
      starPositions[index + 2] = (Math.random() - 0.5) * 42;

      const color = index % 5 === 0 ? primaryColor : index % 7 === 0 ? secondaryColor : starColor;
      starColors[index] = color.r;
      starColors[index + 1] = color.g;
      starColors[index + 2] = color.b;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 0.032, transparent: true, opacity: 0.78, vertexColors: true, depthWrite: false });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const nodeMeshes: THREE.Mesh[] = [];
    const rings: THREE.Mesh[] = [];
    const labelSprites: THREE.Sprite[] = [];

    journeyChapters.forEach((chapter, index) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(positions[index]);
      root.add(nodeGroup);

      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(index === 0 ? 0.58 : 0.43, 2),
        new THREE.MeshStandardMaterial({
          color: index % 2 ? palette.secondary : palette.primary,
          emissive: index % 2 ? palette.secondary : palette.primary,
          emissiveIntensity: index === 0 ? 0.7 : 0.25,
          roughness: 0.2,
          metalness: 0.65,
        })
      );
      mesh.userData.index = index;
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.78, 0.012, 10, 84),
        new THREE.MeshBasicMaterial({ color: index % 2 ? palette.primary : palette.tertiary, transparent: true, opacity: 0.38 })
      );
      ring.rotation.x = Math.PI / 2.7;
      nodeGroup.add(ring);
      rings.push(ring);

      const labelMaterial = new THREE.SpriteMaterial({
        map: createLabelTexture(chapter.nav, palette),
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
      });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(0, -0.92, 0);
      label.scale.set(2.1, 0.65, 1);
      nodeGroup.add(label);
      labelSprites.push(label);
    });

    const projectGroup = new THREE.Group();
    root.add(projectGroup);
    ['Aetheria', 'RideSync', 'DocStream', 'Board'].forEach((name, index) => {
      const angle = (index / 4) * Math.PI * 2;
      const satellite = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2, 1),
        new THREE.MeshStandardMaterial({ color: index % 2 ? palette.tertiary : palette.primary, emissive: palette.secondary, emissiveIntensity: 0.35, roughness: 0.22, metalness: 0.5 })
      );
      satellite.position.set(Math.cos(angle) * 2.25, Math.sin(angle * 1.5) * 0.45, Math.sin(angle) * 2.25);
      satellite.name = name;
      projectGroup.add(satellite);
    });

    const applyPalette = (nextPalette: ScenePalette) => {
      palette = nextPalette;
      scene.fog = new THREE.FogExp2(palette.fog, 0.026);
      renderer.setClearColor(palette.bg, getTheme() === 'light' ? 0.18 : 0.06);
      ambientLight.color.setHex(palette.secondary);
      keyLight.color.setHex(palette.primary);
      rimLight.color.setHex(palette.secondary);
      tubeMaterial.color.setHex(palette.primary);
      pulseMaterial.color.setHex(palette.secondary);
      starMaterial.color.setHex(palette.star);
      (tunnel.material as THREE.MeshBasicMaterial).color.setHex(palette.secondary);
      (halo.material as THREE.MeshBasicMaterial).color.setHex(palette.tertiary);
      (reticle.material as THREE.MeshBasicMaterial).color.setHex(palette.tertiary);
      arenaRings.children.forEach((child, index) => {
        ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color.setHex(index % 2 ? palette.secondary : palette.primary);
      });
      (gridPrimary.material as THREE.Material).needsUpdate = true;
      (gridSecondary.material as THREE.Material).needsUpdate = true;

      nodeMeshes.forEach((mesh, index) => {
        const material = mesh.material as THREE.MeshStandardMaterial;
        const color = index % 2 ? palette.secondary : palette.primary;
        material.color.setHex(color);
        material.emissive.setHex(color);
      });
      rings.forEach((ring, index) => {
        (ring.material as THREE.MeshBasicMaterial).color.setHex(index % 2 ? palette.primary : palette.tertiary);
      });
      labelSprites.forEach((label, index) => {
        const material = label.material as THREE.SpriteMaterial;
        material.map?.dispose();
        material.map = createLabelTexture(journeyChapters[index].nav, palette);
        material.needsUpdate = true;
      });
    };

    const observer = new MutationObserver(() => applyPalette(palettes[getTheme()]));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const updatePointer = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const target = event.target as HTMLElement | null;
      canInteractWithScene = !target?.closest('a, button, input, textarea, select, [role="button"], [data-lenis-prevent]');
    };

    const handleLeave = () => {
      pointerTarget.set(0, 0);
      hoveredIndex = -1;
      setCursorType('default');
      setCursorText('');
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickedRealUi = target?.closest('a, button, input, textarea, select, [role="button"], [data-lenis-prevent]');
      if (clickedRealUi || hoveredIndex < 0) return;

      document.getElementById(journeyChapters[hoveredIndex].id)?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('blur', handleLeave);
    window.addEventListener('click', handleClick);

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', onResize);

    let frameId = 0;
    const clock = new THREE.Clock();
    const cameraTarget = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const scaleTarget = new THREE.Vector3();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const currentIndex = activeIndexRef.current;
      const activePosition = positions[currentIndex] ?? positions[0];
      const mobile = window.innerWidth < 768;

      pointer.lerp(pointerTarget, 0.075);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes, false);
      const nextHover = intersects[0]?.object.userData.index ?? -1;
      if (nextHover !== hoveredIndex) {
        hoveredIndex = nextHover;
        if (hoveredIndex >= 0 && canInteractWithScene) {
          setCursorType('hover');
          setCursorText(journeyChapters[hoveredIndex].nav.toUpperCase());
        } else {
          setCursorType('default');
          setCursorText('');
        }
      }

      const curvePoint = curve.getPoint((elapsed * 0.08) % 1);
      pulse.position.copy(curvePoint);
      pulse.scale.setScalar(1 + Math.sin(elapsed * 5) * 0.25);

      root.rotation.y = Math.sin(elapsed * 0.16) * 0.18 + (progressRef.current - 0.5) * 0.55 + pointer.x * 0.16;
      root.rotation.x = pointer.y * 0.08;
      stars.rotation.y = elapsed * 0.014 + pointer.x * 0.035;
      stars.rotation.x = pointer.y * 0.025;
      backgroundGroup.rotation.y = elapsed * 0.035 + pointer.x * 0.08;
      backgroundGroup.rotation.x = pointer.y * 0.04;
      tunnel.rotation.x = elapsed * 0.08;
      tunnel.rotation.y = elapsed * 0.12;
      halo.rotation.z = elapsed * 0.18;
      arenaRings.rotation.y = elapsed * 0.11 + pointer.x * 0.3;
      arenaRings.rotation.z = Math.sin(elapsed * 0.22) * 0.18;
      gridPrimary.position.z = -4 + Math.sin(elapsed * 0.35) * 0.35;
      gridSecondary.position.x = -8.5 + Math.cos(elapsed * 0.3) * 0.5;
      projectGroup.rotation.y = elapsed * 0.55;
      projectGroup.rotation.x = pointer.y * 0.35;
      projectGroup.position.copy(positions[4]);

      lerpColor(tubeMaterial.color, palette.primary);
      lerpColor(pulseMaterial.color, hoveredIndex >= 0 ? palette.tertiary : palette.secondary);
      lerpColor((halo.material as THREE.MeshBasicMaterial).color, hoveredIndex >= 0 ? palette.primary : palette.tertiary);

      nodeMeshes.forEach((mesh, index) => {
        const selected = index === currentIndex;
        const hovered = index === hoveredIndex;
        const scale = hovered ? 1.9 : selected ? 1.55 + Math.sin(elapsed * 3.2) * 0.08 : 1;
        scaleTarget.set(scale, scale, scale);
        mesh.scale.lerp(scaleTarget, 0.1);
        mesh.rotation.x += 0.006 + index * 0.0008 + (hovered ? 0.014 : 0);
        mesh.rotation.y += 0.009 + (hovered ? 0.018 : 0);

        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity += ((hovered ? 1.45 : selected ? 1 : 0.24) - material.emissiveIntensity) * 0.08;
        lerpColor(material.color, hovered ? palette.tertiary : index % 2 ? palette.secondary : palette.primary);
        lerpColor(material.emissive, hovered ? palette.tertiary : index % 2 ? palette.secondary : palette.primary);
      });

      rings.forEach((ring, index) => {
        const highlighted = index === currentIndex || index === hoveredIndex;
        ring.rotation.z += highlighted ? 0.036 : 0.012;
        ring.rotation.y = Math.sin(elapsed + index) * 0.2;
        const material = ring.material as THREE.MeshBasicMaterial;
        material.opacity += ((highlighted ? 0.96 : 0.25) - material.opacity) * 0.08;
      });

      labelSprites.forEach((label, index) => {
        const material = label.material as THREE.SpriteMaterial;
        material.opacity += ((index === currentIndex || index === hoveredIndex ? 1 : 0.5) - material.opacity) * 0.06;
      });

      const reticleMaterial = reticle.material as THREE.MeshBasicMaterial;
      if (hoveredIndex >= 0 && canInteractWithScene) {
        reticle.position.lerp(positions[hoveredIndex], 0.18);
        reticle.scale.setScalar(1 + Math.sin(elapsed * 8) * 0.08);
        reticleMaterial.opacity += (0.9 - reticleMaterial.opacity) * 0.14;
      } else {
        reticleMaterial.opacity += (0 - reticleMaterial.opacity) * 0.14;
      }

      cameraTarget.set(
        activePosition.x + (mobile ? pointer.x * 0.55 : 3.8 + pointer.x * 1.25),
        activePosition.y + 1.15 + pointer.y * 0.65,
        activePosition.z + (mobile ? 8.8 : 6.5) + Math.abs(pointer.x) * 0.4
      );
      camera.position.lerp(cameraTarget, 0.045);
      lookTarget.lerp(activePosition.clone().add(new THREE.Vector3(pointer.x * 0.7, pointer.y * 0.45, 0)), 0.065);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('blur', handleLeave);
      window.removeEventListener('click', handleClick);
      setCursorType('default');
      setCursorText('');
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Sprite) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.map?.dispose();
            material.dispose();
          }
        }
      });
    };
  }, [setCursorText, setCursorType]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
