// src/components/ProfileStats.tsx
import React from 'react'
import { User, Game, Score } from '@prisma/client'

interface ProfileStatsProps {
  user: User
  games: (Game & {
    scores: Score[];
  })[]
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ user, games }) => {
  const totalGames = games.length
  const totalScore = games.reduce((acc, game) => acc + game.scores.reduce((scoreAcc, score) => scoreAcc + score.value, 0), 0)
  const averageScore = totalScore / (totalGames * 5) // Assuming 5 holes per game

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{user.name}'s Profile</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-bold">Total Games</h3>
          <p className="text-4xl font-bold">{totalGames}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Total Score</h3>
          <p className="text-4xl font-bold">{totalScore}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Average Score</h3>
          <p className="text-4xl font-bold">{averageScore.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileStats