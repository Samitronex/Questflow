import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate, fetchUser } from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Al montar, intentamos recargar usuario desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('authUser'))
    if (stored?.id) {
      fetchUser(stored.id)
        .then(fresh => setUser(fresh))
        .catch(() => localStorage.removeItem('authUser'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Función de login
  const login = async ({ username, password }) => {
    const u = await authenticate({ username, password })
    setUser(u)
    localStorage.setItem('authUser', JSON.stringify({ id: u.id }))
    navigate('/profile')
  }

  // Función para registro + login inmediato
  const registerAndLogin = userObj => {
    setUser(userObj)
    localStorage.setItem('authUser', JSON.stringify({ id: userObj.id }))
    navigate('/profile')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, registerAndLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
