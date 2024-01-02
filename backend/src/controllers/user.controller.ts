import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'


export const userRegistrationController = async (req: Request, res: Response) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors,
    })
  }

  try {
    const { email, password, firstName, lastName } = req.body

    if (!firstName.trim() || !lastName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields!!!',
      })
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: 'User already exists!',
      })
    }

    const user = new User({ email, password, firstName, lastName })

    await user.save()

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1d',
      }
    )

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    })

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong !!!',
    })
  }
}

