"use client";

import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "../components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";
import GlobalEffects from "@/components/GlobalEffects";
import KillFeed from "@/components/KillFeed";
import GlobalBackground from "@/components/GlobalBackground"; // NEW COMPONENT

const bebas = Bebas_Neue({ 
  weight: '400', 
  subsets: ["latin"] 
});

export default function RootLayout({ children }: { children: ReactNode }) {
  
  useEffect(() => {
    // Initialize Lenis for smooth "liquid" scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      {/* FIXED: Added 'global-grain' to body for cinematic texture */}
      <body className={`${bebas.className} bg-[#0F1923] text-white cursor-none selection:bg-[#FF4655] selection:text-white overflow-x-hidden w-full relative global-grain`}>
        
        {/* NEW: Global Atmosphere Layer (Fixed Gradients) */}
        <GlobalBackground /> 
        
        <GlobalEffects />
        <CustomCursor />
        <KillFeed /> 
        <CommandPalette />
        <EasterEgg />
        
        {/* The "Main Screen" where content sits above the atmosphere */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}