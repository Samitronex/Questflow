import React, { useState } from 'react'
import { useNavigate }     from 'react-router-dom'
import { authenticate }     from '../../../services/api'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError(null)
    try {
      const user = await authenticate({ username, password })
      onLogin(user)
      nav('/missions')
    } catch {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={submit} className="bg-gray-800 p-8 rounded-xl space-y-4 w-full max-w-sm">
        <h2 className="text-2xl text-white mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-400">{error}</p>}
        <input
          placeholder="Usuario"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full p-2 bg-indigo-600 rounded hover:bg-indigo-700 transition">
          Entrar
        </button>
      </form>
    </div>
  )
}
