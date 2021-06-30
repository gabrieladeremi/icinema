import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
//import { notFound, errorHandler } from './middleware/errorMIddleware.js'
dotenv.config()

import genreRoute from './routes/genreRoute.js'
import userRoute from './routes/userRoute.js'
// import orderRoutes from './routes/orderRoutes.js'

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running......')
})

app.use('/api/genres', genreRoute)
app.use('/api/users', userRoute)
// app.use('/api/orders', orderRoutes)

// app.use(notFound)

// app.use(errorHandler)

const PORT = process.env.PORT
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV}  mode on port ${PORT}`.yellow
      .bold
  )
)
export default app;