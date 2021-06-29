import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../util/generateToken.js'

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

export { registerUser }
