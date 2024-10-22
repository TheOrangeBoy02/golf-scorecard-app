// src/components/Scorecard.tsx
import React from 'react'
import { Game, Score, User } from '../types'

interface ScorecardProps {
  game: Game & {
    players: User[];
    scores: Score[];
  }
}

const Scorecard: React.FC<ScorecardProps> = ({ game }) => {
  const holeNumbers = Array.from({ length: game.holeCount }, (_, i) => i + 1)

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player
            </th>
            {holeNumbers.map(hole => (
              <th key={hole} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hole {hole}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {game.players.map((player) => (
            <tr key={player.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {player.name}
              </td>
              {holeNumbers.map(hole => {
                const score = game.scores.find(s => s.userId === player.id && s.hole === hole)
                return (
                  <td key={hole} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {score ? score.value : '-'}
                  </td>
                )
              })}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                {game.scores
                  .filter(s => s.userId === player.id)
                  .reduce((sum, s) => sum + s.value, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scorecard