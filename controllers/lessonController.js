import lessonModel from "../models/lessonModel.js";

export const createLesson = async (req, res) => {
  try {
    const lesson = new lessonModel(req.body);
    const savedLesson = await lesson.save();
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const updatedLesson = await lessonModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLesson)
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
};


export const deleteLesson = async (req, res) => {
    try {
      await lessonModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getLessons = async (req, res) => {
    try {
      const lessons = await lessonModel.find().populate("vocabularies");
      res.json(lessons);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error)
    }
  };

  export const getLessonById= async(req,res)=>{
    try {
      const lesson= await lessonModel.findById(req.params.id).populate("vocabularies")
      res.json(lesson)
      
    } catch (error) {
      res.status(400).json({ error: error.message });
      
    }
  }