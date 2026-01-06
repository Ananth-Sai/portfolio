"use client";

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';
import SkillMatrix from './SkillMatrix';

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
              {/* Tactical Brackets */}
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
                  // SUBJECT_BIO_DATA_EXTRACTED
                </span>
                
                <p className="text-lg md:text-xl text-gray-400 leading-loose tracking-[0.1em] text-justify font-mono uppercase">
                  Results-oriented <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Computer Science graduate</span> from <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Illinois Institute of Technology</span> specializing in <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Full-Stack Web Development</span>. 
                  Experienced in <span className="text-[#61DBFB] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(97,219,251,0.3)]">React</span>, <span className="text-[#68A063] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(104,160,99,0.3)]">Node.js</span>, <span className="text-[#FFD43B] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,212,59,0.3)]">Django</span>, and <span className="text-[#C678DD] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(198,120,221,0.3)]">RESTful APIs</span> with a solid foundation in <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Data Structures</span>, <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Algorithms</span>, and <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Relational Databases</span>. 
                  Passionate about building responsive, <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">high-performance</span> applications and collaborating in agile, <span className="text-white font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">fast-paced environments</span>. 
                  My objective is to integrate advanced <span className="text-[#FF4655] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,70,85,0.3)]">AI and Machine Learning</span> capabilities into modern web architectures to drive innovative, scalable solutions.
                </p>
              </div>
            </div>
          </Tilt>
        </Reveal>

        {/* SKILL MATRIX SECTION */}
        <Reveal width="100%" delay={0.2}>
          <div className="w-full">
             <SkillMatrix />
          </div>
        </Reveal>

      </div>
    </section>
  ); 
}