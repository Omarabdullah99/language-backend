import lessonModel from "../models/LessonModel.js";

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
