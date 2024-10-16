import { Router } from 'express'
import {
  createUser,
  emailVerification,
  loginUser,
} from '../controllers/userController.js'
import {
  createUserValidation,
  loginUserValidation,
} from '../middlewares/userValidation.js'

const router = Router()

router.route('/register').post(createUserValidation, createUser)
router.route('/:link').get(emailVerification)
router.route('/login').post(loginUserValidation, loginUser)

export default router
