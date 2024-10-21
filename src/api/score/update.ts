// src/pages/api/score/update.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { gameId, userId, hole, value } = req.body

  try {
    const score = await prisma.score.upsert({
      where: {
        gameId_userId_hole: {
          gameId,
          userId,
          hole
        }
      },
      update: { value },
      create: {
        gameId,
        userId,
        hole,
        value
      }
    })

    res.status(200).json(score)
  } catch (error) {
    console.error('Update score error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}