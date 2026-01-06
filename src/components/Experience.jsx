"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';

export default function Experience({ experiences }) {
  const safeExperiences = experiences || [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const highlightSyntax = (text) => {
    const keywords = [
      { name: 'React', color: 'text-[#61DBFB]' },
      { name: 'Node.js', color: 'text-[#68A063]' },
      { name: 'Django', color: 'text-[#FFD43B]' },
      { name: 'Tailwind CSS', color: 'text-[#38BDF8]' },
      { name: 'RESTful APIs', color: 'text-[#C678DD]' },
      { name: 'Bootstrap', color: 'text-[#7952B3]' },
      { name: 'SQL', color: 'text-[#00758F]' },
      { name: 'Full-Stack', color: 'text-white font-bold uppercase' }
    ];

    let parts = [text];
    keywords.forEach((keyword) => {
      let newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(new RegExp(`(${keyword.name})`, 'gi'));
          splitParts.forEach((sp) => {
            if (sp.toLowerCase() === keyword.name.toLowerCase()) {
              newParts.push(<span key={Math.random()} className={`${keyword.color} font-bold`}>{sp}</span>);
            } else {
              newParts.push(sp);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    return parts;
  };

  if (!isMounted) {
    return (
      <section id="experience" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923]">
        <div className="max-w-4xl w-full opacity-0" />
      </section>
    );
  }

  return (
    <section id="experience" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 overflow-hidden bg-[#0F1923]">
      
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-white mb-20 text-center italic">
          <span className="text-[#FF4655] mr-4">{'>'}</span> <DecryptedText text="EXPERIENCE_LOG" speed={30} maxIterations={3} />
        </h2>
      </Reveal>

      <div className="max-w-4xl w-full relative border-l border-gray-700 pl-6 md:pl-10 space-y-20">
        {safeExperiences.map((job, index) => {
          // Dynamic tactical badge check
          const isActive = job.duration && job.duration.toLowerCase().includes('present');

          return (
            <div key={job._id || index} className="relative group/card">
              <div className="absolute -left-[30px] md:-left-[46px] top-10 w-4 h-4 bg-[#FF4655] rotate-45 z-20 shadow-[0_0_15px_rgba(255,70,85,0.6)] group-hover/card:scale-150 transition-transform duration-300" />

              <Reveal delay={0.2 * index} width="100%">
                <Tilt
                  tiltMaxAngleX={5} tiltMaxAngleY={5}
                  perspective={1000} transitionSpeed={1500}
                  scale={1.02} gyroscope={true}
                >
                  <div 
                    data-interactive="true" 
                    className="group relative bg-[#15202B] p-8 md:p-10 border border-gray-800 transition-all duration-500 ml-6 md:ml-10 cursor-none shadow-xl overflow-hidden hover:border-[#FF4655]"
                  >
                    <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#FF4655]/20 transition-all duration-500 pointer-events-none" />
                    
                    {/* Tactical Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
                    
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300" />

                    <div className="relative z-20 flex flex-col h-full">
                      
                      {/* TACTICAL HEADER */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[#FF4655] font-mono text-xs tracking-[0.4em] block mb-2 uppercase opacity-70 transition-all duration-300 group-hover:text-white group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            // NODE_EXP_0{index + 1}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-medium tracking-widest text-white uppercase italic leading-tight">
                            {job.role}
                          </h3>
                        </div>
                        {/* DYNAMIC BADGE */}
                        <div className="hidden sm:block">
                          <span className={`font-mono text-[10px] tracking-[0.2em] px-3 py-1 border transition-all duration-500 ${isActive ? 'border-[#39FF14] text-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.2)]' : 'border-gray-600 text-gray-500'}`}>
                            {isActive ? '[CLEARANCE: ACTIVE]' : '[CLEARANCE: ARCHIVED]'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-[#FF4655] text-lg tracking-widest mt-2 mb-8 uppercase font-medium italic">
                        {job.company} <span className="text-gray-500 mx-2">|</span> {job.duration}
                      </p>
                      
                      <ul className="list-none space-y-4 text-base text-gray-400 tracking-wide z-10 relative" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {job.bullets.map((bullet, idx) => (
                          <li key={idx} className="hover:text-gray-200 transition-colors duration-200 flex gap-3">
                            <span className="text-[#FF4655] mt-1">{'>'}</span>
                            <span>{highlightSyntax(bullet)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-10 flex flex-wrap gap-4 z-10 relative">
                        {job.techStack.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-4 py-2 border border-gray-700 text-gray-400 text-xs tracking-widest hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-all duration-300 uppercase font-mono shadow-[4px_4px_0px_0px_rgba(255,70,85,0)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,70,85,0.4)] hover:!shadow-[4px_4px_0px_0px_rgba(255,70,85,1)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}