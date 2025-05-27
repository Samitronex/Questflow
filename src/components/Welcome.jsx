import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
      <h1 className="text-5xl text-white mb-8">QuestFlow</h1>
      <div className="space-x-4">
        <button
          onClick={()=>nav('/login')}
          className="px-6 py-2 bg-white rounded-lg"
        >Iniciar Sesión</button>
        <button
          onClick={()=>nav('/register')}
          className="px-6 py-2 bg-white rounded-lg"
        >Registrarse</button>
      </div>
    </div>
  )
}
