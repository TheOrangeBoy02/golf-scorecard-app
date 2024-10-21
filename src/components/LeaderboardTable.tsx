// src/components/LeaderboardTable.tsx
import React from 'react'
import { Game, User } from '@prisma/client'

interface LeaderboardTableProps {
  games: (Game & {
    players: User[];
    scores: { userId: number; value: number }[];
  })[]
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ games }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Player</th>
            <th className="text-left">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {games
            .flatMap((game) =>
              game.players.map((player) => ({
                player,
                totalScore: game.scores.find((score) => score.userId === player.id)?.value ?? 0
              }))
            )
            .sort((a, b) => a.totalScore - b.totalScore)
            .map((entry, index) => (
              <tr key={entry.player.id}>
                <td>{index + 1}</td>
                <td>{entry.player.name}</td>
                <td>{entry.totalScore}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardTable