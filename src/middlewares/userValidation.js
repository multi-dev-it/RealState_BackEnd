const createUserValidation = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body
    if (
      (!fullName || fullName == undefined) &&
      (!email || email == undefined) &&
      (!password || password == undefined) &&
      (!phoneNumber || phoneNumber == undefined)
    ) {
      return res
        .status(400)
        .json({ status: false, message: 'please enter all required fields' })
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'internal server error',
      error: error.message,
    })
  }
  next()
}
export { createUserValidation }
