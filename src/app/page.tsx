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

export const revalidate = 3600;

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
      </div>
    </main>
  );
}