// src/pages/api/game/[id].ts
import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { id } = req.query
    const gameId = Number(id)

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        players: true,
        scores: {
          include: {
            user: true
          }
        }
      }
    })

    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    // Verify user is part of the game
    const isPlayerInGame = game.players.some(player => player.id === user.id)
    if (!isPlayerInGame) {
      return res.status(403).json({ message: 'Not authorized to view this game' })
    }

    res.status(200).json(game)
  } catch (error) {
    console.error('Get game error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}