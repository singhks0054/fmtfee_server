import Mongoose from "mongoose";
import dotenv from 'dotenv'
import chalk from 'chalk'
dotenv.config()

const URL = process.env.URL

Mongoose.connect(URL).then(() => {
  console.log(chalk.green.inverse('Database is connected'));
}).catch((e) => {
  console.log(e.message);
})