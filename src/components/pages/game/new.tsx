import React from 'react'
import Layout from '../../../layout'
import GameForm from '../../GameForm'

const NewGamePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Create New Game</h1>
        <GameForm />
      </div>
    </Layout>
  )
}

export default NewGamePage