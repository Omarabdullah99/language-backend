import express from 'express'
import authAdmin from '../middlewares/authAdmin.js'
import { addVocabularyToLesson } from '../controllers/vocabularyController.js'


const vocabularyRouter= express.Router()

vocabularyRouter.post('/creat-voca',authAdmin,addVocabularyToLesson)

export default vocabularyRouter