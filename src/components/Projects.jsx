"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';
import TextReveal from './TextReveal'; 
import Magnetic from './Magnetic'; 

export default function Projects({ projects }) {
  const safeProjects = projects || [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section id="projects" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923]">
        <div className="max-w-7xl w-full opacity-0" />
      </section>
    );
  }

  const highlightSyntax = (text) => {
    const keywords = [
      { name: 'React', color: 'text-[#61DBFB]' },
      { name: 'Node.js', color: 'text-[#68A063]' },
      { name: 'Django', color: 'text-[#FFD43B]' },
      { name: 'Tailwind CSS', color: 'text-[#38BDF8]' },
      { name: 'RESTful APIs', color: 'text-[#C678DD]' },
      { name: 'Next.js', color: 'text-white font-bold' },
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

  return (
    <section id="projects" className="relative z-10 min-h-screen w-full py-32 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923] overflow-hidden">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4a5568 1px, transparent 1px), linear-gradient(90deg, #4a5568 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-[0.3em] text-white mb-32 justify-center flex items-center gap-4 italic">
            <span className="text-[#FF4655] animate-pulse">{'>'}</span> 
            <DecryptedText text="PROJECT_ARCHIVES" speed={30} maxIterations={3} />
          </h2>
        </Reveal>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
          {safeProjects.map((project, index) => (
            <div key={project._id || index} className="group md:even:translate-y-24 transition-transform duration-1000 ease-out relative">
              
              {/* EXTERNAL AMBIENT GLOW */}
              <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out
                              opacity-0 group-hover:opacity-100 blur-[140px]"
                   style={{
                     background: 'radial-gradient(circle at center, rgba(255, 70, 85, 0.08) 0%, transparent 70%)',
                     transform: 'translateZ(-1px) scale(1.2)' 
                   }}>
              </div>

              <Reveal delay={0.1}>
                <Magnetic>
                  <Tilt
                    tiltMaxAngleX={1.5}
                    tiltMaxAngleY={1.5}
                    perspective={2000}
                    transitionSpeed={2500}
                    scale={1.02}
                    className="h-full relative z-10"
                  >
                    <div 
                      data-interactive="true"
                      className="group/card relative bg-[#0a1219]/80 backdrop-blur-2xl p-8 md:p-12 border border-white/5 transition-all duration-700 h-full flex flex-col overflow-hidden cursor-none
                                 hover:border-[#FF4655]/40 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)]"
                    >
                      
                      {/* ASYMMETRICAL INTERNAL GLOW (Tucked in corner to avoid washing out text) */}
                      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] z-0 pointer-events-none transition-opacity duration-1000
                                      opacity-0 group-hover/card:opacity-100 blur-[120px]"
                           style={{
                             background: 'radial-gradient(circle, rgba(255, 70, 85, 0.15) 0%, transparent 70%)',
                           }} 
                      />

                      {/* GRAIN & SCANLINES (Visual Texture) */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
                      </div>

                      <div className="relative z-20 flex flex-col h-full">
                        {/* Meta Info */}
                        <div className="flex justify-between items-start mb-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#FF4655]">
                          <span>DATA_ID // 00{index + 1}</span>
                          <span className="text-[#00E5FF] group-hover/card:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">[ ACTIVE_BUILD ]</span>
                        </div>

                        {/* Heading: Restored to Pure White/Leading-none */}
                        <h3 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-white uppercase mb-2 leading-none transition-colors duration-500 group-hover/card:text-[#FF4655]">
                          {project.title}
                        </h3>

                        {/* Subtitle */}
                        <div className="mb-10 opacity-70">
                           <TextReveal className="text-[#FF4655] text-[10px] tracking-[0.3em] uppercase font-mono italic">
                              {project.subtitle}
                           </TextReveal>
                        </div>
                        
                        {/* Paragraphs: Restored to Sans-serif/Leading-relaxed */}
                        <ul className="list-none space-y-6 text-gray-300 tracking-wide flex-grow mb-16 font-sans">
                          {project.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-5 text-sm md:text-base leading-relaxed hover:text-white transition-colors duration-300">
                              <span className="text-[#FF4655] font-mono opacity-50">/{i + 1}</span>
                              <span className="max-w-[90%] font-light tracking-wide">{highlightSyntax(bullet)}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white/5 backdrop-blur-md text-[10px] text-gray-300 border border-white/10 tracking-[0.2em] uppercase font-mono group-hover/card:border-[#FF4655]/50 group-hover/card:text-white group-hover/card:bg-[#FF4655]/10 transition-all duration-500">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Watermark */}
                      <div className="absolute -bottom-10 -right-10 text-white/5 font-mono text-8xl rotate-12 pointer-events-none select-none uppercase tracking-tighter transition-all duration-1000 group-hover/card:text-[#FF4655]/10 group-hover/card:scale-110">
                        {project.title.split(' ')[0]}
                      </div>
                    </div>
                  </Tilt>
                </Magnetic>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}