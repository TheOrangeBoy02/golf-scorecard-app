// src/types/index.ts
export * from './user'
export * from './game'
export * from './score'

export interface LeaderboardEntry {
  playerId: number
  playerName: string
  totalScore: number
}