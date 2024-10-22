// src/pages/dashboard.tsx
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import ProfileStats from "../components/ProfileStats"
import GameForm from "../components/GameForm"
import { Game, User } from "../types"

interface DashboardData {
  games: Game[];
  user: User;
}

const DashboardPage = () => {
  const { user, isLoaded } = useUser()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isLoaded || !user) return

      try {
        const response = await fetch('/api/dashboard', {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setDashboardData(data)
        } else {
          console.error('Failed to fetch dashboard data')
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [isLoaded, user])

  if (!isLoaded || loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <div className="text-center">
          Please sign in to view your dashboard.
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Welcome, {user.firstName}!</h1>
          <p className="text-gray-600 mt-2">Manage your golf games and scores</p>
        </div>

        {dashboardData && (
          <div className="grid gap-8">
            {/* Profile Stats Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ProfileStats user={dashboardData.user} games={dashboardData.games} />
            </div>

            {/* Recent Games Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
              {dashboardData.games.length > 0 ? (
                <div className="grid gap-4">
                  {dashboardData.games.map((game) => (
                    <div 
                      key={game.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold">{game.courseName}</h3>
                      <p className="text-gray-600">
                        {new Date(game.date).toLocaleDateString()}
                      </p>
                      {/* Add more game details as needed */}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No games played yet.</p>
              )}
            </div>

            {/* Create New Game Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Start New Game</h2>
              <GameForm />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DashboardPage