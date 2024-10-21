// src/types/user.ts
import { Game } from './game'
import { Score } from './score'

export interface User {
  id: number
  name: string
  email: string
  password: string
  games?: Game[]
  scores?: Score[]
}

export interface UserWithoutPassword {
  id: number
  name: string
  email: string
  games?: Game[]
  scores?: Score[]
}