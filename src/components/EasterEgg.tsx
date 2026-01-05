'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg() {
  const [sequence, setSequence] = useState('');
  const [showAce, setShowAce] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const newSeq = (sequence + e.key.toLowerCase()).slice(-5);
      setSequence(newSeq);
      
      if (newSeq === 'hired') {
        setShowAce(true);
        setTimeout(() => setShowAce(false), 4000); // Slightly longer for impact
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sequence]);

  return (
    <AnimatePresence>
      {showAce && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300000] flex items-center justify-center pointer-events-none bg-black/70 backdrop-blur-md"
        >
          {/* ADJUST THE HEX COLOR BELOW (#BD3944) */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-64 bg-[#802730] relative flex items-center justify-center border-y-2 border-white/20 shadow-[0_0_100px_rgba(189,57,68,0.5)]"
          >
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-1/2 via-white/30 bg-gradient-to-r from-transparent  to-transparent pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center z-10"
            >
              <span className="text-sm font-mono tracking-[1.2em] mb-4 text-white/80 uppercase">
                AGENT_UPLINK_ESTABLISHED
              </span>
              
              <h1 className="italic font-black text-9xl tracking-[0.1em] uppercase skew-x-[-12deg] leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                HIRED!
              </h1>

              <div className="flex gap-3 mt-6">
                <div className="w-1.5 h-1.5 bg-white/20" />
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="w-1.5 h-1.5 bg-white/20" />
              </div>
            </motion.div>

            <div className="absolute left-20 top-1/2 -translate-y-1/2 hidden xl:block opacity-40">
              <div className="w-32 h-[1px] bg-white mb-3" />
              <div className="w-16 h-[1px] bg-white" />
            </div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:block opacity-40">
              <div className="w-32 h-[1px] bg-white mb-3 ml-auto" />
              <div className="w-16 h-[1px] bg-white ml-auto" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}