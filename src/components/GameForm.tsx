// src/components/GameForm.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const GameForm: React.FC = () => {
  const [courseName, setCourseName] = useState('')
  const [holeCount, setHoleCount] = useState(18)
  const [playerIds, setPlayerIds] = useState<number[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName, holeCount, players: playerIds }),
      })
      const game = await response.json()
      router.push(`/game/${game.id}`)
    } catch (error) {
      console.error('Error creating game:', error)
    }
  }

  const handlePlayerAdd = () => {
    setPlayerIds([...playerIds, 0]) // Placeholder for user ID
  }

  const handlePlayerRemove = (index: number) => {
    setPlayerIds(playerIds.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="holeCount" className="block text-sm font-medium text-gray-700">Number of Holes</label>
        <select
          id="holeCount"
          value={holeCount}
          onChange={(e) => setHoleCount(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value={9}>9 Holes</option>
          <option value={18}>18 Holes</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Players</label>
        {playerIds.map((_, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="text"
              placeholder={`Player ${index + 1}`}
              className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
            />
            <button
              type="button"
              onClick={() => handlePlayerRemove(index)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handlePlayerAdd}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Player
        </button>
      </div>
      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md">
        Create Game
      </button>
    </form>
  )
}

export default GameForm