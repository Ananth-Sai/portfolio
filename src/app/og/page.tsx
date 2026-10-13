"use client";

import React from "react";
import { Linkedin, Github } from "lucide-react";

export default function OGCard() {
  return (
    <div id="og-card" className="w-screen h-screen bg-[#0F1923] text-white relative overflow-hidden flex flex-col justify-between p-6 select-none border-2 border-[#FF4655]/40 box-border">
      <style>{`
        nextjs-portal, [data-nextjs-toast-wrapper], #__next-build-watcher { display: none !important; }
      `}</style>

      {/* Ambient Radial Lighting matching website GlobalBackground */}
      <div
        className="absolute top-[-80px] left-[15%] w-[550px] h-[400px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{ background: "radial-gradient(circle, #FF4655 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-80px] right-[15%] w-[550px] h-[400px] rounded-full pointer-events-none blur-[140px] opacity-20"
        style={{ background: "radial-gradient(circle, #00E5FF 0%, transparent 70%)" }}
      />

      {/* Outer Tactical Reticles */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#FF4655]" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#FF4655]/60" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#FF4655]/60" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#FF4655]" />

      {/* TOP HEADER BAR (Matching website Navbar) */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#FF4655] rotate-45 shadow-[0_0_8px_#FF4655]" />
          <span className="font-mono text-sm tracking-[0.35em] text-white uppercase font-bold">
            SYS_NAV <span className="text-[#FF4655] font-light">/</span> ANANTHA SAI VALLURU
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gray-400 uppercase">
          <span className="text-[#FF4655]">●</span>
          <span>PORTFOLIO DOSSIER // V2026</span>
        </div>

        <div className="flex items-center gap-3 bg-[#0a1219]/90 border border-white/10 px-3.5 py-1 rounded-none shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse shadow-[0_0_8px_#39FF14]" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-gray-300 uppercase">
            TERMINAL: ONLINE
          </span>
          <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 bg-white/10 text-[#39FF14] border border-[#39FF14]/30">
            CTRL+K
          </span>
        </div>
      </div>

      {/* TOP TELEMETRY STRIPS */}
      <div className="relative z-10 flex justify-between items-center text-[11px] font-mono tracking-[0.3em] uppercase text-gray-400">
        <div className="flex items-center gap-3 text-[#FF4655]/80">
          <div className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
          <span>SYS_STATUS: ONLINE</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">UPLINK: SECURE_AES_256</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-[#00E5FF] font-semibold">[ ALUM: ILLINOIS TECH ]</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300">LOC: CHICAGO // HYDERABAD</span>
        </div>
      </div>

      {/* CENTER HERO DOSSIER */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-1">
        <h1 className="text-5xl lg:text-[54px] font-semibold uppercase tracking-[0.08em] text-white italic leading-tight flex items-center justify-center gap-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <span className="text-[#FF4655] animate-pulse">{">"}</span>
          <span>ANANTHA SAI VALLURU</span>
        </h1>

        <div className="mt-2 text-xl tracking-[0.35em] text-[#FF4655] font-mono uppercase font-medium flex items-center gap-3">
          <span>FULL-STACK DEVELOPER</span>
          <span className="text-white/40">//</span>
          <span className="text-[#00E5FF]">AI ENGINEER</span>
        </div>

        {/* HUD CHIPS / CREDENTIALS (Identical to About & Entry Dossier) */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0a1219]/90 border border-[#B026FF]/40 shadow-[0_0_12px_rgba(176,38,255,0.15)] font-mono text-[11px] tracking-[0.2em] uppercase text-[#B026FF]">
            <span>◆ M.S. COMPUTER SCIENCE</span>
            <span className="text-gray-500">•</span>
            <span className="text-white font-semibold">ILLINOIS TECH</span>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0a1219]/90 border border-[#00E5FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.15)] font-mono text-[11px] tracking-[0.2em] uppercase text-[#00E5FF]">
            <span>✦ STACK:</span>
            <span className="text-white font-semibold">REACT • NEXT.JS • PYTHON • LLMs</span>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0a1219]/90 border border-[#39FF14]/40 shadow-[0_0_12px_rgba(57,255,20,0.15)] font-mono text-[11px] tracking-[0.2em] uppercase text-[#39FF14]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span>AI QUERY OPERATOR LIVE</span>
          </div>
        </div>

        {/* TACTICAL ACTION PILLS */}
        <div className="mt-4 flex justify-center gap-4">
          <div className="relative flex items-center gap-2.5 bg-[#0a1219]/80 text-gray-200 border border-[#FF4655]/40 px-5 py-1.5 text-[11px] font-mono tracking-[0.25em] uppercase">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF4655]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#FF4655]" />
            <Linkedin size={13} className="text-[#FF4655]" />
            <span>[ LINKEDIN ]</span>
          </div>

          <div className="relative flex items-center gap-2.5 bg-[#0a1219]/80 text-gray-200 border border-[#FF4655]/40 px-5 py-1.5 text-[11px] font-mono tracking-[0.25em] uppercase">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF4655]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#FF4655]" />
            <Github size={13} className="text-[#FF4655]" />
            <span>[ GITHUB ]</span>
          </div>
        </div>
      </div>

      {/* FOOTER BAR (Matching website baseline footer) */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[11px] text-gray-400 tracking-[0.25em] uppercase">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
          <span>PRODUCTION DEPLOYMENT // VERCEL EDGE</span>
        </div>
        <div className="text-white font-bold tracking-[0.3em]">
          ASV-DEV.VERCEL.APP
        </div>
        <div className="text-gray-500">
          &copy; 2026 ASV. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}
