
import mongoose from "mongoose";
import vocabularyModel from "./vocabularyModel.js";


const lessonSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  lessonNumber: { type: Number, unique: true, required: true },
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: "vocabulary" }],
});

const lessonModel =
  mongoose.models.lesson || mongoose.model("lesson", lessonSchema);

export default lessonModel;



