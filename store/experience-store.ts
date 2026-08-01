"use client";

import { create } from "zustand";

type ExperienceState = {
  assetProgress: number;
  hoverTarget: "hero-object" | null;
  isSceneReady: boolean;
  activeSection: string;
  activeProject: string | null;
  activeAccentColor: string;
  scrollProgress: number;
  setAssetProgress: (progress: number) => void;
  setHoverTarget: (target: ExperienceState["hoverTarget"]) => void;
  setSceneReady: (isReady: boolean) => void;
  setActiveSection: (section: string) => void;
  setActiveProject: (project: string | null) => void;
  setActiveAccentColor: (color: string) => void;
  setScrollProgress: (progress: number) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  assetProgress: 0,
  hoverTarget: null,
  isSceneReady: false,
  activeSection: "hero",
  activeProject: null,
  activeAccentColor: "#2563eb",
  scrollProgress: 0,
  setAssetProgress: (assetProgress) => set({ assetProgress }),
  setHoverTarget: (hoverTarget) => set({ hoverTarget }),
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setActiveProject: (activeProject) => set({ activeProject }),
  setActiveAccentColor: (activeAccentColor) => set({ activeAccentColor }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));
