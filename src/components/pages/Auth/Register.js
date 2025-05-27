import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../services/api'

import asesinoImg  from '../../../assets/avatars/asesino.png'
import magoImg     from '../../../assets/avatars/mago.png'
import soporteImg  from '../../../assets/avatars/soporte.png'
import guerreroImg from '../../../assets/avatars/guerrero.png'

const avatarOptions = [
  { key: 'Asesino',  label: 'Asesino',  src: asesinoImg  },
  { key: 'Mago',     label: 'Mago',     src: magoImg     },
  { key: 'Soporte',  label: 'Soporte',  src: soporteImg  },
  { key: 'Guerrero', label: 'Guerrero', src: guerreroImg }
]

export default function Register({ onRegister }) {
  const [username, setUsername]     = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [avatarClass, setAvatarClass] = useState('Asesino')
  const [error, setError]           = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      const user = await register({ username, email, password, avatarClass })
      onRegister(user)
      navigate('/profile')
    } catch {
      setError('No se pudo crear la cuenta, inténtalo de nuevo.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-white text-center">Crear Cuenta</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-gray-300 mb-1">Usuario</label>
          <input
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="text-gray-300">Elige tu rol</legend>
          <div className="grid grid-cols-2 gap-4">
            {avatarOptions.map(opt => (
              <label
                key={opt.key}
                className={`
                  cursor-pointer p-2 rounded-xl bg-gray-700 flex flex-col items-center
                  border-2 ${avatarClass === opt.key
                    ? 'border-yellow-400 ring-2 ring-yellow-500'
                    : 'border-transparent hover:ring-1 hover:ring-gray-500'}
                `}
              >
                <img src={opt.src} alt={opt.label} className="w-16 h-16 object-contain mb-2" />
                <span className="text-gray-200">{opt.label}</span>
                <input
                  type="radio"
                  name="avatarClass"
                  value={opt.key}
                  checked={avatarClass === opt.key}
                  onChange={() => setAvatarClass(opt.key)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          Registrarme
        </button>

        <p className="text-gray-400 text-center text-sm">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  )
}
