// src/types/game.ts
import { User } from './user'
import { Score } from './score'

export interface Game {
  id: number
  pin: string
  courseName: string
  holeCount: number
  date: Date
  createdAt: Date
  updatedAt: Date
  players?: User[]
  scores?: Score[]
  }
  
export interface GameWithScores extends Game {
  scores: Score[]
  players: User[]
}

export interface GameWithPlayersAndScores extends Game {
  players: User[]
  scores: Score[]
}