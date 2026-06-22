'use client';

import React, { useRef, useState } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  maxTilt = 8,
  scale = 1.02,
  className = '',
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse position relative to the card's dimensions
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates around the card center (between -0.5 and 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Calculate rotation angles
    // Y-mouse movement changes X-rotation; X-mouse movement changes Y-rotation
    const rotateX = -(normalizedY * maxTilt).toFixed(2);
    const rotateY = (normalizedX * maxTilt).toFixed(2);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform(0.1s) transform 0.08s ease-out, box-shadow 0.3s ease', // Quick, responsive follow
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`preserve-3d ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
