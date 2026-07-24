"use client";

import React, { createContext, useContext } from "react";

export type VibeTheme = "indigo" | "emerald" | "violet" | "sunset";

interface VibeContextType {
  theme: VibeTheme;
  setTheme: (theme: VibeTheme) => void;
  triggerConfetti: () => void;
  playClickSound: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    textGradient: string;
    borderGlow: string;
    shadowGlow: string;
    bgAccent: string;
    badgeBg: string;
  };
}

const defaultColors = {
  primary: "#D8C7A1",
  secondary: "#B7A176",
  accent: "#8B7A58",
  gradient: "from-[#8B7A58] to-[#D8C7A1]",
  textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#EEE9DF] to-[#D8C7A1]",
  borderGlow: "border-[#D8C7A1]/25",
  shadowGlow: "shadow-[0_0_20px_rgba(94,234,212,0.3)]",
  bgAccent: "bg-[#D8C7A1]/8",
  badgeBg: "bg-[#D8C7A1]/8 text-[#D8C7A1]",
};

const VibeContext = createContext<VibeContextType>({
  theme: "indigo",
  setTheme: () => {},
  triggerConfetti: () => {},
  playClickSound: () => {},
  colors: defaultColors,
});

export const VibeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <VibeContext.Provider
      value={{
        theme: "indigo",
        setTheme: () => {},
        triggerConfetti: () => {},
        playClickSound: () => {},
        colors: defaultColors,
      }}
    >
      {children}
    </VibeContext.Provider>
  );
};

export const useVibe = () => useContext(VibeContext);
