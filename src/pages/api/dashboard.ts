// src/pages/api/dashboard.ts
import { getAuth } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        games: {
          include: {
            scores: true,
            players: true
          },
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const responseData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      games: user.games
    }

    res.status(200).json(responseData)
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}