import express from "express";
import Fee from '../model/Fee.js'
import Student from '../model/Student.js'

const router = express.Router()

router.get('/fee', async (req, res) => {
  try {
    const fee = await Fee.find({})
    res.status(200).send(fee)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/fee/:id', async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id)
    res.status(200).send(fee)
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/fee', async (req, res) => {
  let message = 'Fee submitted Successfully !'
  try {
    const student = await Student.find({ regNo: req.body.regNo })
    if (student.length === 0) {
      message = 'First Add Student In Record !'
      throw new Error('not Found')
    } else {
      const fee = await new Fee(req.body)
      if (!fee) {
        throw Error('Invalid attempt')
      }
      await fee.save()
      res.status(200).send({ fee, message })
    }

  } catch (error) {

    res.send({ error, message })

  }
})
router.get('/feesearch/:course/:regNo/:semester', async (req, res) => {
  try {
    const fee = await Fee.find({ course: req.params.course, regNo: req.params.regNo, semester: req.params.semester })
    if (!fee) {
      throw new Error('Not Found !')
    }
    res.send(fee)
  } catch (error) {
    res.send({ error, message: 'No Record Found !' })
  }
})

router.patch('/fee/:id', async (req, res) => {
  const message = 'Fee Updated Successfully !'
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body)
    await fee.save()
    res.status(200).send(message)
  } catch (error) {
    const message = 'Some Error'
    res.status(400).send({ error, message })
  }
})
router.delete('/fee/:id', async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id)
    res.status(200).send('Fee deleted from record')
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router