import express from 'express'
import { createLesson, updateLesson } from "../controllers/lessonController.js";
import authAdmin from '../middlewares/authAdmin.js';

const lessonRouter= express.Router()

lessonRouter.post('/create-lesson',authAdmin,createLesson)
lessonRouter.patch('/update-lesson/:id',authAdmin,updateLesson)


export default lessonRouter