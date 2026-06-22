'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor } from './useCursor';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText, projectColor } = useCursor();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [inHero, setInHero] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  const nextDotId = useRef(0);
  const nextRippleId = useRef(0);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Check if pointer is fine
    const checkDevice = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isCoarse);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      // Magnetic pull check
      const hoveredEl = document.elementFromPoint(x, y);
      const magneticEl = hoveredEl?.closest('.magnetic-pull') as HTMLElement;
      
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(x - centerX, y - centerY);
        if (dist < 80) {
          // Pull ring towards center
          x = x + (centerX - x) * 0.45;
          y = y + (centerY - y) * 0.45;
        }
      }

      mouseX.set(x);
      mouseY.set(y);

      // Check if mouse is in hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
        setInHero(isInHero);

        if (isInHero) {
          const now = Date.now();
          if (now - lastTrailTime.current > 40) {
            setTrail((prev) => [
              ...prev.slice(-9),
              { id: nextDotId.current++, x: e.clientX, y: e.clientY }
            ]);
            lastTrailTime.current = now;
          }
        }
      } else {
        setInHero(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      setRipples((prev) => [
        ...prev,
        { id: nextRippleId.current++, x: e.clientX, y: e.clientY }
      ]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Trail cleanup interval
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 80);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  // Remove ripples after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  if (isTouchDevice) return null;

  // Render cursor states
  const getRingVariants = () => {
    switch (cursorType) {
      case 'hover':
        return {
          width: 56,
          height: 56,
          backgroundColor: 'var(--accent-subtle)',
          borderColor: 'var(--accent-glow)',
          borderRadius: '50%'
        };
      case 'text':
        return {
          width: 4,
          height: 24,
          backgroundColor: 'var(--accent-primary)',
          borderColor: 'var(--accent-primary)',
          borderRadius: '2px'
        };
      case 'project':
        return {
          width: 60,
          height: 60,
          backgroundColor: projectColor || 'var(--accent-subtle)',
          borderColor: projectColor || 'var(--accent-glow)',
          borderRadius: '50%'
        };
      default:
        return {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: 'var(--accent-primary)',
          borderRadius: '50%'
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Hero Trail */}
      <AnimatePresence>
        {inHero &&
          trail.map((dot, idx) => (
            <motion.div
              key={dot.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none bg-accent-primary"
              style={{
                left: dot.x - 4,
                top: dot.y - 4,
              }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
      </AnimatePresence>

      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border border-accent-primary pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
          animate={{
            width: 80,
            height: 80,
            x: -40,
            y: -40,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Cursor Ring */}
      <motion.div
        className="absolute border-[1.5px] pointer-events-none flex items-center justify-center text-[9px] font-mono font-bold text-accent-glow select-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          left: 0,
          top: 0,
        }}
        animate={{
          ...getRingVariants(),
          scale: isClicked ? 0.7 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
      >
        {cursorType === 'hover' && cursorText && (
          <span className="animate-fade-in">{cursorText}</span>
        )}
      </motion.div>

      {/* Cursor Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent-primary pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          left: 0,
          top: 0,
        }}
        animate={{
          scale: cursorType === 'hover' || cursorType === 'text' || cursorType === 'project' ? 0 : isClicked ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  );
};
export default CustomCursor;
