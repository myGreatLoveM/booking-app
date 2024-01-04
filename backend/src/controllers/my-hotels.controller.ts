import express, { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel.model'
import { HotelType } from '../shared/types'

export const createMyHotelController = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const newHotel: HotelType = req.body

    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString('base64')
      let dataURI = 'data:' + image.mimetype + ';base64,' + b64
      const res = await cloudinary.v2.uploader.upload(dataURI)
      return res.url
    })

    const imageUrls = await Promise.all(uploadPromises)
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

export const getMyAllHotelsController = async (req: Request, res: Response) => {
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
