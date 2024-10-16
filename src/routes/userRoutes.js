import { Router } from 'express'
import { createUser } from '../controllers/userController.js'
import { createUserValidation } from '../middlewares/userValidation.js'

const router = Router()

router.route('/register').post(createUserValidation, createUser)

export default router
