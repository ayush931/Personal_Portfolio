"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ActiveTheoryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Performance boost
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050508, 1);
    container.appendChild(renderer.domElement);

    // 2. Lighting for 3D Shaded Objects
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x5eead4, 3, 1000);
    pointLight1.position.set(200, 300, 300);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff9c, 2.5, 1000);
    pointLight2.position.set(-200, -200, 200);
    scene.add(pointLight2);

    // 3. Signature 3D Floating Cyber Core Polyhedron
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner 3D Polyhedron Core
    const coreGeo = new THREE.IcosahedronGeometry(90, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x07070d,
      emissive: 0x052e2b,
      specular: 0x5eead4,
      shininess: 80,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Outer 3D Wireframe Polyhedron Mesh
    const wireGeo = new THREE.IcosahedronGeometry(110, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Orbiting 3D Ring Mesh
    const ringGeo = new THREE.TorusGeometry(140, 1.5, 12, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9c,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    // Position Core in upper right 3D space
    coreGroup.position.set(300, 100, -100);

    // 4. Cyber Kinetic Particle Grid Buffer
    const count = 1000; // Optimized count
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorCyan = new THREE.Color(0x5eead4);
    const colorGreen = new THREE.Color(0x00ff9c);
    const colorAmber = new THREE.Color(0xf59e0b);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1800;
      positions[i3 + 1] = (Math.random() - 0.5) * 1800;
      positions[i3 + 2] = (Math.random() - 0.5) * 1200;

      const rand = Math.random();
      const mixedColor = rand < 0.6 ? colorCyan : rand < 0.85 ? colorGreen : colorAmber;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMat);
    scene.add(particles);

    // 5. 3D Ambient Floor Grid Mesh
    const gridHelper = new THREE.GridHelper(2400, 40, 0x5eead4, 0x181824);
    gridHelper.position.y = -400;
    gridHelper.rotation.x = 0.15;
    scene.add(gridHelper);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 6. Non-blocking RAF Render Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // 3D Camera motion based on mouse parallax & scroll depth
      camera.position.x = targetX * 0.3;
      camera.position.y = -targetY * 0.3 + scrollY * 0.1;
      camera.lookAt(0, 0, 0);

      // Rotate 3D Polyhedron Cyber Core
      coreGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.001;
      coreGroup.rotation.x = elapsedTime * 0.12 + targetY * 0.001;
      ringMesh.rotation.z = elapsedTime * 0.3;

      // Pulse 3D Core position
      coreGroup.position.y = 100 + Math.sin(elapsedTime * 1.5) * 12 - scrollY * 0.06;

      // Rotate Particles
      particles.rotation.y = elapsedTime * 0.015;

      // Floor Grid Scroll
      gridHelper.position.z = (elapsedTime * 40) % 50;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      geometry.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none [will-change:transform]">
      {/* Three.js 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 opacity-70" />

      {/* 3D Cyber HUD Target Crosshairs */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-signal-cyan/50 flex items-center space-x-1">
        <span className="animate-pulse">+</span>
        <span>3D_CYBER_MATRIX // THREE.JS</span>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-signal-cyan/50 flex items-center space-x-1">
        <span>CORE_ROT: 3D_GEOMETRY</span>
        <span>+</span>
      </div>
      <div className="absolute bottom-16 left-6 text-[10px] font-mono text-signal-green/40 hidden md:block">
        + 3D WEBGL SHADER ENGINE // PERSPECTIVE 1000PX
      </div>
    </div>
  );
};
