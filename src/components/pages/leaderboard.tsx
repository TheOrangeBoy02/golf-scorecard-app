// src/pages/leaderboard.tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import { Game, User } from '@prisma/client'
import LeaderboardTable from '../LeaderboardTable'

interface LeaderboardPageProps {
  games: (Game & {
    players: User[];
    scores: { userId: number; value: number }[];
  })[]
}

export const getServerSideProps: GetServerSideProps<LeaderboardPageProps> = async () => {
  const games = await prisma.game.findMany({
    include: {
      players: true,
      scores: true
    }
  })

  return {
    props: {
      games
    }
  }
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ games }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <LeaderboardTable games={games} />
    </div>
  )
}

export default LeaderboardPage