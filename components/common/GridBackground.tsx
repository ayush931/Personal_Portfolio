"use client";

import { useCallback, useEffect, useRef } from "react";

export function GridBackground() {
  const cursor = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: PointerEvent) => {
    cursor.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    cursor.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    let raf: number;

    const tick = () => {
      smooth.current.x += (cursor.current.x - smooth.current.x) * 0.035;
      smooth.current.y += (cursor.current.y - smooth.current.y) * 0.035;
      const ox = 50 + smooth.current.x * 12;
      const oy = 50 + smooth.current.y * 12;
      document.querySelectorAll<HTMLElement>(".blueprint-grid").forEach((el) => {
        el.style.backgroundPosition = `${ox}% ${oy}%`;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [onPointerMove]);

  return null;
}
