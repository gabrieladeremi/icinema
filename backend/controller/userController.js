import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { signInValidate } from '../util/JoiValidation/userValidation.js'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../util/generateToken.js'

dotenv.config()

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const { error } = signInValidate(req.body)
  try {
    if (error) {
      return res
        .status(401)
        .json({ status: 'failed', error: error.details[0].message })
    }

    const user = await User.findOne({ email })
    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password)
      if (matchedPassword) {
        const token = generateToken(user._id)
        const userDetails = {
          id: user._id,
          email: user.email,
          username: user.username,
        }
        return res.status(200).json({
          status: 'success',
          token,
          user: userDetails,
        })
      } else {
        return res.status(400).json({
          status: 'failed',
          error: 'Incorrect Email or Password',
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      error: error.message,
    })
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })

    const createUser = user.save()

    if (createUser) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Credentials')
    }
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id

    const deletedUser = await User.findByIdAndDelete(userId)

    if (deletedUser) {
      return res.status(201).send({ message: 'User deleted successfully' })
    } else {
      return res.status(400).send('user not deleted')
    }
  } catch (error) {
    throw new Error(`error: ${error.message}`)
    return
  }
})

export { login, registerUser, deleteUser }
