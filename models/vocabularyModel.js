import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  word: { type: String, required: true },
  pronunciation: { type: String, required: true },
  whenToSay: { type: String },
  lessonNumber: { type: Number, required: true },
  adminEmail: { type: String },
});


const vocabulayModel =
  mongoose.models.vocabulay || mongoose.model("vocabulay", vocabularySchema);

export default vocabulayModel;