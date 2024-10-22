// src/pages/api/leaderboard.ts
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
    const games = await prisma.game.findMany({
      include: {
        players: true,
        scores: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      },
      take: 10 // Get last 10 games
    })

    const leaderboardData = games.map(game => {
      const playerScores = game.players.map(player => {
        const totalScore = game.scores
          .filter(score => score.userId === player.id)
          .reduce((sum, score) => sum + score.value, 0)

        return {
          playerId: player.id,
          playerName: player.name,
          totalScore,
          holeCount: game.scores
            .filter(score => score.userId === player.id)
            .length
        }
      })

      return {
        gameId: game.id,
        courseName: game.courseName,
        date: game.date,
        playerScores: playerScores.sort((a, b) => a.totalScore - b.totalScore)
      }
    })

    res.status(200).json(leaderboardData)
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}