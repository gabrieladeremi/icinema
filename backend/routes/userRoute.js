import express from 'express'
import { registerUser } from '../controller/userController.js'

const router = express.Router()

router.post('/signup',registerUser)
router.get('/')

export default router
