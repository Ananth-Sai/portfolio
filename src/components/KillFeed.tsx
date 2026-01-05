'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function KillFeed() {
  const [notifications, setNotifications] = useState<{id: number, text: string, type: string}[]>([]);

  useEffect(() => {
    const handleNotify = (e: any) => {
      const { message, type } = e.detail;
      const newNotify = {
        id: Date.now(),
        text: message,
        type: type || 'system'
      };

      setNotifications(prev => [...prev, newNotify]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotify.id));
      }, 5000);
    };

    window.addEventListener('kill-feed-notify', handleNotify);
    return () => window.removeEventListener('kill-feed-notify', handleNotify);
  }, []);

  return (
    <div className="fixed top-10 right-10 z-[500000] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            /* Increased padding, font size, and added a red shadow glow */
            className="bg-[#FF4655] text-white px-10 py-5 border-l-[6px] border-white font-bold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(255,70,85,0.4)] flex items-center gap-5 min-w-[400px]">
            <span className="text-sm opacity-60 font-mono border-r border-white/30 pr-5">
              {n.type === 'system' ? 'STATUS_REPORT' : 'UPLINK_STATUS'}
            </span>
            {/* Larger font for the main message */}
            <span className="text-2xl md:text-3xl">
              {n.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}