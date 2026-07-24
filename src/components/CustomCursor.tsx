"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("interactive-hover"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyber-accent"
        style={{ boxShadow: "0 0 12px rgba(168, 85, 247, 0.6), 0 0 24px rgba(168, 85, 247, 0.3)" }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Outer ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center ${
          isHovered
            ? "bg-cyber-accent/10 border-cyber-accent"
            : "border-cyber-accent/40"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)"
            : "0 0 15px rgba(168, 85, 247, 0.15)",
        }}
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 18),
          y: mousePosition.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.15 }}
      >
        {isHovered && (
          <span className="w-2 h-2 rounded-full bg-cyber-accent animate-ping" />
        )}
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
          width: 100,
          height: 100,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.3 }}
      />
    </div>
  );
};
