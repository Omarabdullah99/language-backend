
import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  word: { type: String, required: true },
  pronunciation: { type: String, required: true },
  whenToSay: { type: String },
  lessonNumber: { type: Number, required: true },
  adminEmail: { type: String },
});

const vocabularyModel =
  mongoose.models.vocabulary || mongoose.model("vocabulary", vocabularySchema);

export default vocabularyModel;
