import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route'
import authRoute from './routes/auth.route'
import myHotelsRoute from './routes/my-hotels.route'
import cookieParser from 'cookie-parser'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

mongoose
  .connect(process.env.DATABASE_URI as string)
  .then(() => {
    app.on('error', (error) => {
      console.log(`App couldn't connect to database: `)
      throw error
    })
    app.listen(5000, () => {
      console.log('Server listening on port 5000')
    })
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelsRoute)

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})
