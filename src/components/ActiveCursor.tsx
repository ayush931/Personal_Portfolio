"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const ActiveCursor: React.FC = () => {
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Smooth lerp coordinates for trailing cyber HUD target
  const ringX = useSpring(-100, { stiffness: 450, damping: 30 });
  const ringY = useSpring(-100, { stiffness: 450, damping: 30 });

  // Direct coordinates for custom cyber arrow pointer
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Disable on coarse pointer devices (touchscreens)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Force hide native browser cursor everywhere
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const currentX = e.clientX;
      const currentY = e.clientY;

      setDotPos({ x: currentX, y: currentY });
      ringX.set(currentX);
      ringY.set(currentY);

      // Spawn trailing theme-matched cyan & green micro sparkles
      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      if (dist > 10 && !isInteractive) {
        lastX = currentX;
        lastY = currentY;

        particleIdRef.current++;
        const isCyan = particleIdRef.current % 2 === 0;
        const newParticle: TrailParticle = {
          id: particleIdRef.current,
          x: currentX + (Math.random() - 0.5) * 4,
          y: currentY + (Math.random() - 0.5) * 4,
          color: isCyan ? "#5EEAD4" : "#00FF9C",
          size: Math.random() * 2.5 + 1.5,
          opacity: 0.75,
        };

        setParticles((prev) => [...prev.slice(-8), newParticle]);
      }

      // Check if mouse is hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        "button, a, input, select, textarea, [role='button'], canvas, .interactive-area, [onClick], [data-cursor-text]"
      ) as HTMLElement | null;

      if (interactiveElement) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseleave", onMouseLeave);

    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.15 }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    return () => {
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearInterval(timer);
    };
  }, [ringX, ringY, isInteractive]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none font-mono">
      
      {/* 1. Trailing Theme Sparkle Particles */}
      {!isInteractive &&
        particles.map((p) => (
          <div
            key={p.id}
            className="fixed rounded-full pointer-events-none transition-opacity duration-150"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 8px ${p.color}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

      {/* 2. Theme Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.85, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed rounded-full border border-signal-cyan pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${r.x}px`,
              top: `${r.y}px`,
              width: "52px",
              height: "52px",
              boxShadow: "0 0 20px rgba(94, 234, 212, 0.6)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* 3. Single Unified Cyber Pointer Component */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75"
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`,
        }}
      >
        {isInteractive ? (
          /* Single Precision Crosshair Laser Dot when hovering interactive elements */
          <div className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-signal-green rounded-full shadow-[0_0_10px_#00FF9C]" />
          </div>
        ) : (
          /* Active Theory Cyber Arrow Pointer SVG */
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_0_8px_rgba(94,234,212,0.8)] -translate-x-1 -translate-y-1"
          >
            <path
              d="M3 3L10.07 19.97L13.58 13.58L19.97 10.07L3 3Z"
              fill="#09090B"
              stroke="#5EEAD4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M3 3L9 11L6 13L3 3Z"
              fill="#00FF9C"
              opacity="0.9"
            />
          </svg>
        )}
      </div>

      {/* 4. Trailing Cyber HUD Target Ring */}
      <motion.div
        animate={{
          scale: isInteractive ? 1.25 : 1,
          borderColor: isInteractive ? "rgba(0, 255, 156, 0.8)" : "rgba(94, 234, 212, 0.4)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border bg-signal-cyan/5 backdrop-blur-[2px] w-9 h-9 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-glow-cyan"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Corner HUD crosshair accents */}
        <span className="absolute -top-1 -left-1 text-[7px] text-signal-cyan/70 font-mono">+</span>
        <span className="absolute -top-1 -right-1 text-[7px] text-signal-cyan/70 font-mono">+</span>
        <span className="absolute -bottom-1 -left-1 text-[7px] text-signal-cyan/70 font-mono">+</span>
        <span className="absolute -bottom-1 -right-1 text-[7px] text-signal-cyan/70 font-mono">+</span>
      </motion.div>
    </div>
  );
};
