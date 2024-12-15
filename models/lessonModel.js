import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  lessonNumber: { type: Number, unique: true, required: true },
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: "vocabulay" }],
});

const lessonModel =
  mongoose.models.lesson || mongoose.model("lesson", lessonSchema);

export default lessonModel;
