import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import './db/Mongoose.js'
import userRouter from './router/User.js'
import studentRouter from './router/Student.js'
import feeRouter from './router/Fee.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express())
app.use(express.json())
app.use(userRouter)
app.use(studentRouter)
app.use(feeRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(chalk.yellow('Server is started on : ' + PORT));
})