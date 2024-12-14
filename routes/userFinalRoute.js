import express from 'express'
import upload from '../middlewares/multer.js'
import { signin, signup, tesAdmin, testUser } from '../controllers/userFinalController.js'
import authUser from '../middlewares/authUser.js'
import authAdmin from '../middlewares/authAdmin.js'


const userFinalRouter= express.Router()

userFinalRouter.get('/test',authUser,testUser)
userFinalRouter.get('/admintest',authAdmin,tesAdmin)
userFinalRouter.post('/signup',upload.single('image'), signup)
userFinalRouter.post('/login', signin)


export default userFinalRouter