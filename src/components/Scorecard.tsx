// src/components/Scorecard.tsx
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Score } from '../types/score'

interface ScorecardProps {
  gameId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Scorecard: React.FC<ScorecardProps> = ({ gameId }) => {
  const { data: scores, error } = useSWR<Score[]>(`/api/score/${gameId}`, fetcher, {
    refreshInterval: 5000
  })

  if (error) return <div>Failed to load scores</div>
  if (!scores) return <div>Loading...</div>

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Scorecard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Player</th>
            <th className="text-left">Hole 1</th>
            <th className="text-left">Hole 2</th>
            <th className="text-left">Hole 3</th>
            <th className="text-left">Hole 4</th>
            <th className="text-left">Hole 5</th>
            <th className="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.id}>
              <td>{score.user.name}</td>
              <td>{score.hole === 1 ? score.value : '-'}</td>
              <td>{score.hole === 2 ? score.value : '-'}</td>
              <td>{score.hole === 3 ? score.value : '-'}</td>
              <td>{score.hole === 4 ? score.value : '-'}</td>
              <td>{score.hole === 5 ? score.value : '-'}</td>
              <td>{score.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scorecard