'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  "INITIALIZING_UPLINK",
  "FETCHING_IIT_CREDENTIALS",
  "SYNCING_PROJECT_DATABASE",
  "DECRYPTING_BIO_DATA",
  "STABILIZING_INTERFACE"
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100000] bg-[#0F1923] flex flex-col items-center justify-center cursor-none"
    >
      <div className="absolute inset-0 tactical-grid opacity-10 pointer-events-none" />

      {/* 1. Increased width to w-[500px] and max-w-full */}
      <div className="relative w-full max-w-2xl px-10">
        
        {/* Header - Increased text size to text-sm */}
        <div className="flex justify-between mb-4 font-mono text-sm tracking-[0.4em] text-[#FF4655]">
          <AnimatePresence mode="wait">
            <motion.span
              key={STATUS_MESSAGES[messageIndex]}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-bold"
            >
              {STATUS_MESSAGES[messageIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="tabular-nums font-bold">{progress}%</span>
        </div>

        {/* 2. Thickened the Progress Bar to h-[4px] */}
        <div className="h-[4px] w-full bg-gray-800 relative overflow-hidden">
          <motion.div 
            className="h-full bg-[#FF4655] shadow-[0_0_20px_#FF4655]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
          />
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>

        {/* 3. Status Text - Increased to text-lg and bolder tracking */}
        <div className="mt-10 flex flex-col items-center">
          <p className="text-white text-lg font-black uppercase tracking-[0.6em] animate-pulse">
            System Initializing
          </p>
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="w-2 h-2 bg-[#FF4655]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Corner Accents - Made larger and thicker */}
      <div className="absolute top-16 left-16 w-16 h-16 border-t-2 border-l-2 border-[#FF4655]/40" />
      <div className="absolute bottom-16 right-16 w-16 h-16 border-b-2 border-r-2 border-[#FF4655]/40" />
    </motion.div>
  );
}