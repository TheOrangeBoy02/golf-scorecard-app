// src/components/GameForm.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import prisma from '../lib/prisma'

const GameForm: React.FC = () => {
  const [courseName, setCourseName] = useState('')
  const [playerIds, setPlayerIds] = useState<number[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const game = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName, players: playerIds }),
      }).then((res) => res.json())
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <h3 className="text-lg font-bold mb-2">Players</h3>
      {playerIds.map((_, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            placeholder={`Player ${index + 1}`}
            className="w-full p-2 mr-2 border rounded"
          />
          <button
            type="button"
            onClick={() => handlePlayerRemove(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handlePlayerAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Player
      </button>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Create Game
      </button>
    </form>
  )
}

export default GameForm