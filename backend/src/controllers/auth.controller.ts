import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const userLoginController = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() })
  }
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Credentials' })
    }

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

    return res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      data: { email, userId: user._id },
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong !!!' })
  }
}

export const verifyTokenController = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    userId: req.userId,
  })
}

export const userLogoutController = async (req: Request, res: Response) => {
  return res
    .status(200)
    .cookie('auth_token', null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: 'User logged out successfully',
    })
}
