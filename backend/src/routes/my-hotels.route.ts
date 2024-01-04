import express from 'express'
import multer from 'multer'
import verifyToken from '../middleware/auth.middleware'
import { body } from 'express-validator'
import { createMyHotelController, getMyAllHotelsController } from '../controllers/my-hotels.controller'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

// api/my-hotels
router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('pricePerNeight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per neight is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ],
  upload.array('imageFiles', 6),
  createMyHotelController
)

router.get('/', verifyToken, getMyAllHotelsController)


export default router