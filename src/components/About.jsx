"use client";

import React, { useSyncExternalStore } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';
import SkillMatrix from './SkillMatrix';

const emptySubscribe = () => () => { };

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
              className="group relative bg-[#0a1219]/90 backdrop-blur-2xl p-8 md:p-12 border border-[#FF4655]/20 shadow-[0_6px_22px_-4px_rgba(255,70,85,0.07)] hover:border-[#FF4655]/45 hover:shadow-[0_15px_35px_-5px_rgba(255,70,85,0.16)] transition-all duration-700 overflow-hidden"
            >
              {/* Tactical Corner Reticles */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FF4655]/70 pointer-events-none z-20" />
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FF4655]/70 pointer-events-none z-20" />
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF4655]/70 pointer-events-none z-20" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF4655]/70 pointer-events-none z-20" />

              {/* Header Telemetry Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5 relative z-20">
                <div className="flex items-center gap-4">
                  <span className="text-[#FF4655] font-mono text-2xl font-bold animate-pulse">{'>'}</span>
                  <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-[0.2em] text-white italic">
                    <DecryptedText text="ABOUT ME" speed={40} maxIterations={2} />
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse shadow-[0_0_8px_#39FF14]" />
                  <span className="font-mono text-[10px] tracking-[0.25em] px-3 py-1 border border-[#00E5FF]/30 text-[#00E5FF] bg-[#00E5FF]/5 uppercase">
                    STATUS: OPERATIONAL
                  </span>
                </div>
              </div>

              {/* Two-Column Split Dossier Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20 items-stretch">

                {/* Left Column: Narrative Mission Statement (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between border-l-2 border-[#FF4655]/80 pl-6 py-2 bg-gradient-to-r from-white/[0.02] to-transparent">
                  <div>
                    <span className="text-[#FF4655] font-mono text-xs tracking-[0.35em] uppercase block mb-4 opacity-80">
                      // OPERATOR_BRIEFING
                    </span>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-mono tracking-wide mb-6">
                      As a <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Full-Stack Developer & AI Engineer</span>, I architect web platforms that combine high-availability engineering with intelligent agentic systems.
                    </p>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-mono tracking-wide">
                      Backed by a Master of Computer Science from <span className="text-[#F59E0B] font-semibold">Illinois Tech</span>, I bridge production web software (<span className="text-[#00E5FF]">React, Next.js, Node.js</span>) with autonomous LLM workflows and deterministic execution (<span className="text-[#39FF14]">Python, Gemini API, Pytest</span>).
                    </p>
                  </div>

                  {/* Telemetry Footer Tags */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono text-gray-500 tracking-wider">
                    <span>LOC: HYDERABAD, INDIA</span>
                    <span className="text-gray-700">&bull;</span>
                    <span>ALUM: IIT CHICAGO &apos;25</span>
                    <span className="text-gray-700">&bull;</span>
                    <span className="text-[#39FF14]">AVAILABILITY: OPEN FOR ROLES</span>
                  </div>
                </div>

                {/* Right Column: 3 Precision HUD Intel Strips (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-center">

                  {/* Intel Node 01 */}
                  <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/5 transition-all duration-300 group/node">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#00E5FF] uppercase">
                        // 01_SPECIALIZATION
                      </span>
                      <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full opacity-60 group-hover/node:opacity-100" />
                    </div>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-0.5">
                      Full-Stack & Applied AI
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      React &bull; Next.js &bull; Node.js &bull; Python
                    </p>
                  </div>

                  {/* Intel Node 02 */}
                  <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/5 transition-all duration-300 group/node">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase">
                        // 02_CREDENTIALS
                      </span>
                      <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full opacity-60 group-hover/node:opacity-100" />
                    </div>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-0.5">
                      M.S. Computer Science
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      Illinois Tech (Chicago) // Alum 2025
                    </p>
                  </div>

                  {/* Intel Node 03 */}
                  <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all duration-300 group/node">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#39FF14] uppercase">
                        // 03_DIRECTIVE
                      </span>
                      <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full opacity-60 group-hover/node:opacity-100" />
                    </div>
                    <h4 className="text-white font-mono text-sm font-bold tracking-wider uppercase mb-0.5">
                      Production & Multi-Agent
                    </h4>
                    <p className="text-gray-400 font-mono text-xs tracking-wide">
                      Autonomous LLMs &bull; Scalable APIs
                    </p>
                  </div>

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