// src/components/GameForm.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'

interface GameFormProps {
  onSuccess?: (gameId: number) => void
}

const GameForm: React.FC<GameFormProps> = ({ onSuccess }) => {
  const [courseName, setCourseName] = useState('')
  const [holeCount, setHoleCount] = useState(18)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          holeCount
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create game')
      }

      const game = await response.json()
      
      if (onSuccess) {
        onSuccess(game.id)
      } else {
        router.push(`/game/${game.id}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
          Course Name
        </label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="holeCount" className="block text-sm font-medium text-gray-700">
          Number of Holes
        </label>
        <select
          id="holeCount"
          value={holeCount}
          onChange={(e) => setHoleCount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value={9}>9 Holes</option>
          <option value={18}>18 Holes</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Game'}
      </button>
    </form>
  )
}

export default GameForm