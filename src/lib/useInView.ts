import { useEffect, useRef, useState } from "react";

/**
 * Hook that returns a ref to attach to an element and a boolean `visible`
 * indicating whether the element is in the viewport (threshold 0.2 by default).
 * Elements using this hook can apply the `.fade-in` class and set
 * `data-visible={visible}` to trigger the CSS transition.
 */
export const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible } as const;
};
