import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { errorHandler } from './middleware/error-handler.js'
import { connectDB } from './db/mongoose.js'
import authRouter from './routes/auth.js'

const app = express()

await connectDB()
const PORT: number = Number(process.env.PORT) || 3000

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/api/auth', authRouter)

app.use(errorHandler)


