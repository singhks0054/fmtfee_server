import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/User.js'
dotenv.config()
const JWT_CODE = process.env.JWT_CODE

const auth = async (req, res, next) => {
  try {
    const token = await req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_CODE)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please Authenticate !' })
  }
}
export default auth