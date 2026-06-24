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

export const revalidate = 0;

export default async function Home() {
  await connectMongo();

  const expData = await ExperienceModel.find({}).sort({ order: 1 }).lean();
  const experiences = expData.map((exp: any) => ({
    _id: exp._id ? String(exp._id) : Math.random().toString(),
    role: exp.role || "",
    company: exp.company || "",
    duration: exp.duration || "",
    bullets: Array.isArray(exp.bullets) ? exp.bullets : [],
    techStack: Array.isArray(exp.techStack) ? exp.techStack : []
  }));

  const projData = await ProjectModel.find({}).sort({ order: 1 }).lean();
  const projects = projData.map((proj: any) => ({
    _id: proj._id ? String(proj._id) : Math.random().toString(),
    title: proj.title || "",
    subtitle: proj.subtitle || "",
    bullets: Array.isArray(proj.bullets) ? proj.bullets : [],
    techStack: Array.isArray(proj.techStack) ? proj.techStack : []
  }));

  const eduData = await EducationModel.find({}).sort({ order: 1 }).lean();
  const educations = eduData.map((edu: any) => ({
    _id: edu._id ? String(edu._id) : Math.random().toString(),
    degree: edu.degree || "",
    school: edu.school || "",
    location: edu.location || "",
    date: edu.date || ""
  }));

  const skillData = await SkillSectorModel.find({}).sort({ order: 1 }).lean();
  const skillSectors = skillData.map((sector: any) => ({
    _id: sector._id ? String(sector._id) : Math.random().toString(),
    sector: sector.sector || sector.category || "",
    // THE ULTIMATE FIX: Serialize the nested array objects to destroy hidden buffers
    skills: Array.isArray(sector.skills)
      ? sector.skills.map((skill: any) => ({
        name: skill.name || "",
        rating: skill.rating || 0,
        _id: skill._id ? String(skill._id) : Math.random().toString()
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