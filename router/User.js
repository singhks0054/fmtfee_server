import express from 'express'
import User from '../model/User.js'
import auth from '../middleware/Auth.js'
const router = express.Router()


router.get('/user', async (req, res) => {
  try {
    const user = await User.find({})
    if (!user) {
      throw new Error('User not Found')
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/user/me', auth, async (req, res) => {
  const token = req.token
  try {
    const user = req.user
    if (!user) {
      throw new Error('Not LoggedIn')
    }
    res.status(200).send({ user, token })
  } catch (error) {
    res.send(error)
  }
})
router.post('/user', async (req, res) => {
  try {
    const user = await new User(req.body)
    await user.save()
    const token = await user.generateAuthTokens()
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.userName, req.body.password)
    const token = await user.generateAuthTokens()
    res.status(200).send({ user, token })
  } catch (error) {
    res.send({ error, message: 'Unable to Login !' })
  }
})
router.post('/user/logout', auth, async (req, res) => {

  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(400).send(error)
  }
})
router.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['userName', 'password']
  const isValidOp = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOp) {
    res.status(400).send('INVALID UPDATE ATTEMPTS')
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/user/me', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router