import mongoose from "mongoose";

const SkillSectorSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 }
    }
  ],
  order: { type: Number, default: 0 }
});

export default mongoose.models.SkillSector || mongoose.model("SkillSector", SkillSectorSchema);