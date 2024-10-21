// src/lib/auth.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { verify, sign } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface DecodedToken {
  userId: number
  iat: number
  exp: number
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return hash(password, saltRounds)
}

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword)
}

export const generateToken = (userId: number): string => {
  return sign({ userId }, JWT_SECRET, { expiresIn: '1d' })
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return verify(token, JWT_SECRET) as DecodedToken
  } catch {
    return null
  }
}

export const authenticateUser = (handler: (req: NextApiRequest, res: NextApiResponse, userId: number) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decodedToken = verifyToken(token)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    await handler(req, res, decodedToken.userId)
  }
}

export const getAuthenticatedUserId = (req: NextApiRequest): number | null => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return null
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = verifyToken(token)

  return decodedToken ? decodedToken.userId : null
}