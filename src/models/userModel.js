import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { accessTokenExpire, accessTokenSecret } from '../config/index.js'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    address: [
      {
        street: {
          type: String,
        },
        postalCode: {
          type: String,
        },
      },
    ],
    accessToken: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
)

// hash password
userSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  // hash password with cost of 10
  this.password = await bcrypt.hash(this.password, 10)

  next()
})

// generate access token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpire }
  )
}

// verify access token
userSchema.methods.verifyAccessToken = async function (token) {
  return jwt.verify(token, accessTokenSecret, function (err, decoded) {
    if (err) {
      return null
    }
    return decoded
  })
}

const User = mongoose.model('User', userSchema)
export default User
