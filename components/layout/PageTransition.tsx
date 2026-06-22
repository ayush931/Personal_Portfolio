'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Top YouTube-like progress bar */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '70%' }}
            exit={{ width: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 z-[9999] shadow-[0_0_8px_rgba(59,130,246,0.8)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default PageTransition;
