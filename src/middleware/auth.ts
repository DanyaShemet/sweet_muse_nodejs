import jwt from 'jsonwebtoken'
import process from 'process'
import type { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
  status?: number
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error: CustomError = new Error('Authorization header missing or malformed')
    error.status = 401
    return next(error)
  }

  const token = authHeader.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    next()
  } catch {
    const error: CustomError = new Error('Invalid or expired token')
    error.status = 401
    next(error)
  }
}
