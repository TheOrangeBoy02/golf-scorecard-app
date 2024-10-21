// components/Layout.tsx
import React from 'react'
import Navbar from './navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-4">
        {children}
      </main>
    </div>
  )
}

export default Layout