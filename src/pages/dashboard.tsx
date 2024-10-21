// src/pages/dashboard.tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { User, Game, Score } from '@prisma/client'
import GameForm from '../components/GameForm'
import ProfileStats from '../components/ProfileStats'


interface DashboardPageProps {
  user: User
  games: (Game & {
    scores: Score[];
  })[]
}

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (context) => {
  const user = await prisma.user.findUnique({
    where: { id: 1 }, // Replace with the actual user ID
    include: {
      games: {
        include: {
          scores: true
        }
      }
    }
  })

  return {
    props: {
      user: user || null,
      games: user?.games || []
    }
  }
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, games }) => {
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ProfileStats user={user} games={games} />
      <h2 className="text-2xl font-bold mt-8 mb-4">New Game</h2>
      <GameForm />
    </div>
  )
}

export default DashboardPage