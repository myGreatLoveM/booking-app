import express from 'express'
import { check } from 'express-validator'
import { userRegistrationController } from '../controllers/user.controller'

const router = express.Router()

router.post(
  '/register',
  [
    check('firstName', 'First name is required').isString(),
    check('lastName', 'Last name is required').isString(),
    check('email', 'Provide valid email address').isEmail(),
    check(
      'password',
      'Password should be 8 or more characters required'
    ).isLength({ min: 8 }),
  ],
  userRegistrationController
)

export default router
