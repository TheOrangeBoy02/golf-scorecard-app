// src/pages/api/game/create.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { generateGamePin } from '../../lib/utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { courseName, playerIds } = req.body

  try {
    const game = await prisma.game.create({
      data: {
        courseName,
        pin: generateGamePin(),
        players: {
          connect: playerIds.map((id: number) => ({ id }))
        }
      },
      include: {
        players: true
      }
    })

    res.status(201).json(game)
  } catch (error) {
    console.error('Create game error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}