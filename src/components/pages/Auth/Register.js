import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/api';

import asesinoImg from '../../../assets/avatars/asesino.png';
import magoImg from '../../../assets/avatars/mago.png';
import soporteImg from '../../../assets/avatars/soporte.png';
import guerreroImg from '../../../assets/avatars/guerrero.png';

const avatarOptions = [
  { key: 'Asesino', label: 'Asesino', src: asesinoImg },
  { key: 'Mago', label: 'Mago', src: magoImg },
  { key: 'Soporte', label: 'Soporte', src: soporteImg },
  { key: 'Guerrero', label: 'Guerrero', src: guerreroImg },
];

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarClass, setAvatarClass] = useState('Asesino');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await register({ username, email, password, avatarClass });
      onRegister(user);
      navigate('/profile');
    } catch {
      setError('No se pudo crear la cuenta, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Crear Cuenta
        </h2>
        {error && (
          <p className="text-center text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label className="block text-gray-300 mb-1">Usuario</label>
            <input
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-60 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-60 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-60 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Selección de Avatar/Rol */}
          <fieldset className="space-y-3">
            <legend className="text-gray-300 text-lg">Elige tu rol</legend>
            <div className="grid grid-cols-2 gap-4 mt-1">
              {avatarOptions.map((opt) => (
                <label
                  key={opt.key}
                  className={`
                    cursor-pointer p-2 rounded-2xl bg-gray-800 bg-opacity-60 
                    flex flex-col items-center justify-center text-center 
                    border-2 ${
                      avatarClass === opt.key
                        ? 'border-yellow-400 ring-2 ring-yellow-500'
                        : 'border-transparent hover:ring-1 hover:ring-gray-500'
                    } transition`}
                >
                  <img
                    src={opt.src}
                    alt={opt.label}
                    className="w-20 h-20 object-contain mb-2 drop-shadow-lg"
                  />
                  <span
                    className={`${
                      avatarClass === opt.key
                        ? 'text-yellow-300 font-semibold'
                        : 'text-gray-300'
                    }`}
                  >
                    {opt.label}
                  </span>
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

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200"
          >
            Registrarme
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-400 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
