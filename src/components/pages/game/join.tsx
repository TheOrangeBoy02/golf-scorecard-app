// src/pages/game/join.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../layout'

const JoinGamePage: React.FC = () => {
  const [gamePin, setGamePin] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/game/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gamePin }),
      })
      if (response.ok) {
        const { gameId } = await response.json()
        router.push(`/game/${gameId}`)
      } else {
        // Handle error
        console.error('Failed to join game')
      }
    } catch (error) {
      console.error('Error joining game:', error)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Join Game</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            value={gamePin}
            onChange={(e) => setGamePin(e.target.value)}
            placeholder="Enter Game PIN"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Join Game
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default JoinGamePage