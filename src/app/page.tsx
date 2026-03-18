import connectMongo from "../lib/mongodb";
import ExperienceModel from "../models/Experience";
import ProjectModel from "../models/Projects";
import EducationModel from "../models/Education";
import TypewriterWrapper from "@/components/TypewriterWrapper";
import DecryptedText from "@/components/DecryptedText";

import Navbar from "../components/Navbar";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact"; 
import DataStream from "@/components/DataStream"; 

import { FileDown, Linkedin, Github } from 'lucide-react';

export const revalidate = 0;

export default async function Home() {
  await connectMongo();

  // 1. Fetch Experience
  const expData = await ExperienceModel.find({}).sort({ order: 1 }).lean();
  const experiences = expData.map((exp: any) => ({
    _id: exp._id.toString(),
    role: exp.role,
    company: exp.company,
    duration: exp.duration,
    bullets: exp.bullets,
    techStack: exp.techStack
  }));

  // 2. Fetch Projects
  const projData = await ProjectModel.find({}).sort({ order: 1 }).lean();
  const projects = projData.map((proj: any) => ({
    _id: proj._id.toString(),
    title: proj.title,
    subtitle: proj.subtitle,
    bullets: proj.bullets,
    techStack: proj.techStack
  }));

  // 3. Fetch Education
  const eduData = await EducationModel.find({}).sort({ order: 1 }).lean();
  const educations = eduData.map((edu: any) => ({
    _id: edu._id.toString(),
    degree: edu.degree,
    school: edu.school,
    location: edu.location,
    date: edu.date
  }));

  return (
    <main className="relative flex flex-col bg-[#0F1923] text-white selection:bg-[#FF4655] selection:text-white overflow-hidden">
      
      {/* LAYER 1: FIXED TACTICAL GRID */}
      <div className="tactical-grid" />

      {/* LAYER 2: DATA STREAM */}
      <DataStream />
      
      {/* LAYER 3: THE MOVING SCANLINE */}
      <div className="scanline" />

      {/* LAYER 4: MAIN CONTENT */}
      <div className="relative z-10">
        <Navbar />
        
        {/* HERO SECTION */}
        <section className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 pt-20 border-b border-gray-800">
          
          {/* TACTICAL HUD OVERLAYS */}
          <div className="absolute top-32 left-10 hidden md:block text-[#FF4655] font-mono text-xs tracking-widest opacity-50">
            SYS_STATUS: ONLINE<br/>
            UPLINK: SECURE
          </div>
          <div className="absolute bottom-32 right-10 hidden md:block text-gray-500 font-mono text-xs tracking-widest opacity-50 text-right">
            USER_ID: DEKU_0382<br/>
            LOC: UTICA_NY
          </div>

          {/* DECRYPTED IDENTITY */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium uppercase tracking-widest text-white leading-tight flex flex-wrap items-center justify-center gap-4 italic mb-2">
            <span className="text-[#FF4655]">{'>'}</span> 
            <DecryptedText text="ANANTHA SAI VALLURU" speed={30} maxIterations={3} />
          </h1>
          
          <div className="mt-4 text-xl md:text-2xl tracking-[0.2em] text-[#FF4655] font-mono uppercase">
            <TypewriterWrapper />
          </div>

          {/* TACTICAL ACTION NODES */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 z-20">
            {/* RESUME */}
            <a 
              href="/resume.pdf" 
              download="Anantha_Sai_Resume.pdf" 
              data-interactive="true"
              className="group relative flex items-center gap-3 bg-[#15202B] text-gray-300 border border-gray-800 px-6 py-4 text-sm tracking-[0.2em] transition-all duration-300 overflow-hidden hover:border-[#FF4655] hover:text-white hover:shadow-[0_0_30px_rgba(255,70,85,0.2)]"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300" />
              
              <FileDown size={18} className="text-[#FF4655] group-hover:animate-pulse relative z-10" />
              <span className="font-mono relative z-10">[ EXTRACT_DOSSIER ]</span>
            </a>

            {/* LINKEDIN */}
            <a 
              href="https://linkedin.com/in/ananth-valluru" 
              target="_blank" 
              data-interactive="true"
              className="group relative flex items-center gap-3 bg-[#15202B] text-gray-300 border border-gray-800 px-6 py-4 text-sm tracking-[0.2em] transition-all duration-300 overflow-hidden hover:border-[#FF4655] hover:text-white hover:shadow-[0_0_30px_rgba(255,70,85,0.2)]"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300" />
              
              <Linkedin size={18} className="text-[#FF4655] group-hover:animate-pulse relative z-10" />
              <span className="font-mono relative z-10">[ INITIATE_NETWORK_LINK ]</span>
            </a>

            {/* GITHUB */}
            <a 
              href="https://github.com/Ananth-Sai" 
              target="_blank" 
              data-interactive="true"
              className="group relative flex items-center gap-3 bg-[#15202B] text-gray-300 border border-gray-800 px-6 py-4 text-sm tracking-[0.2em] transition-all duration-300 overflow-hidden hover:border-[#FF4655] hover:text-white hover:shadow-[0_0_30px_rgba(255,70,85,0.2)]"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF4655] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300" />
              
              <Github size={18} className="text-[#FF4655] group-hover:animate-pulse relative z-10" />
              <span className="font-mono relative z-10">[ ACCESS_SOURCE_CODE ]</span>
            </a>
          </div>

          {/* TACTICAL SCROLL INDICATOR */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#FF4655]">Initialize_Scroll</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#FF4655] to-transparent"></div>
          </div>
        </section>

        {/* Tactical Content Sections */}
        <About />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Education educations={educations} />
        <Contact />
      </div>
    </main>
  );
}