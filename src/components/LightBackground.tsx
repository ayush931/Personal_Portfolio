"use client";

import React from "react";
import { useVibe } from "./VibeEngine";

export const LightBackground: React.FC = () => {
  const { theme } = useVibe();

  const getGradientStyles = () => {
    switch (theme) {
      case "emerald":
        return {
          meshBg: "bg-gradient-to-tr from-[#059669]/40 via-[#047857]/30 to-[#06b6d4]/40",
          blob1: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(5,150,105,0.2) 60%, transparent 80%)",
          blob2: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(8,145,178,0.2) 60%, transparent 80%)",
          blob3: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(5,150,105,0.15) 60%, transparent 80%)",
        };
      case "violet":
        return {
          meshBg: "bg-gradient-to-tr from-[#7c3aed]/40 via-[#6d28d9]/30 to-[#ec4899]/40",
          blob1: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(124,58,237,0.2) 60%, transparent 80%)",
          blob2: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(192,38,211,0.2) 60%, transparent 80%)",
          blob3: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, rgba(124,58,237,0.15) 60%, transparent 80%)",
        };
      case "sunset":
        return {
          meshBg: "bg-gradient-to-tr from-[#d97706]/40 via-[#ea580c]/30 to-[#ef4444]/40",
          blob1: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.2) 60%, transparent 80%)",
          blob2: "radial-gradient(circle, rgba(239,68,68,0.35) 0%, rgba(220,38,38,0.2) 60%, transparent 80%)",
          blob3: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(217,119,6,0.15) 60%, transparent 80%)",
        };
      case "indigo":
      default:
        return {
          meshBg: "bg-gradient-to-tr from-[#635bff]/40 via-[#4f46e5]/30 to-[#00d4ff]/40",
          blob1: "radial-gradient(circle, rgba(255,107,139,0.35) 0%, rgba(99,91,255,0.2) 60%, transparent 80%)",
          blob2: "radial-gradient(circle, rgba(0,212,255,0.35) 0%, rgba(128,90,213,0.2) 60%, transparent 80%)",
          blob3: "radial-gradient(circle, rgba(0,212,180,0.3) 0%, rgba(99,91,255,0.15) 60%, transparent 80%)",
        };
    }
  };

  const gradients = getGradientStyles();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#040814] transition-colors duration-500">
      <div className={`absolute top-0 left-0 right-0 h-[800px] hero-slant ${gradients.meshBg} opacity-80 transition-all duration-700`}>
        <div
          className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[90px] opacity-75 animate-mesh-flow transition-all duration-700"
          style={{ background: gradients.blob1 }}
        />
        <div
          className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-65 animate-mesh-flow transition-all duration-700"
          style={{
            background: gradients.blob2,
            animationDelay: "-5s",
          }}
        />
        <div
          className="absolute top-[40%] left-[25%] w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-55 animate-mesh-flow transition-all duration-700"
          style={{
            background: gradients.blob3,
            animationDelay: "-10s",
          }}
        />
      </div>
    </div>
  );
};
