"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';

const SKILL_DATA = [
  {
    category: "FRONTEND_INTEL",
    skills: [
      { name: "React / Next.js", rating: 4 },
      { name: "Tailwind CSS", rating: 3 },
      { name: "TypeScript", rating: 3 },
      { name: "Framer Motion", rating: 4 }
    ]
  },
  {
    category: "BACKEND_LOGIC",
    skills: [
      { name: "Node.js", rating: 3 },
      { name: "Django / Python", rating: 4 },
      { name: "SQL / PostgreSQL", rating: 3 },
      { name: "RESTful APIs", rating: 4 }
    ]
  },
  {
    category: "OPERATIONS_GRID",
    skills: [
      { name: "Docker", rating: 3 },
      { name: "Git / GitHub", rating: 5 },
      { name: "Jira / Agile", rating: 4 },
      { name: "AWS / Netlify", rating: 3 }
    ]
  }
];

const SkillCard = ({ sector }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Array of 4 distinct neon glow styles
  const neonTextColors = [
    "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]", // Cyan
    "text-[#B026FF] drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]", // Neon Purple
    "text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]", // Neon Green
    "text-[#FFDF00] drop-shadow-[0_0_8px_rgba(255,223,0,0.8)]"  // Neon Yellow
  ];

  return (
    <div 
      data-interactive="true"
      className="group relative bg-[#15202B] p-10 border border-gray-800 transition-all duration-500 h-full flex flex-col overflow-hidden hover:border-[#FF4655]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-[#FF4655]/10 transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300" />

      <div className="relative z-20 flex flex-col h-full">
        <div className="mb-10">
          <span className={`font-mono text-xs tracking-[0.4em] block mb-2 uppercase transition-all duration-300 ${isHovered ? 'text-white font-bold opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-[#FF4655] opacity-70'}`}>
            // NODE_{sector.category}
          </span>
          <h2 className="text-3xl font-medium text-white tracking-wide uppercase italic">{sector.category}</h2>
        </div>

        <div className="space-y-10">
          {sector.skills.map((skill, kIdx) => {
            // Pick a color based on the row index
            const hoverColorClass = neonTextColors[kIdx % 4];

            return (
              <div key={kIdx} className="w-full">
                <div className="flex justify-between items-end mb-3">
                  {/* CHANGED: Skill text maps to the 4 neon colors on hover */}
                  <span className={`font-mono text-3sm uppercase transition-all duration-300 ${isHovered ? `${hoverColorClass} font-bold tracking-[0.25em]` : 'text-gray-400 tracking-[0.2em]'}`}>
                    {skill.name}
                  </span>
                  <span className={`text-[#FF4655] font-mono text-[10px] font-bold transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    VAL_INIT: {skill.rating}/5
                  </span>
                </div>
                
                <div className="flex gap-2.5 w-full">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-grow rounded-sm transition-all duration-500 ease-out
                        ${isHovered && i < skill.rating 
                          ? 'bg-[#FF4655] shadow-[0_0_15px_rgba(255,70,85,0.6)]' 
                          : 'bg-[#0F1923] border border-gray-800'
                        }`}
                      style={{ transitionDelay: isHovered ? `${i * 100}ms` : '0ms' }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </div>
  );
};

export default function SkillMatrix() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto py-4 px-4">
      <Reveal width="100%">
        <div className="flex items-center gap-4 mb-10 text-white italic">
          <div className="h-[1px] flex-grow bg-gray-800"></div>
          <h3 className="text-2xl md:text-3xl font-medium uppercase tracking-widest text-gray-100">
            {'>'} TECH_STACK_INITIALIZATION
          </h3>
          <div className="h-[1px] flex-grow bg-gray-800"></div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SKILL_DATA.map((sector, sIdx) => (
          <Reveal key={sIdx} delay={0.1 * sIdx} width="100%">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
              <SkillCard sector={sector} />
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  );
}