// src/pages/profile.tsx
import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../layout'
import ProfileStats from '../ProfileStats'
import prisma from '../../lib/prisma'
import { User, Game, Score } from '@prisma/client'

interface ProfilePageProps {
  user: User & {
    games: (Game & {
      scores: Score[];
    })[];
  };
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
  // TODO: Get the actual user ID from the session
  const userId = 1;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      games: {
        include: {
          scores: true
        }
      }
    }
  });

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user }
  };
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        <ProfileStats user={user} games={user.games} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Game History</h2>
          <ul>
            {user.games.map((game) => (
              <li key={game.id} className="mb-2">
                <span className="font-bold">Game {game.id}:</span> {game.courseName} - 
                Total Score: {game.scores.reduce((sum, score) => sum + score.value, 0)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;