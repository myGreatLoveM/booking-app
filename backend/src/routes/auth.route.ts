import express from 'express'
import { check } from 'express-validator'
import { userLoginController, userLogoutController, verifyTokenController } from '../controllers/auth.controller'
import verifyToken from '../middleware/auth.middleware'

const router = express.Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password should be 8 or more characters required'
    ).isLength({ min: 8 }),
  ],
  userLoginController
)

router.get('/validate-token', verifyToken, verifyTokenController)

router.post('/logout', userLogoutController)

export default router
