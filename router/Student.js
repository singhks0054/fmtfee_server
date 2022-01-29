import express from 'express'
import Student from '../model/Student.js'

const router = express.Router()

router.get('/student', async (req, res) => {
  try {
    const student = await Student.find({})
    if (!student) {
      res.status(400).send('No Student Found')
    }
    res.status(200).send(student)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      res.status(400).send('No Student Found')
    }
    res.status(200).send(student)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/std/:regno', async (req, res) => {
  try {
    const student = await Student.find({ regNo: req.params.regno }).exec()
    if (!student) {
      return res.send('No Student Found')
    }
    res.send(student)
  } catch (error) {
    res.send(error)
  }
})
router.get('/stdd/:session/:course', async (req, res) => {
  try {
    const student = await Student.find({ session: `${req.params.session}`, course: `${req.params.course}` }).exec()
    if (!student) {
      return res.send('No Student Found')
    }
    res.send(student)
  } catch (error) {
    res.send(error)
  }
})

router.post('/student', async (req, res) => {
  const message = 'New Student Added Successfully !'
  try {
    const student = await new Student(req.body)
    if (!student) {
      throw new Error('Invalid Request')
    }
    await student.save()
    res.status(200).send({ student, message })
  } catch (error) {
    const message = 'Some Error Occurred, Fill the Form correctly  !'
    res.send({ error, message })
  }
})

router.patch('/student/:id', async (req, res) => {
  const id = req.params.id
  try {
    const student = await Student.findByIdAndUpdate(id, req.body)
    await student.save()
    res.status(200).send('Updated')
  } catch (error) {
    res.send(error)
  }
})

router.delete('/student/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      throw Error('Invalid user request')
    }
    res.status(200).send('Student Deleted From Record ')
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router 