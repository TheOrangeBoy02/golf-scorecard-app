// src/pages/api/game/join.ts
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
    const { pin } = req.body

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const game = await prisma.game.update({
      where: { pin },
      data: {
        players: {
          connect: { id: user.id }
        }
      },
      include: {
        players: true
      }
    })

    res.status(200).json(game)
  } catch (error) {
    console.error('Join game error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}