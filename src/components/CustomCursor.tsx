'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy gaming-grade physics
  const springConfig = { damping: 20, stiffness: 800, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const hovered = !!target.closest('[data-interactive="true"]') || 
                      !!target.closest('button') || 
                      !!target.closest('a');
      
      setIsHovered(hovered);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center"
      style={{ 
        x: smoothX, 
        y: smoothY, 
        translateX: '-50%', 
        translateY: '-50%',
      }}
    >
      <motion.div 
        animate={{ 
          rotate: isHovered ? 45 : 0,
          scale: isClicked ? 0.8 : (isHovered ? 1.4 : 1) 
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="relative flex items-center justify-center"
      >
        {/* Horizontal Line - Collapses inward on click */}
        <motion.div 
          animate={{ width: isClicked ? 4 : (isHovered ? 24 : 16) }}
          className={`absolute h-[2px] ${isHovered ? 'bg-white' : 'bg-[#FF4655]'} transition-colors duration-200`} 
        />
        
        {/* Vertical Line - Collapses inward on click */}
        <motion.div 
          animate={{ height: isClicked ? 4 : (isHovered ? 24 : 16) }}
          className={`absolute w-[2px] ${isHovered ? 'bg-white' : 'bg-[#FF4655]'} transition-colors duration-200`} 
        />
        
        {/* Center Dot */}
        <div className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />

        {/* Tactical Ping Ring on Hover */}
        {isHovered && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute w-6 h-6 border border-white rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}