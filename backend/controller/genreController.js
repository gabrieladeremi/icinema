import express from 'express'
import { genreValidation } from '../util/JoiValidation/genreValidation.js'
import asyncHandler from 'express-async-handler'
import Genre from '../model/genreModel.js'

const addGenre = asyncHandler(async (req, res) => {
  const { error } = genreValidation(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  try {
    const genre = await Genre.findOne({ name: req.body.name })

    if (genre) {
      return res.status(401).json('Genre already exists')
    } else {
      const createdGenre = await Genre.create({ name: req.body.name })

      const newGenre = await createdGenre.save()

      if (newGenre) {
        return res.status(201).send(newGenre)
      } else {
        res.status(400)
        throw new Error('Genre not created')
        return
      }
    }
  } catch (err) {
    throw new Error(`error: ${err.message}`)
    return
  }
})

const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { error } = genreValidation(req.body)

  if (error) {
    res.status(404)
    throw new Error(`error: ${error.message}`)
  }
  try {
    const genre = await Genre.findById(req.params.id)

    if (genre) {
      genre.name = name || genre.name

      const updatedGenre = await genre.save()

      if (updateGenre) {
        res.send(201).json({ updatedGenre })
        return
      } else {
        res.status(404)
        throw new Error(`Genre not updated`)
      }
    } else {
      res.status(404)
      throw new Error(`Genre not found`)
    }
  } catch (err) {
    res.status(400)
    throw new Error(`error: ${err.message}`)
  }
})

const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const genreID = req.params.id
    const deletedGenre = await Genre.findByIdAndDelete(genreID)

    if (deletedGenre) {
      return res.status(200).send({ message: 'Genre deleted successfully' })
    } else {
      return res.status(400).send('Genre not deleted')
    }
  } catch (error) {
    res.status(404)
    throw new Error(`error: ${error.message}`)
  }
})

export { addGenre, updateGenre, deleteGenre }
