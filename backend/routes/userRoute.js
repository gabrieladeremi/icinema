import express from 'express'
import { login, registerUser } from '../controller/userController.js'

const router = express.Router()

router.post('/signup',registerUser)
router.post('/login', login);

export default router
