import { useEffect, useRef, useState } from "react";

/**
 * Hook that returns an approximate vertical scroll velocity (pixels per second).
 * It works without Lenis – just uses window.scrollY and requestAnimationFrame.
 */
export const useScrollVelocity = (): number => {
  const [velocity, setVelocity] = useState(0);
  const lastY = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const update = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY.current;
      const dt = now - lastTime.current;
      const v = dt > 0 ? (dy / dt) * 1000 : 0; // px/sec
      setVelocity(v);
      lastY.current = window.scrollY;
      lastTime.current = now;
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    // No cleanup needed; the loop ends when page unloads.
  }, []);

  return velocity;
};
