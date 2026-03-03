import 'dotenv/config'
import { connectDB } from '../db/mongoose.js'
import { User } from '../models/User.js'

await connectDB()

const email = 'sweet_muse_admin'
const password = 'vK6ceN9tpnrFlyW1zo3sfO2rmBxjEk'

const existing = await User.findOne({ email })
if (existing) {
  console.log('Admin user already exists')
} else {
  await User.create({ email, password })
  console.log('✅ Admin user created')
}

process.exit(0)
