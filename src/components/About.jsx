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
                <span className="text-[#FF4655] font-mono text-sm tracking-[0.4em] block mb-6 opacity-60 italic">
                  {"// SUBJECT_BIO_DATA_EXTRACTED"}
                </span>

                <p className="text-lg md:text-xl text-gray-400 leading-loose tracking-[0.1em] text-justify font-mono uppercase">
                  As a <span className="text-[#FF4655] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(255,70,85,0.5)]">Full-Stack Developer</span> with a <span className="text-[#F59E0B] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">Master’s from Illinois Tech</span>, I love the challenge of engineering <span className="text-[#39FF14] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">web platforms</span> that are both scalable and user-friendly. I work primarily with <span className="text-[#00E5FF] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">React and Node.js</span>, supported by a strong foundation in <span className="text-[#C678DD] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(198,120,221,0.5)]">algorithms and database management</span>. My core objective is to continue pushing <span className="text-[#FF9900] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(255,153,0,0.5)]">web architecture</span> forward by integrating intelligent <span className="text-[#7952B3] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(121,82,179,0.5)]">AI capabilities</span> into everyday applications.
                </p>
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