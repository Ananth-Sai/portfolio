import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  bullets: { type: [String] },
  techStack: { type: [String] },
  order: { type: Number, default: 0 },
  link: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String }
}, { strict: false });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);