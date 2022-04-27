import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
const JWT_CODE = process.env.JWT_CODE

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    reuired: true,
    trim: true,
    min: 7
  },
  tokens: [{
    token: {
      type: String
    }
  }]
}, {
  timestamps: true
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.tokens
  delete userObject.password
  return userObject
}


userSchema.methods.generateAuthTokens = async function () {
  try {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, JWT_CODE)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
  } catch (error) {
    console.log(error);
  }
}

userSchema.statics.findByCredentials = async (userName, password) => {
  const user = await User.findOne({ userName })
  if (!user) {
    throw new Error('Invalid Credentials')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid Credentials')
  }
  return user
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

export default User