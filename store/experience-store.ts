"use client";

import { create } from "zustand";

type ExperienceState = {
  assetProgress: number;
  hoverTarget: "hero-object" | null;
  isSceneReady: boolean;
  setAssetProgress: (progress: number) => void;
  setHoverTarget: (target: ExperienceState["hoverTarget"]) => void;
  setSceneReady: (isReady: boolean) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  assetProgress: 0,
  hoverTarget: null,
  isSceneReady: false,
  setAssetProgress: (assetProgress) => set({ assetProgress }),
  setHoverTarget: (hoverTarget) => set({ hoverTarget }),
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
}));
