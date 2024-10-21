// src/components/Navbar.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
  const router = useRouter()

  const handleLogout = async () => {
    // Implement logout logic here
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">Golf Scorecard</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Leaderboard
            </Link>
            <button onClick={handleLogout} className="ml-4 btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar