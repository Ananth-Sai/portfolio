"use client";

import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import Tilt from 'react-parallax-tilt';
import DecryptedText from './DecryptedText';

export default function Education({ educations }) {
  const safeEducations = educations || [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section id="education" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923]">
        <div className="max-w-6xl w-full opacity-0" />
      </section>
    );
  }

  return (
    <section id="education" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923] overflow-hidden">
      
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-white mb-20 justify-center flex items-center gap-4 italic">
          <span className="text-[#FF4655]">{'>'}</span> <DecryptedText text="ACADEMIC_RECORDS" speed={30} maxIterations={3} />
        </h2>
      </Reveal>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {safeEducations.map((edu, index) => (
          <Reveal key={edu._id || index} delay={0.2 * index} width="100%">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              transitionSpeed={1500}
              scale={1.02}
              className="h-full"
            >
              <div 
                data-interactive="true" 
                className="group relative bg-[#15202B] p-8 md:p-10 border border-gray-800 transition-all duration-500 h-full flex flex-col shadow-xl cursor-none overflow-hidden hover:border-[#FF4655]"
              >
                
                <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#FF4655]/20 transition-all duration-500 pointer-events-none" />

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>

                <div className="relative z-20 flex flex-col h-full">
                  
                  {/* TACTICAL HEADER */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[#FF4655] font-mono text-xs tracking-[0.4em] block mb-2 uppercase opacity-70 transition-all duration-300 group-hover:text-white group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        // NODE_EDU_0{index + 1}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-medium tracking-widest text-white uppercase italic leading-tight">
                        {edu.degree}
                      </h3>
                    </div>
                    {/* VERIFIED BADGE */}
                    <div className="hidden sm:block">
                      <span className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 border border-[#B026FF] text-[#B026FF] shadow-[0_0_10px_rgba(176,38,255,0.1)] group-hover:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-shadow duration-500">
                        [STATUS: VERIFIED]
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-[#FF4655] text-xl tracking-widest uppercase font-medium italic mb-2">
                      {edu.school}
                    </p>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-mono">
                      {edu.location}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-end">
                    <div className="text-gray-400 font-mono text-base tracking-widest uppercase">
                      {edu.date}
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}