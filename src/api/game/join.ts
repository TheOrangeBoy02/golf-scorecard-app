// src/pages/api/game/join.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { gamePin, userId } = req.body

  try {
    const game = await prisma.game.findUnique({
      where: { pin: gamePin }
    })

    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    await prisma.game.update({
      where: { id: game.id },
      data: {
        players: {
          connect: { id: userId }
        }
      }
    })

    res.status(200).json({ gameId: game.id })
  } catch (error) {
    console.error('Join game error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}