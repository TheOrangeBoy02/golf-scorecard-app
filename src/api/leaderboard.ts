// src/pages/api/leaderboard.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const games = await prisma.game.findMany({
      include: {
        players: true,
        scores: true
      }
    })

    const leaderboard = games.flatMap(game =>
      game.players.map(player => ({
        playerId: player.id,
        playerName: player.name,
        totalScore: game.scores
          .filter(score => score.userId === player.id)
          .reduce((sum, score) => sum + score.value, 0)
      }))
    )

    res.status(200).json(leaderboard)
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}