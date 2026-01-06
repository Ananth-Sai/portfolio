"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';

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
    <section id="projects" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 overflow-x-hidden bg-[#0F1923]">
      
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-white mb-20 justify-center flex items-center gap-4 italic">
          <span className="text-[#FF4655]">{'>'}</span> <DecryptedText text="PROJECT_RECORDS" speed={30} maxIterations={3} />
        </h2>
      </Reveal>

      <div className="max-w-7xl w-full grid grid-cols-1 xl:grid-cols-2 gap-12">
        {safeProjects.map((project, index) => (
          <Reveal key={project._id || index} delay={0.2 * index} width="100%">
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
                className="group relative bg-[#15202B] p-8 md:p-10 border border-gray-800 transition-all duration-500 h-full flex flex-col shadow-xl cursor-none overflow-hidden
                           hover:border-[#FF4655]"
              >
                
                <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#FF4655]/20 transition-all duration-500 pointer-events-none" />

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"></div>
                
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>

                <div className="relative z-20 flex flex-col h-full">
                  
                  {/* TACTICAL HEADER */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#FF4655] font-mono text-xs tracking-[0.4em] block mb-2 uppercase opacity-70 transition-all duration-300 group-hover:text-white group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        // NODE_PRJ_0{index + 1}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-medium tracking-widest text-white uppercase italic">
                        {project.title}
                      </h3>
                    </div>
                    {/* DEPLOYED BADGE */}
                    <div className="hidden sm:block">
                      <span className="font-mono text-[10px] tracking-[0.2em] px-3 py-1 border border-[#00E5FF] text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-shadow duration-500">
                        [STATUS: DEPLOYED]
                      </span>
                    </div>
                  </div>

                  <p className="text-[#FF4655] text-lg tracking-widest mt-2 mb-8 uppercase font-medium italic">
                    {project.subtitle}
                  </p>
                  
                  <ul className="list-none space-y-4 text-base text-gray-400 tracking-wide flex-grow z-10" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="hover:text-gray-200 transition-colors flex gap-3">
                        <span className="text-[#FF4655] mt-1">{'>'}</span>
                        <span>{highlightSyntax(bullet)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-4 z-10">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-[#0F1923] text-gray-400 border border-gray-700 text-xs tracking-widest hover:bg-[#FF4655] hover:text-white hover:border-[#FF4655] transition-all duration-300 uppercase font-mono shadow-[4px_4px_0px_0px_rgba(255,70,85,0)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,70,85,0.4)] hover:!shadow-[4px_4px_0px_0px_rgba(255,70,85,1)]">
                        {tech}
                      </span>
                    ))}
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