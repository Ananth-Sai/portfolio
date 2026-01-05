'use client';

import { useEffect } from 'react';

export default function GlobalEffects() {
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Emergency Reset on Escape
      if (e.key === 'Escape') {
        if (typeof document !== 'undefined') {
          const body = document.body;
          
          // Only trigger if the glitch is actually active to avoid spamming the feed
          if (body.classList.contains('system-glitch')) {
            body.classList.remove('system-glitch');
            
            // 1. Dispatch event to close the Command Palette console
            window.dispatchEvent(new CustomEvent('close-palette'));

            // 2. Dispatch event to the Kill-Feed notification system
            window.dispatchEvent(new CustomEvent('kill-feed-notify', { 
              detail: { 
                message: "SYSTEM_STABILIZED", 
                type: "system" 
              } 
            }));

            console.log("GLOBAL_RESET: SYSTEM_STABILIZED");
          } else {
            // Even if not glitched, ESC should still close the palette
            window.dispatchEvent(new CustomEvent('close-palette'));
          }
        }
      }
    };

    // 'true' uses the capture phase to ensure this runs before any 
    // nested component can call e.stopPropagation()
    window.addEventListener('keydown', handleGlobalKeyDown, true); 
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, []);

  return null; 
}