'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%"; // Changed to allow fit-content
  delay?: number;
}

export const Reveal = ({ children, width = "100%", delay = 0.2 }: Props) => {
  return (
    <div style={{ position: "relative", width, overflow: "visible" }}> 
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }} // Reduced amount to 0.1 for faster triggering
        transition={{ 
          duration: 0.6, 
          delay: delay, 
          ease: [0.17, 0.67, 0.83, 0.67] // Custom "cubic-bezier" for a smoother tactical feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};