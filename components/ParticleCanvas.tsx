'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // If mobile viewport (width < 768px), do not load Three.js to protect mobile rendering performance/LCP
    if (window.innerWidth < 768) {
      return;
    }

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Config
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];
    
    // Random positions and velocities
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150; // z

      velocities.push(
        (Math.random() - 0.5) * 0.08, // vx
        (Math.random() - 0.5) * 0.08, // vy
        (Math.random() - 0.5) * 0.08  // vz
      );
    }

    // Geometries
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      color: new THREE.Color('#4f46e5'), // Indigo-600 for light background visibility
      opacity: 0.45
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#6366f1'), // Indigo-500 line
      transparent: true,
      opacity: 0.08,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    
    const maxConnections = particleCount * 4;
    const linePositions = new Float32Array(maxConnections * 3 * 2); // 2 vertices per line
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // Mouse positions
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll progress
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation Loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Rotate systems based on mouse
      particleSystem.rotation.y = mouseX * 0.15;
      particleSystem.rotation.x = -mouseY * 0.15;
      lineSystem.rotation.y = mouseX * 0.15;
      lineSystem.rotation.x = -mouseY * 0.15;

      // Slowly rotate scene automatically
      particleSystem.rotation.z += 0.0008;
      lineSystem.rotation.z += 0.0008;

      // Adjust camera position slightly on scroll to give parallax depth
      camera.position.y = -scrollY * 0.02;
      camera.lookAt(0, -scrollY * 0.02, 0);

      for (let i = 0; i < particleCount; i++) {
        // Move particle
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundary checks (bounce back within cube)
        const boundary = 75;
        if (Math.abs(posArray[i * 3]) > boundary) {
          velocities[i * 3] *= -1;
          posArray[i * 3] = Math.sign(posArray[i * 3]) * boundary;
        }
        if (Math.abs(posArray[i * 3 + 1]) > boundary) {
          velocities[i * 3 + 1] *= -1;
          posArray[i * 3 + 1] = Math.sign(posArray[i * 3 + 1]) * boundary;
        }
        if (Math.abs(posArray[i * 3 + 2]) > boundary) {
          velocities[i * 3 + 2] *= -1;
          posArray[i * 3 + 2] = Math.sign(posArray[i * 3 + 2]) * boundary;
        }
      }
      posAttr.needsUpdate = true;

      // Connect points
      let connectionIndex = 0;
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      linePosArray.fill(0);

      const maxDist = 28;

      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist && connectionIndex < maxConnections) {
            linePosArray[connectionIndex * 6] = x1;
            linePosArray[connectionIndex * 6 + 1] = y1;
            linePosArray[connectionIndex * 6 + 2] = z1;

            linePosArray[connectionIndex * 6 + 3] = x2;
            linePosArray[connectionIndex * 6 + 4] = y2;
            linePosArray[connectionIndex * 6 + 5] = z2;

            connectionIndex++;
          }
        }
      }
      linePosAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionIndex * 2);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-gradient-to-tr from-[#f4f6fb] via-[#eef2f7] to-[#e0e7ff] md:bg-transparent"
      id="3d-particles"
    />
  );
}
