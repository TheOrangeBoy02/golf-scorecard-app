import React from 'react'
import Layout from '../components/Layout'
import AuthForm from '../components/AuthForm'

const SignupPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <AuthForm type="signup" />
      </div>
    </Layout>
  )
}

export default SignupPage