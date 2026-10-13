"use client";

import React, { useSyncExternalStore } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';
import SkillMatrix from './SkillMatrix';

const emptySubscribe = () => () => {};

// --- UPDATED: Added skillSectors as a prop ---
export default function About({ skillSectors }) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isMounted) {
    return (
      <section id="about" className="relative z-10 w-full pt-10 pb-24 px-6 flex flex-col border-t border-gray-800 bg-[#0F1923]">
        <div className="max-w-6xl w-full opacity-0" />
      </section>
    );
  }

  return (
    <section id="about" className="relative z-10 w-full pt-10 pb-24 px-6 flex flex-col border-t border-gray-800 bg-[#0F1923]">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-12">

        {/* BIO SECTION */}
        <Reveal width="100%">
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.01}
            className="w-full"
          >
            <div
              data-interactive="true"
              className="group relative bg-[#15202B] p-10 md:p-14 border border-gray-800 shadow-2xl overflow-hidden transition-all duration-500 hover:border-[#FF4655]/40"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF4655] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF4655] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF4655] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF4655] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10"></div>

              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>

              <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-widest text-white mb-10 text-center italic flex justify-center items-center gap-4">
                <span className="text-[#FF4655]">{'>'}</span>
                <DecryptedText text="ABOUT ME" speed={40} maxIterations={2} />
              </h2>

              <div className="relative z-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-8 border-b border-gray-800 pb-4">
                  <span className="text-[#FF4655] font-mono text-xs tracking-[0.4em] uppercase opacity-75">
                    {"// SUBJECT_BIO_DATA_EXTRACTED"}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                    [ STATUS: OPERATIONAL ]
                  </span>
                </div>

                {/* TACTICAL INTEL NODES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0F1923]/80 border border-gray-800 p-5 transition-all duration-300 hover:border-[#FF4655]/40 hover:shadow-[0_0_15px_rgba(255,70,85,0.1)]">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF4655] uppercase block mb-2">
                      // 01_SPECIALIZATION
                    </span>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-1">
                      Full-Stack & AI
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      React &bull; Next.js &bull; Node.js &bull; Python
                    </p>
                  </div>

                  <div className="bg-[#0F1923]/80 border border-gray-800 p-5 transition-all duration-300 hover:border-[#F59E0B]/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#F59E0B] uppercase block mb-2">
                      // 02_CREDENTIALS
                    </span>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-1">
                      M.S. Computer Science
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      Illinois Tech (Chicago) // Alum 2025
                    </p>
                  </div>

                  <div className="bg-[#0F1923]/80 border border-gray-800 p-5 transition-all duration-300 hover:border-[#39FF14]/40 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#39FF14] uppercase block mb-2">
                      // 03_DIRECTIVE
                    </span>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-1">
                      Production & Multi-Agent
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      Autonomous LLMs &bull; Scalable APIs
                    </p>
                  </div>
                </div>

                {/* NARRATIVE STATEMENT */}
                <div className="bg-[#0F1923]/40 border-l-2 border-[#FF4655] p-5">
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed font-mono tracking-wide">
                    As a <span className="text-white font-bold">Full-Stack Developer & AI Engineer</span>, I engineer scalable web platforms and intelligent developer tooling. Backed by an M.S. from Illinois Tech, I bridge core software architecture (<span className="text-[#00E5FF] font-semibold">React, Next.js, Node.js</span>) with autonomous agentic systems and deterministic orchestration (<span className="text-[#39FF14] font-semibold">Python, Gemini API, Multi-Agent Loops</span>).
                  </p>
                </div>
              </div>
            </div>
          </Tilt>
        </Reveal>

        {/* SKILL MATRIX SECTION */}
        <Reveal width="100%" delay={0.2}>
          <div className="w-full">
            <SkillMatrix skillData={skillSectors} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}