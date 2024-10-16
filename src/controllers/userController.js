import User from '../models/userModel.js'
import appErr from '../utils/appErr.js'
import sendEmail from '../utils/sendMail.js'
import emailTemp from '../utils/verificationEmailTemp.js'

// create user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body

    // check user exist or not
    const userFound = await User.findOne({ email })
    if (userFound) {
      return res
        .status(400)
        .json({ status: false, message: 'user already exist' })
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
    })

    await sendEmail(newUser.email, emailTemp)

    return res.status(201).json({
      status: true,
      message: 'user created successfully',
      data: newUser,
    })
  } catch (error) {
    return appErr(error.message, 400)
  }
}

export { createUser }
