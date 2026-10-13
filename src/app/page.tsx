import type { Metadata } from "next";
import connectMongo from "../lib/mongodb";
import ExperienceModel from "../models/Experience";
import ProjectModel from "../models/Projects";
import EducationModel from "../models/Education";
import SkillSectorModel from "../models/SkillSector";

import Navbar from "../components/Navbar";
import EntryDossier from "../components/EntryDossier";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";
import DataStream from "@/components/DataStream";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://asv-dev.vercel.app"),
  title: "Anantha Sai Valluru // Full-Stack & AI Engineer",
  description: "Tactical portfolio of Anantha Sai Valluru. Full-Stack Developer and AI Engineer specializing in Next.js, React, Node.js, Python, and multi-agent AI systems. MS in Computer Science from Illinois Tech.",
  openGraph: {
    title: "Anantha Sai Valluru // Full-Stack & AI Engineer",
    description: "Full-Stack Developer and AI Engineer building scalable web platforms and autonomous AI systems. MS in Computer Science from Illinois Tech.",
    url: "https://asv-dev.vercel.app",
    siteName: "Ananth Valluru Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anantha Sai Valluru Tactical Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anantha Sai Valluru // Full-Stack & AI Engineer",
    description: "Full-Stack Developer & AI Engineer portfolio. Next.js, Node.js, Python, and Multi-Agent AI systems.",
    images: ["/og-image.png"],
  },
};

export default async function Home() {
  await connectMongo();

  const expData = (await ExperienceModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
  const experiences = expData.map((exp, idx) => ({
    _id: exp._id ? String(exp._id) : `exp-${idx}`,
    role: (exp.role as string) || "",
    company: (exp.company as string) || "",
    duration: (exp.duration as string) || "",
    bullets: Array.isArray(exp.bullets) ? (exp.bullets as string[]) : [],
    techStack: Array.isArray(exp.techStack) ? (exp.techStack as string[]) : []
  }));

  const projData = (await ProjectModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
  const projects = projData.map((proj, idx) => ({
    _id: proj._id ? String(proj._id) : `proj-${idx}`,
    title: (proj.title as string) || "",
    subtitle: (proj.subtitle as string) || "",
    bullets: Array.isArray(proj.bullets) && proj.bullets.length > 0
      ? (proj.bullets as string[])
      : (Array.isArray(proj.points) ? (proj.points as string[]) : []),
    techStack: Array.isArray(proj.techStack) && proj.techStack.length > 0
      ? (proj.techStack as string[])
      : (Array.isArray(proj.tags) ? (proj.tags as string[]) : []),
    link: ((proj.link || proj.liveUrl || proj.githubUrl) as string) || ""
  }));

  const eduData = (await EducationModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
  const educations = eduData.map((edu, idx) => ({
    _id: edu._id ? String(edu._id) : `edu-${idx}`,
    degree: (edu.degree as string) || "",
    school: (edu.school as string) || "",
    location: (edu.location as string) || "",
    date: (edu.date as string) || ""
  }));

  const skillData = (await SkillSectorModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
  const skillSectors = skillData.map((sector, sIdx) => ({
    _id: sector._id ? String(sector._id) : `sector-${sIdx}`,
    sector: ((sector.sector || sector.category) as string) || "",
    // THE ULTIMATE FIX: Serialize the nested array objects to destroy hidden buffers
    skills: Array.isArray(sector.skills)
      ? (sector.skills as Record<string, unknown>[]).map((skill, kIdx) => ({
        name: (skill.name as string) || "",
        rating: (skill.rating as number) || 0,
        _id: skill._id ? String(skill._id) : `skill-${sIdx}-${kIdx}`
      }))
      : []
  }));

  return (
    <main className="relative flex flex-col bg-[#0F1923] text-white">
      <div className="tactical-grid fixed inset-0 pointer-events-none z-0" />
      <DataStream />
      <div className="scanline fixed inset-0 pointer-events-none z-50 opacity-[0.02]" />

      <div className="relative z-10 w-full">
        <Navbar />
        <EntryDossier />
        <About skillSectors={skillSectors} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Education educations={educations} />
        <Contact />

        {/* TACTICAL BASELINE FOOTER */}
        <footer className="w-full border-t border-gray-800/80 bg-[#0A1017] py-10 px-6 relative z-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#FF4655] animate-pulse" />
              <span className="text-gray-400 tracking-[0.3em] uppercase">
                SYSTEM_ID: ANANTHA_SAI_VALLURU // 2026
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-500 tracking-[0.2em] uppercase text-[11px]">
              <span>STATUS: [ ALL_SYSTEMS_OPERATIONAL ]</span>
              <span className="hidden sm:inline text-gray-700">|</span>
              <span className="hidden sm:inline">STACK: NEXT.JS &bull; GEMINI &bull; ATLAS</span>
            </div>

            <div className="text-gray-500 tracking-widest text-[11px]">
              &copy; 2026 ASV. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}