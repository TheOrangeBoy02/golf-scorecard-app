// src/types/score.ts
import { User } from './user'
import { Game } from './game'

export interface Score {
  id: number
  value: number
  hole: number
  userId: number
  gameId: number
  user?: User
  game?: Game
}

export interface ScoreWithUserAndGame extends Score {
  user: User
  game: Game
}