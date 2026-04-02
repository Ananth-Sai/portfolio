"use client";

import React from 'react';
import { FileDown, Linkedin, Github, Crosshair } from 'lucide-react';
import Magnetic from "@/components/Magnetic";
import DecryptedText from "@/components/DecryptedText";
import TextReveal from "@/components/TextReveal";
import TypewriterWrapper from "@/components/TypewriterWrapper";

export default function EntryDossier() {
  return (
    <section 
      id="entry-point" 
      className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 pt-20 border-b border-gray-800 overflow-hidden bg-transparent"
    >
      <div className="absolute top-40 left-10 hidden xl:flex flex-col gap-2 text-[#FF4655] font-mono text-[10px] tracking-[0.3em] opacity-40">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-[#FF4655] animate-pulse" />
          <TextReveal delay={0.5}>SYS_STATUS: ONLINE</TextReveal>
        </div>
        <TextReveal delay={0.6}>UPLINK: SECURE_AES_256</TextReveal>
      </div>
      
      <div className="absolute bottom-40 right-10 hidden xl:flex flex-col gap-2 text-gray-500 font-mono text-[10px] tracking-[0.3em] opacity-40 text-right">
        <TextReveal delay={0.8}>USER_ID: DEKU_0382</TextReveal>
        <div className="flex items-center justify-end gap-2 text-[#FF4655]">
           <TextReveal delay={0.9}>LOC: 43.1009° N, 75.2327° W</TextReveal>
           <Crosshair size={10} className="animate-spin-slow" />
        </div>
      </div>

      <div className="relative z-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium uppercase tracking-[0.1em] text-white leading-tight flex flex-wrap items-center justify-center gap-4 italic mb-2">
          <span className="text-[#FF4655] animate-pulse mr-2">{'>'}</span> 
          <DecryptedText text="ANANTHA SAI VALLURU" speed={30} maxIterations={3} />
        </h1>
        
        <div className="mt-4 text-xl md:text-2xl tracking-[0.4em] text-[#FF4655] font-mono uppercase opacity-80">
          <TypewriterWrapper />
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <Magnetic>
            <a href="/resume.pdf" className="group relative flex items-center gap-4 bg-[#15202B]/40 backdrop-blur-md text-gray-300 border border-white/5 px-8 py-5 text-xs tracking-[0.3em] transition-all duration-500 hover:border-[#FF4655] hover:text-white">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF4655] opacity-50 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF4655] opacity-50 group-hover:opacity-100" />
              <FileDown size={16} className="text-[#FF4655]" />
              <span className="font-mono">[ EXTRACT_DOSSIER ]</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a href="https://linkedin.com/in/ananth-valluru" target="_blank" className="group relative flex items-center gap-4 bg-[#15202B]/40 backdrop-blur-md text-gray-300 border border-white/5 px-8 py-5 text-xs tracking-[0.3em] transition-all duration-500 hover:border-[#FF4655] hover:text-white">
              <Linkedin size={16} className="text-[#FF4655]" />
              <span className="font-mono">[ INITIATE_NETWORK ]</span>
            </a>
          </Magnetic>

          <Magnetic>
            <a href="https://github.com/Ananth-Sai" target="_blank" className="group relative flex items-center gap-4 bg-[#15202B]/40 backdrop-blur-md text-gray-300 border border-white/5 px-8 py-5 text-xs tracking-[0.3em] transition-all duration-500 hover:border-[#FF4655] hover:text-white">
              <Github size={16} className="text-[#FF4655]" />
              <span className="font-mono">[ ACCESS_SOURCE_CODE ]</span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-[#FF4655] animate-pulse">Initialize_Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF4655] to-transparent"></div>
      </div>
    </section>
  );
}