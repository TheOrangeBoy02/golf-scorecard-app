// src/pages/api/score/update.ts
import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const { gameId, hole, value } = req.body

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const score = await prisma.score.upsert({
      where: {
        gameId_userId_hole: {
          gameId: Number(gameId),
          userId: user.id,
          hole: Number(hole)
        }
      },
      update: { value: Number(value) },
      create: {
        gameId: Number(gameId),
        userId: user.id,
        hole: Number(hole),
        value: Number(value)
      }
    })

    res.status(200).json(score)
  } catch (error) {
    console.error('Update score error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}