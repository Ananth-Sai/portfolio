"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dispatches the event that CommandPalette.tsx is listening for
  const handleOpenTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  const navLinks = ['EXPERIENCE', 'PROJECTS', 'EDUCATION', 'ABOUT', 'CONTACT'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0F1923]/90 backdrop-blur-md border-b border-[#FF4655]/30 shadow-[0_4px_30px_rgba(255,70,85,0.15)]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* LOGO AREA: System Alias */}
        <Link href="/" data-interactive="true" className="flex items-center gap-3 group">
          <div className="w-2 h-2 bg-[#FF4655] animate-pulse group-hover:bg-white transition-colors"></div>
          <span className="text-white font-mono font-bold tracking-[0.3em] text-base md:text-base transition-colors">
            SYS_NAV <span className="text-[#FF4655] opacity-50 group-hover:opacity-100 transition-opacity">/</span> Ananth
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <Link 
              key={i} 
              href={`#${item.toLowerCase()}`}
              className="group relative font-mono text-lg tracking-[0.2em] text-gray-400 hover:text-white transition-colors py-2"
              data-interactive="true"
            >
              {/* Target Brackets that snap in on hover */}
              <span className="text-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -left-3 group-hover:-left-4">{'['}</span>
              {item}
              <span className="text-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -right-3 group-hover:-right-4">{']'}</span>
            </Link>
          ))}

          {/* TERMINAL BUTTON WITH SHORTCUT HINT */}
          <div className="group/term relative ml-4">
            <button 
              data-interactive="true"
              onClick={handleOpenTerminal}
              className="relative flex items-center gap-3 border border-[#FF4655] bg-[#FF4655]/5 px-6 py-2 hover:bg-[#FF4655] hover:shadow-[0_0_20px_rgba(255,70,85,0.4)] transition-all duration-300 overflow-hidden"
            >
              <div className="w-2 h-2 rounded-sm bg-[#FF4655] group-hover/term:bg-white group-hover/term:animate-pulse transition-colors"></div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF4655] group-hover/term:text-white transition-colors uppercase">
                Terminal
              </span>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF4655] group-hover/term:border-white transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#FF4655] group-hover/term:border-white transition-colors"></div>
            </button>

            {/* Tactical Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover/term:scale-100 transition-transform duration-200 pointer-events-none">
              <div className="bg-[#FF4655] text-white text-[10px] px-2 py-1 font-mono tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(255,70,85,0.4)]">
                UPLINK: [CTRL+K]
              </div>
              {/* Tooltip Arrow */}
              <div className="w-2 h-2 bg-[#FF4655] rotate-45 mx-auto -mt-1" />
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}