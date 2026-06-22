'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { gsap } from '@/lib/gsap';

interface StatCounterProps {
  value: string; // e.g. "3", "1,000+", "6"
  label: string;  // e.g. "Companies Shipped"
  duration?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, duration = 2.5 }) => {
  const [displayVal, setDisplayVal] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      // Find numeric portion
      const numericString = value.replace(/[^0-9]/g, '');
      const numericVal = parseInt(numericString, 10) || 0;
      const suffix = value.replace(/[0-9,]/g, '');
      const hasCommas = value.includes(',');

      const target = { val: 0 };
      gsap.to(target, {
        val: numericVal,
        duration: duration,
        ease: 'power3.out',
        onUpdate: () => {
          const rounded = Math.floor(target.val);
          const formatted = hasCommas ? rounded.toLocaleString() : rounded.toString();
          setDisplayVal(`${formatted}${suffix}`);
        },
      });
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center flex-1 py-4 text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-text-primary">
        {displayVal}
      </div>
      <div className="text-[10px] md:text-xs font-mono text-text-tertiary uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};
export default StatCounter;
