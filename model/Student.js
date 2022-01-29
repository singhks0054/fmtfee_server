import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  regNo: {
    type: Number,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  aadharNo: {
    type: Number
  },
  panNo: {
    type: String
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  motherName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
})

studentSchema.virtual('Fee', {
  ref: 'Fee',
  localField: '_id',
  foreignField: 'owner'
})

const Student = mongoose.model('Student', studentSchema)

export default Student