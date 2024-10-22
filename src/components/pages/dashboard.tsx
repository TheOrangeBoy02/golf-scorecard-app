// src/pages/dashboard.tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../layout'
import ProfileStats from '../ProfileStats'
import GameForm from '../GameForm'
import prisma from '../../lib/prisma'
import { User, Game, Score } from '../../types'

interface DashboardPageProps {
  user: (User & {
    games: (Game & {
      scores: Score[];
    })[];
  }) | null;
}

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (context) => {
  try {
    // TODO: Get the actual user ID from the session
    const userId = 1
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        games: {
          include: {
            scores: true
          }
        }
      }
    })

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)) // Serialize the date objects
      }
    }
  } catch (error) {
    console.error('Dashboard error:', error)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  if (!user) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <ProfileStats user={user} games={user.games} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Create New Game</h2>
          <GameForm />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage