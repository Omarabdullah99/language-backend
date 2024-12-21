import express from 'express'
import authAdmin from '../middlewares/authAdmin.js'
import { addVocabularyToLesson, deleteVocabulary, getAllVocabularies, getVocaById, updateVocabulary } from '../controllers/vocabularyController.js'


const vocabularyRouter= express.Router()

vocabularyRouter.post('/creat-voca',authAdmin,addVocabularyToLesson)
vocabularyRouter.patch('/update-voca/:id',authAdmin,updateVocabulary)
vocabularyRouter.delete('/delete-voca/:id',authAdmin,deleteVocabulary)
vocabularyRouter.get('/all-voca',getAllVocabularies)
vocabularyRouter.get('/vocabulary/:id',getVocaById)


export default vocabularyRouter