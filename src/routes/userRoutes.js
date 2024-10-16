import { Router } from 'express'
import { createUser, emailVerification } from '../controllers/userController.js'
import { createUserValidation } from '../middlewares/userValidation.js'

const router = Router()

router.route('/register').post(createUserValidation, createUser)
router.route('/:link').get(emailVerification)

export default router
