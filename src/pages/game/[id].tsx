// src/pages/game/[id].tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Scorecard from '../../components/Scorecard'
import prisma from '../../lib/prisma'
import { Game, User, Score } from '../../types'

interface GamePageProps {
  game: Game & {
    players: User[];
    scores: Score[];
  }
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

  if (!game) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      game: JSON.parse(JSON.stringify(game)) // Serialize dates
    }
  }
}

const GamePage: React.FC<GamePageProps> = ({ game }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Game #{game.id}</h1>
        <p className="text-xl mb-4">Course: {game.courseName}</p>
        <Scorecard game={game} />
      </div>
    </Layout>
  )
}

export default GamePage