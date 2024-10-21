// src/lib/utils.ts
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 10)
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword)
}

export const generateToken = (userId: number): string => {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1d' })
}

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    return verify(token, process.env.JWT_SECRET!) as { userId: number }
  } catch {
    return null
  }
}

export const generateGamePin = (): string => {
  return Math.random().toString(36).substr(2, 6).toUpperCase()
}