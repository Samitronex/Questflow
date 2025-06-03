import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../../services/api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await authenticate({ username, password });
      onLogin(user);
      nav('/missions');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-center text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <input
              placeholder="Usuario"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-60 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              placeholder="Contraseña"
              type="password"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-60 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => nav('/register')}
            className="text-purple-400 hover:underline"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
