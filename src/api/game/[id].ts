// src/pages/api/game/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  try {
    const game = await prisma.game.findUnique({
      where: { id: Number(id) },
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

    res.status(200).json(game)
  } catch (error) {
    console.error('Get game error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}