// components/Navbar.tsx
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
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Golf Scorecard
        </Link>
        <div>
          <Link href="/dashboard" className="text-white mr-4">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-white mr-4">
            Leaderboard
          </Link>
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar