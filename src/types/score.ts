// src/types/score.ts
import { User } from './user'
import { Game } from './game'

export interface Score {
  id: number
  value: number
  hole: number
  userId: number
  gameId: number
  createdAt: Date
  updatedAt: Date
  user?: User
  game?: Game
}

export interface ScoreWithUser extends Score {
  user: User
}