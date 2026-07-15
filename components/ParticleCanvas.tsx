'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number; // For parallax effect
  color: string;
}

interface FloatingShape {
  x: number;
  y: number;
  size: number;
  angle: number;
  spinSpeed: number;
  vx: number;
  vy: number;
  sides: number;
  color: string;
}

interface NebulaBlob {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<FloatingShape[]>([]);
  const blobsRef = useRef<NebulaBlob[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef<number>(0);

  const initAssets = useCallback((w: number, h: number) => {
    // 1. Initialize Particles (with 3 parallax layers)
    const particleCount = Math.min(Math.floor((w * h) / 10000), 100);
    const colors = ['rgba(34, 211, 238, ', 'rgba(167, 139, 250, ', 'rgba(139, 92, 246, ']; // cyan, purple, violet
    
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const layer = Math.floor(Math.random() * 3) + 1; // 1 = far, 2 = mid, 3 = close
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (0.1 * layer),
        vy: (Math.random() - 0.5) * (0.1 * layer),
        size: Math.random() * 1.25 + 0.3 * layer,
        opacity: Math.random() * 0.25 + 0.05 * layer,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        layer,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    // 2. Initialize Floating Wireframe Shapes
    const shapeCount = Math.min(Math.floor((w * h) / 150000), 6);
    shapesRef.current = Array.from({ length: shapeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 30 + 15,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.006,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      sides: Math.random() > 0.5 ? 4 : 3, // diamond or triangle
      color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.05)' : 'rgba(167, 139, 250, 0.04)',
    }));

    // 3. Initialize Slow Nebula Blobs
    blobsRef.current = [
      {
        x: w * 0.25,
        y: h * 0.3,
        radius: Math.min(w, h) * 0.35,
        color: 'rgba(34, 211, 238, 0.025)', // Cyan glow
        vx: 0.03,
        vy: 0.02,
      },
      {
        x: w * 0.75,
        y: h * 0.65,
        radius: Math.min(w, h) * 0.4,
        color: 'rgba(167, 139, 250, 0.025)', // Purple glow
        vx: -0.02,
        vy: 0.03,
      },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initAssets(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Draw helper for wireframe shapes
    const drawPolygon = (c: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, angle: number) => {
      if (sides < 3) return;
      c.beginPath();
      const sx = x + radius * Math.cos(angle);
      const sy = y + radius * Math.sin(angle);
      c.moveTo(sx, sy);
      for (let i = 1; i <= sides; i++) {
        const a = angle + (i * 2 * Math.PI) / sides;
        c.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
      }
      c.closePath();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Nebula Blobs (Ambient Aurora Background)
      ctx.save();
      for (const blob of blobsRef.current) {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce blobs gently inside borders
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > w) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > h) blob.vy *= -1;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Draw and Update Floating Wireframe Shapes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.8;
      for (const s of shapesRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.spinSpeed;

        if (s.x < -s.size) s.x = w + s.size;
        if (s.x > w + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = h + s.size;
        if (s.y > h + s.size) s.y = -s.size;

        ctx.save();
        ctx.strokeStyle = s.color;
        drawPolygon(ctx, s.x, s.y, s.size, s.sides, s.angle);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw and Update Constellation Particles
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse Interaction (repulsion based on distance)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            // Move away from mouse
            p.x += (dx / dist) * force * (p.layer * 0.4);
            p.y += (dy / dist) * force * (p.layer * 0.4);
          }
        }

        const alpha = p.opacity + Math.sin(p.pulse) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.01, Math.min(alpha, 0.95))})`;
        ctx.fill();
      }

      // 4. Draw Connective Constellation Lines (Only within the same depth layers for depth sorting)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          
          // Connect if in same layer or adjacent layer
          if (Math.abs(pi.layer - pj.layer) <= 1) {
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const maxDist = 80 + pi.layer * 10;
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.06 * (pi.layer / 3);
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
              ctx.lineWidth = 0.3 * pi.layer;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initAssets]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  );
}
