import User from '../models/userModel.js'

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

    return res
      .status(201)
      .json({
        status: true,
        message: 'user created successfully',
        data: newUser,
      })
  } catch (error) {
    
  }
}

export { createUser }
