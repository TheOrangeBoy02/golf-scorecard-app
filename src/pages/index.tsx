// src/pages/index.tsx
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import Layout from "../components/Layout"

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
        <h1 className="text-6xl font-bold mb-8 text-gray-900">Golf Scorecard App</h1>
        
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </SignedIn>

        <SignedOut>
          {/* <div className="flex space-x-6">
            <Link
              href="/sign-in"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div> */}
        </SignedOut>
      </div>
    </Layout>
  )
}

export default HomePage