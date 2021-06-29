import express from 'express'
import { login, registerUser, deleteUser } from '../controller/userController.js'

const router = express.Router()

router.post('/signup',registerUser)
router.post('/login', login);
router.delete('/delete/:id', deleteUser)

export default router
