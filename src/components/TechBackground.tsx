"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const TechBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Base Full-Page Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-oled-bg to-black" />

      {/* 2. Multi-Color Dynamic Ambient Gradient Orbs */}
      {/* Top Left Signal Cyan Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-signal-cyan/15 via-signal-cyan/5 to-transparent blur-[140px]" />

      {/* Middle Right Signal Green Glow */}
      <div className="absolute top-[35%] -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-signal-green/12 via-signal-cyan/5 to-transparent blur-[160px]" />

      {/* Lower Left Amber & Signal Cyan Dual Glow */}
      <div className="absolute top-[70%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-signal-amber/10 via-signal-green/5 to-transparent blur-[150px]" />

      {/* 3. Interactive Cursor Spotlight Multi-Color Gradient */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(850px circle at ${springX}px ${springY}px, rgba(94, 234, 212, 0.07), rgba(0, 255, 156, 0.04), transparent 70%)`,
        }}
      />

      {/* 4. Technical Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-35" />

      {/* 5. Animated Telemetry Gradient Scanline Pass */}
      <div className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-signal-cyan/[0.03] to-transparent animate-scanline pointer-events-none" />

    </div>
  );
};
