import express, { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel.model'
import { HotelType } from '../shared/types'

export const createMyHotelController = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel: HotelType = req.body

    const imageUrls = await uploadImages(imageFiles)
    newHotel.imageUrls = imageUrls
    newHotel.lastUpdated = new Date()
    newHotel.userId = req.userId

    const hotel = new Hotel(newHotel)
    await hotel.save()

    return res.status(201).json({
      success: true,
      message: 'New hotel added successfully',
      data: hotel,
    })
  } catch (error) {
    console.log('Error creating hotel: ', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

export const getMyAllHotelController = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    return res.status(200).json({
      success: true,
      message: `All hotels of user ${req.userId}`,
      data: hotels,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while fetching hotels',
    })
  }
}

export const getMyHotelController = async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id.toString()

    const hotel = await Hotel.findOne({
      _id: hotelId,
      userId: req.userId,
    })

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'No hotel found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Hotel found',
      data: hotel,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to find hotel',
    })
  }
}

export const updateMyHotelController = async (req: Request, res: Response) => {
  try {
    const updatedhotel: HotelType = req.body
    updatedhotel.lastUpdated = new Date()

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.id.toString(),
        userId: req.userId,
      },
      updatedhotel,
      { new: true }
    )

    if(!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    const imageFiles = req.files as Express.Multer.File[]

    const updatedImageUrls = await uploadImages(imageFiles)

    hotel.imageUrls = [...updatedImageUrls, ... (updatedhotel.imageUrls || [])]

    await hotel.save()

    return res.status(201).json({
      success: true,
      message: 'Hotel updated successfully',
      data: hotel
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}


async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64')
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64
    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url
  })

  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}

