import express from 'express'
import { addGenre, updateGenre, deleteGenre } from '../controller/genreController.js'

const router = express.Router()

router.route('/add').post(addGenre)
router.route('/update/:id').put(updateGenre)
router.route('/delete/:id').delete(deleteGenre)

export default router
