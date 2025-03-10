import User from '../models/userModel.js'
import appErr from '../utils/appErr.js'
import sendEmail from '../utils/sendMail.js'
import emailTemp from '../utils/verificationEmailTemp.js'

// generate JWT token
const generateAccessToken = async (id) => {
  try {
    const user = await User.findById({ _id: id })
    const accessToken = await user.generateAccessToken()
    user.accessToken = accessToken
    await user.save()
    return { accessToken }
  } catch (error) {
    return appErr(error.message, 400)
  }
}

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

    const link = await newUser.generateAccessToken()

    await sendEmail(newUser.email, emailTemp(link))

    return res.status(201).json({
      status: true,
      message: 'user created successfully',
      data: newUser,
    })
  } catch (error) {
    return appErr(error.message, 400)
  }
}
// user email verification
const emailVerification = async (req, res) => {
  try {
    const { link } = req.params
    let confirmEmailMessage = ''

    const user = new User()
    const token = await user.verifyAccessToken(link)

    if (token) {
      const userFound = await User.findOne({ email: token.email })
      if (userFound) {
        userFound.emailVerified = new Date().toDateString()
        await userFound.save()
        confirmEmailMessage = 'Your email has been verified!'
        return res.send(confirmEmailMessage)
      } else {
        confirmEmailMessage = 'User verification failed!'
        return res.send(confirmEmailMessage)
      }
    } else {
      confirmEmailMessage = 'Invalid verification url'
      return res.send(confirmEmailMessage)
    }
  } catch (error) {
    return appErr({ error: error.message }, 400)
  }
}

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res
        .status(400)
        .json({ status: false, message: 'user does not found', data: null })
    }

    const isPasswordCorrect = await userFound.correctPassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: false, message: 'email and password are incorrect' })
    }

    if (!userFound.emailVerified) {
      return res.status(400).json({
        status: false,
        message: 'please verify your account, check your mail box',
        data: null,
      })
    }
    const { accessToken } = await generateAccessToken(userFound._id)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    })

    return res.status(200).json({
      status: true,
      message: 'user login successful',
      token: accessToken,
    })
  } catch (error) {
    return appErr(error.message, 400)
  }
}
export { createUser, emailVerification, loginUser }
