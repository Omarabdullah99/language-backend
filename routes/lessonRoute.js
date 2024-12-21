import express from 'express'
import { createLesson, deleteLesson, getLessonById, getLessons, updateLesson } from "../controllers/lessonController.js";
import authAdmin from '../middlewares/authAdmin.js';


const lessonRouter= express.Router()

lessonRouter.post('/create-lesson',authAdmin,createLesson)
lessonRouter.patch('/update-lesson/:id',authAdmin,updateLesson)
lessonRouter.delete('/delete-lesson/:id',authAdmin,deleteLesson)
lessonRouter.get('/all-lesson',getLessons)
lessonRouter.get('/lesson/:id',getLessonById)



export default lessonRouter