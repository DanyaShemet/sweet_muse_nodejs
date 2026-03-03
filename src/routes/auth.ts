import { Router, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
const router = Router()


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    console.log(req)

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('JWT_SECRET is not defined')

    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' })

    res.json({ token })
  } catch (err) {
    next(err)
  }
})

export default router
