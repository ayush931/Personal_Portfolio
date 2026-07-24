"use client";

import React, { useState, useEffect } from "react";
import { useVibe } from "./VibeEngine";

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { colors } = useVibe();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
      <div
        className="h-full transition-all duration-150 ease-out shadow-sm"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: colors.primary,
        }}
      />
    </div>
  );
};
