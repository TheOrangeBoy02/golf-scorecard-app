// components/AuthForm.tsx
import React, { useState } from 'react'
import { useRouter } from 'next/router'

interface AuthFormProps {
  type: 'login' | 'signup'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {type === 'signup' && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full p-2 mb-4 border rounded"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default AuthForm