import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  order: { type: Number, required: true } 
});

// This deletes the old model definition from Mongoose's cache
if (mongoose.models.Education) {
  delete mongoose.models.Education;
}
export default mongoose.models.Education || mongoose.model('Education', EducationSchema, 'education');