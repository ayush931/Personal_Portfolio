"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { MathUtils } from "three";
import { useExperienceStore } from "@/store/experience-store";

export function CameraRig() {
  const scroll = useScroll();
  const setActiveSection = useExperienceStore((state) => state.setActiveSection);

  useFrame((state) => {
    // Current scroll offset from 0 to 1
    const offset = scroll.offset || 0;

    // Determine active section string based on scroll offset
    if (offset < 0.25) {
      setActiveSection("initialization");
    } else if (offset < 0.55) {
      setActiveSection("experience");
    } else if (offset < 0.82) {
      setActiveSection("projects");
    } else {
      setActiveSection("skills");
    }

    // Dynamic Camera position interpolations based on scroll progress
    // Page 0 (Hero): [0, 0, 6]
    // Page 1 (Experience): [-1.5, 0.5, 5.2]
    // Page 2 (Projects): [1.6, -0.4, 4.8]
    // Page 3 (Arsenal): [0, 0.6, 6.2]

    let targetX = 0;
    let targetY = 0;
    let targetZ = 6;

    if (offset < 0.33) {
      const t = offset / 0.33;
      targetX = MathUtils.lerp(0, -1.5, t);
      targetY = MathUtils.lerp(0, 0.5, t);
      targetZ = MathUtils.lerp(6, 5.2, t);
    } else if (offset < 0.66) {
      const t = (offset - 0.33) / 0.33;
      targetX = MathUtils.lerp(-1.5, 1.6, t);
      targetY = MathUtils.lerp(0.5, -0.4, t);
      targetZ = MathUtils.lerp(5.2, 4.8, t);
    } else {
      const t = (offset - 0.66) / 0.34;
      targetX = MathUtils.lerp(1.6, 0, t);
      targetY = MathUtils.lerp(-0.4, 0.6, t);
      targetZ = MathUtils.lerp(4.8, 6.2, t);
    }

    // Lerp camera position towards calculated target
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, 0.08);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
