import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bullets: { type: [String], required: true },
  techStack: { type: [String], required: true },
  order: { type: Number, required: true } 
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);