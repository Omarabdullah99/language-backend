import lessonModel from "../models/lessonModel.js";
import vocabularyModel from "../models/vocabularyModel.js";

export const addVocabularyToLesson = async (req, res) => {
    try {
      const { lessonNumber, word,pronunciation, whenToSay, adminEmail } = req.body;
  
      if (!lessonNumber || !word || !pronunciation || !whenToSay || !adminEmail) {
        return res.status(400).json({ error: "All required fields must be filled" });
      }
  
      // নতুন vocabulary তৈরি করা
      const vocabulary = new vocabularyModel({
        word,
        pronunciation,
        whenToSay,
        adminEmail,
        lessonNumber,  // এই vocabulary কোন lesson এর জন্য তা জানিয়ে দেওয়া
      });
  
      const savedVocabulary = await vocabulary.save();
  
      // lessonNumber অনুসারে lesson খুঁজে বের করা
      const lesson = await lessonModel.findOne({ lessonNumber });
  
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
  
      // নতুন vocabulary এর ObjectId lesson এর vocabularies অ্যারেতে যোগ করা
      lesson.vocabularies.push(savedVocabulary._id);
  
      // lesson আপডেট করা
      const updatedLesson = await lesson.save();
  
      res.status(200).json(updatedLesson);  // সফল হলে updated lesson পাঠানো
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };