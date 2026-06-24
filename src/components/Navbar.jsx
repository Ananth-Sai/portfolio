"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic'; 

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // REORDERED: Matches the natural scroll flow of the dossier
  const navLinks = [
    { name: 'ABOUT', id: 'about', prefix: '01' },
    { name: 'EXPERIENCE', id: 'experience', prefix: '02' },
    { name: 'PROJECTS', id: 'projects', prefix: '03' },
    { name: 'EDUCATION', id: 'education', prefix: '04' },
    { name: 'CONTACT', id: 'contact', prefix: '05' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // detect which section is currently centered in the "sensor" (viewport)
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-[#0F1923]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
        : 'py-8 bg-transparent border-b border-transparent'
    }`}>
      <div className="mx-auto flex max-w-[120rem] items-center justify-between px-10">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-2 h-2 bg-[#FF4655] rotate-45 animate-pulse shadow-[0_0_10px_rgba(255,70,85,0.8)]" />
          <span className="text-white font-mono font-bold tracking-[0.4em] text-sm uppercase">
            SYS_NAV <span className="text-[#FF4655] opacity-50">/</span> Ananth
          </span>
        </Link>

        {/* NAV LINKS: Sequential Order Fix */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <Magnetic key={link.id}>
                <Link 
                  href={`#${link.id}`}
                  className="group relative flex items-center gap-3 py-2"
                >
                  <span className="font-mono text-[10px] text-gray-600 group-hover:text-[#FF4655] transition-colors">
                    {link.prefix}
                  </span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-diamond"
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 45 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute -left-4 w-1.5 h-1.5 bg-[#FF4655] shadow-[0_0_10px_rgba(255,70,85,0.8)]"
                      />
                    )}
                  </AnimatePresence>

                  <span className={`font-mono text-sm tracking-[0.2em] transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                </Link>
              </Magnetic>
            );
          })}

          {/* TERMINAL ACCESS */}
          <div className="group/term relative ml-6">
            <Magnetic>
              <button 
                onClick={handleOpenTerminal}
                className="relative flex items-center gap-4 border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2.5 hover:border-[#FF4655]/50 hover:bg-[#FF4655]/10 transition-all duration-500 overflow-hidden"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-gray-400 group-hover/term:text-white transition-colors uppercase">
                  Terminal: Online
                </span>
                
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 group-hover/term:border-[#FF4655]"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 group-hover/term:border-[#FF4655]"></div>
              </button>
            </Magnetic>

            {/* Tactical Shortcut Hint */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/term:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/term:translate-y-0">
              <div className="bg-[#FF4655] text-white text-[9px] px-3 py-1 font-mono tracking-[0.2em] shadow-[0_0_15px_rgba(255,70,85,0.4)]">
                UPLINK: [CTRL+K]
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}