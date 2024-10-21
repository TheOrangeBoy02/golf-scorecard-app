// src/pages/game/[id].tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Scorecard from '../../components/Scorecard'
import { Game, User, Score } from '@prisma/client'

interface GamePageProps {
  game: (Game & {
    players: User[];
    scores: (Score & {
      user: User;
    })[];
  }) | null
}

export const getServerSideProps: GetServerSideProps<GamePageProps> = async (context) => {
  const gameId = context.params?.id as string
  const game = await prisma.game.findUnique({
    where: { id: parseInt(gameId) },
    include: {
      players: true,
      scores: {
        include: {
          user: true
        }
      }
    }
  })

  return {
    props: {
      game: game || null
    }
  }
}

const GamePage: React.FC<GamePageProps> = ({ game }) => {
  if (!game) {
    return <div>Game not found</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Game #{game.id}</h1>
      <p className="mb-4">Course: {game.courseName}</p>
      <Scorecard gameId={game.id.toString()} />
    </div>
  )
}

export default GamePage