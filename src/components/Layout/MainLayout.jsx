// src/components/Layout/MainLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout({ user, onLogout }) {
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-gray-800 text-white px-6 py-3 flex items-center">
        <nav className="flex-1 flex justify-center space-x-12 text-lg">
          <NavLink to="profile" className={({isActive}) => isActive
            ? 'bg-gray-700 px-2 py-1 rounded'
            : 'hover:bg-gray-700 px-2 py-1 rounded'}
          >
            Perfil
          </NavLink>
          <NavLink to="missions" className={({isActive}) => isActive
            ? 'bg-gray-700 px-2 py-1 rounded'
            : 'hover:bg-gray-700 px-2 py-1 rounded'}
          >
            Misiones
          </NavLink>
          <NavLink to="rewards" className={({isActive}) => isActive
            ? 'bg-gray-700 px-2 py-1 rounded'
            : 'hover:bg-gray-700 px-2 py-1 rounded'}
          >
            Recompensas
          </NavLink>
          <NavLink to="rankings" className={({isActive}) => isActive
            ? 'bg-gray-700 px-2 py-1 rounded'
            : 'hover:bg-gray-700 px-2 py-1 rounded'}
          >
            Ranking
          </NavLink>

          {user.role === 'ADMIN' && (
            <>
              <NavLink to="admin" className={({isActive}) => isActive
                ? 'bg-gray-700 px-2 py-1 rounded'
                : 'hover:bg-gray-700 px-2 py-1 rounded'}
              >
                Admin Misiones
              </NavLink>
              <NavLink to="admin/rewards" className={({isActive}) => isActive
                ? 'bg-gray-700 px-2 py-1 rounded'
                : 'hover:bg-gray-700 px-2 py-1 rounded'}
              >
                Admin Recompensas
              </NavLink>
            </>
          )}
        </nav>
        <button
          onClick={onLogout}
          className="ml-auto bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </header>
      <main className="flex-1 bg-[#11132f] text-white p-6">
        <Outlet />
      </main>
    </div>
  );
}
