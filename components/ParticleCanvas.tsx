'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Skip Three.js on mobile/tablet to boost rendering speeds
    if (window.innerWidth < 768) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 40;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 1. Mesh Gradient Background using ShaderMaterial
    const bgGeometry = new THREE.PlaneGeometry(200, 200);
    const bgMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Wave effects
          float wave1 = sin(uv.x * 2.5 + uTime * 0.12) * 0.5 + 0.5;
          float wave2 = cos(uv.y * 3.0 - uTime * 0.08) * 0.5 + 0.5;
          float wave3 = sin((uv.x + uv.y) * 1.8 + uTime * 0.05) * 0.5 + 0.5;
          
          // Dark Mode color points
          vec3 darkIndigo = vec3(0.039, 0.035, 0.102);    // #0A091A
          vec3 darkMagenta = vec3(0.102, 0.039, 0.121);   // #1A0A1F
          vec3 darkVoid = vec3(0.015, 0.015, 0.035);      // #040409
          
          vec3 mix1 = mix(darkIndigo, darkMagenta, wave1);
          vec3 finalColor = mix(mix1, darkVoid, wave2 * wave3);
          
          gl_FragColor = vec4(finalColor, 0.4);
        }
      `,
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // 2. Stars Field: 2000 points
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 120; // x
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 120; // y
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80; // z
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xEC4899, // Accent Glow (#EC4899)
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3. Floating Wireframe Geometries (Up to 5)
    const shapes: THREE.Mesh[] = [];
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x7C3AED, // Accent Primary (#7C3AED)
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    });

    const geometries = [
      new THREE.IcosahedronGeometry(4, 1),
      new THREE.TorusGeometry(3, 1, 8, 24),
      new THREE.OctahedronGeometry(3.5, 1),
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.TorusGeometry(2, 0.6, 6, 18),
    ];

    const positions = [
      new THREE.Vector3(-18, 12, -10),
      new THREE.Vector3(15, -10, -5),
      new THREE.Vector3(10, 14, -12),
      new THREE.Vector3(-12, -12, -8),
      new THREE.Vector3(2, 4, -15),
    ];

    geometries.forEach((geom, idx) => {
      const mesh = new THREE.Mesh(geom, wireframeMaterial);
      mesh.position.copy(positions[idx]);
      scene.add(mesh);
      shapes.push(mesh);
    });

    // Mouse Parallax Trackers
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll depth adjustment
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation Loop
    let animId = 0;
    const startTime = Date.now();

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const elapsedTime = (Date.now() - startTime) * 0.001;

      // Update shader time
      bgMaterial.uniforms.uTime.value = elapsedTime;



      // Mouse Parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      stars.rotation.x = currentMouseY * 0.15;
      stars.rotation.y = currentMouseX * 0.15;

      // Slowly rotate shapes
      shapes.forEach((mesh, index) => {
        const factor = index % 2 === 0 ? 1 : -1;
        mesh.rotation.x += 0.001 * factor;
        mesh.rotation.y += 0.0015 * factor;
        mesh.rotation.z += 0.0005;
        
        // Floating drift
        mesh.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.005;
      });

      // Camera scroll parallax
      camera.position.y = -scrollY * 0.015;
      camera.lookAt(0, -scrollY * 0.015, 0);

      renderer.render(scene, camera);
    };

    tick();

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
      cancelAnimationFrame(animId);
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      bgGeometry.dispose();
      bgMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      geometries.forEach(g => g.dispose());
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-bg-void"
      id="three-background"
    />
  );
};
export default ParticleCanvas;
