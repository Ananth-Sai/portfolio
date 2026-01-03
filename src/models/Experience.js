import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  bullets: { type: [String], required: true },
  techStack: { type: [String], required: true },
  order: { type: Number, required: true } 
});

// This line prevents Next.js from crashing by trying to build the model twice
export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);