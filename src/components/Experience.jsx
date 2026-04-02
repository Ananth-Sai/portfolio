"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';
import TextReveal from './TextReveal'; 
import Magnetic from './Magnetic'; 

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
      { name: 'Full-Stack', color: 'text-white font-bold uppercase' },
      { name: 'Next.js', color: 'text-white font-bold' },
      { name: 'HTML', color: 'text-[#E34F26]' }, 
      { name: 'CSS', color: 'text-[#1572B6]' },
      { name: 'JavaScript', color: 'text-[#F7DF1E]' },
      { name: 'JS', color: 'text-[#F7DF1E]' }
    ];

    let parts = [text];
    keywords.forEach((keyword) => {
      let newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(new RegExp(`(${keyword.name})`, 'gi'));
          splitParts.forEach((sp) => {
            if (sp.toLowerCase() === keyword.name.toLowerCase()) {
              newParts.push(
                <span key={Math.random()} className={`${keyword.color} font-bold`}>
                  {sp}
                </span>
              );
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

  if (!isMounted) return null;

  return (
    <section id="experience" className="relative z-10 min-h-screen w-full py-32 px-6 flex flex-col items-center border-t border-gray-800 overflow-hidden bg-[#0F1923]">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4a5568 1px, transparent 1px), linear-gradient(90deg, #4a5568 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <Reveal>
        <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-[0.3em] text-white mb-40 justify-center flex items-center gap-4 italic">
          <span className="text-[#FF4655] animate-pulse">{'>'}</span> 
          <DecryptedText key="exp-header" text="SERVICE_HISTORY" speed={40} maxIterations={5} />
        </h2>
      </Reveal>

      <div className="max-w-7xl w-full relative">
        {/* Central Rail */}
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-800 opacity-30 z-0" />

        <div className="space-y-40 w-full relative z-10">
          {safeExperiences.map((job, index) => {
            const isActive = job.duration && job.duration.toLowerCase().includes('present');
            const isEven = index % 2 === 0;

            return (
              <div key={job._id || index} className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center group/item w-full`}>
                
                {/* Timeline Diamond Node */}
                <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 top-12 w-2 h-2 bg-[#FF4655] rotate-45 z-0 shadow-[0_0_15px_rgba(255,70,85,0.8)] group-hover/item:scale-150 transition-all duration-500" />

                {/* THE DOSSIER CARD */}
                <div className={`w-full md:w-[48%] ${isEven ? 'md:pr-12' : 'md:pl-12'} ml-8 md:ml-0 z-20`}>
                  <Reveal delay={0.1} width="100%">
                    <Magnetic>
                      <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} perspective={2000} scale={1.02} className="h-full">
                        
                        {/* MATCHED MATERIAL: bg-[#0a1219]/80 + backdrop-blur-2xl */}
                        <div className="relative bg-[#0a1219]/80 backdrop-blur-2xl p-8 md:p-12 border border-white/5 transition-all duration-700 overflow-hidden cursor-none hover:border-[#FF4655]/40 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)]">
                          
                          {/* ASYMMETRICAL INTERNAL GLOW */}
                          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] z-0 pointer-events-none transition-opacity duration-1000
                                          opacity-0 group-hover/item:opacity-100 blur-[120px]"
                               style={{
                                 background: 'radial-gradient(circle, rgba(255, 70, 85, 0.15) 0%, transparent 70%)',
                               }} 
                          />

                          {/* GRAIN & SCANLINES TEXTURE */}
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
                          </div>

                          <div className="relative z-10">
                            {/* Metadata Layer */}
                            <div className="flex justify-between items-start mb-6 font-mono text-[10px] tracking-[0.4em] uppercase text-[#FF4655]">
                              <span>DATA_ID // 00{index + 1}</span>
                              <span className={`px-2 py-1 border transition-all duration-500 ${isActive ? 'border-[#39FF14]/40 text-[#39FF14] bg-[#39FF14]/5 shadow-[0_0_10px_rgba(57,255,20,0.1)]' : 'border-gray-800 text-gray-500'}`}>
                                {isActive ? '[ STATUS: ACTIVE ]' : '[ STATUS: ARCHIVED ]'}
                              </span>
                            </div>

                            {/* Heading: Pure White / Leading None */}
                            <h3 className="text-3xl md:text-5xl font-bold tracking-[0.05em] text-white uppercase mb-4 leading-none transition-colors duration-500 group-hover/item:text-[#FF4655]">
                              {job.role}
                            </h3>

                            {/* Subtitle using template literal fix for TextReveal */}
                            <div className="mb-10 opacity-70">
                               <TextReveal className="text-[#FF4655] text-[10px] tracking-[0.3em] uppercase font-mono italic">
                                  {`${job.company} | ${job.duration}`}
                               </TextReveal>
                            </div>

                            {/* Bullets */}
                            <ul className="list-none space-y-6 text-gray-300 font-sans">
                              {job.bullets.map((bullet, idx) => (
                                <li key={idx} className="flex gap-5 text-sm md:text-base leading-relaxed hover:text-white transition-colors duration-300">
                                  <span className="text-[#FF4655] font-mono opacity-40">/{idx + 1}</span>
                                  <span className="max-w-[90%] font-light tracking-wide">{highlightSyntax(bullet)}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Tech Chips */}
                            <div className="mt-12 flex flex-wrap gap-3">
                              {job.techStack.map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-3 py-1.5 bg-white/5 backdrop-blur-md text-[10px] text-gray-300 border border-white/10 tracking-[0.2em] uppercase font-mono group-hover/item:border-[#FF4655]/50 group-hover/item:text-white group-hover/item:bg-[#FF4655]/10 transition-all duration-500"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Tilt>
                    </Magnetic>
                  </Reveal>
                </div>

                {/* THE SYSTEM METRICS */}
                <div className={`hidden md:flex md:w-[40%] flex-col ${isEven ? 'md:pl-10 text-left items-start' : 'md:pr-10 text-right items-end'} space-y-4 opacity-20 group-hover/item:opacity-100 transition-all duration-700 z-10`}>
                    <div className="font-mono text-[10px] text-[#FF4655] tracking-[0.3em]">TIMESTAMP // {job.duration.split(' ').pop()}</div>
                    <div className="w-full h-[1px] bg-gray-800" />
                    <div className="text-[9px] font-mono text-gray-500 uppercase leading-relaxed">
                        Sector_Access: Granted <br />
                        Encryption: 256-bit <br />
                        Data_Retrieved: Success
                    </div>
                    {/* Visual Graph Decorator */}
                    <div className="flex gap-1 h-8 items-end">
                        {[40, 70, 45, 90, 65].map((h, i) => (
                            <div key={i} className="w-1 bg-[#FF4655]/30 group-hover/item:bg-[#FF4655] transition-all" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}