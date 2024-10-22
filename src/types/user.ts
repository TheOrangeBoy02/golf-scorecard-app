// src/types/user.ts
import { Game } from './game'
import { Score } from './score'

export interface User {
  id: number
  clerkId: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
  games?: Game[]
  scores?: Score[]
}

export interface UserProfile extends User {
  totalGames: number
  averageScore: number
}