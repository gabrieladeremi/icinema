import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import genres from './data/genres.js'
import User from './model/userModel.js'
import Genre from './model/genreModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Genre.deleteMany()

    const createdUsers = await User.insertMany(users)
    const createdGenres = await Genre.insertMany(genres)

    const adminUser = createdUsers[0]._id

    console.log('Data Imported'.green.inverse)
    //process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    //process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
