import mongoose from 'mongoose'

const feeSchema = new mongoose.Schema({
  regNo: {
    type: Number,
    required: true
  },
  submitDate: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  mop: {
    type: String,
    reuired: true
  },
  submittedTo: {
    type: String,
    required: true
  },
  sNo: {
    type: Number,
    required: true
  },
  bookNo: {
    type: Number,
    required: true
  }
})

feeSchema.methods.toJSON = function () {
  const fee = this
  const feeObject = fee.toObject()
  return feeObject
}

const Fee = mongoose.model('Fee', feeSchema)

export default Fee;