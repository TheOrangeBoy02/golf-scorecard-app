import React from 'react'
import Layout from '../components/layout'
import AuthForm from '../components/AuthForm'

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <AuthForm type="login" />
      </div>
    </Layout>
  )
}

export default LoginPage