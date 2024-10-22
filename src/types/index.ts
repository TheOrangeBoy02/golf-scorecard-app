// src/types/index.ts
export interface User {
  id: number
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

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

export interface Score {
  id: number
  value: number
  hole: number
  userId: number
  gameId: number
  user?: User
  game?: Game
  createdAt: Date
  updatedAt: Date
}