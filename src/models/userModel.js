import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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
  },
  { timestamps: true }
)

// hash password
userSchema.pre('save', async function (next) {
  await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)
export default User
