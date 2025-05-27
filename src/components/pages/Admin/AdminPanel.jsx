// src/components/pages/Admin/AdminPanel.jsx
import React, { useEffect, useState } from 'react'
import {
  fetchUsers,
  fetchAllMissions,
  createMission,
  deleteMission,
  fetchUserMissions,
  fetchUserCompletedMissions,
  assignMissionToUser,
  revokeMissionFromUser,
} from '../../../services/api'

const DIFFICULTIES = [
  { label: 'Fácil', value: 'EASY' },
  { label: 'Media', value: 'MEDIUM' },
  { label: 'Difícil', value: 'HARD' },
]

export default function AdminPanel() {
  const [users, setUsers]               = useState([])
  const [missions, setMissions]         = useState([])
  const [pending, setPending]           = useState({}) // { userId: [missions] }
  const [completed, setCompleted]       = useState({}) // { userId: [completedDtos] }
  const [title, setTitle]               = useState('')
  const [difficulty, setDifficulty]     = useState('EASY')

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    const [us, ms] = await Promise.all([ fetchUsers(), fetchAllMissions() ])
    setUsers(us)
    setMissions(ms)
    // cargar para cada usuario sus pendientes
    const p = {}
    await Promise.all(us.map(async u => {
      p[u.id] = await fetchUserMissions(u.id)
    }))
    setPending(p)
  }

  // creación
  const doCreate = async e => {
    e.preventDefault()
    if (!title.trim()) return
    const m = await createMission({ title, description:'', difficulty, dueDate:null })
    setMissions(ms => [...ms, m])
    setTitle(''); setDifficulty('EASY')
  }

  // borrar global
  const doDeleteMission = async id => {
    if (!window.confirm('Borrar misión?')) return
    await deleteMission(id)
    setMissions(ms => ms.filter(m=>m.id!==id))
    setPending(p=>{
      const np={...p}
      Object.keys(np).forEach(uid=>{
        np[uid]=np[uid].filter(m=>m.id!==id)
      })
      return np
    })
  }

  // asignar
  const doAssign = async (uId,mId) => {
    if (!mId) return
    await assignMissionToUser(uId,mId)
    const updated = await fetchUserMissions(uId)
    setPending(p=>({...p,[uId]:updated}))
  }

  // revocar
  const doRevoke = async (uId,mId) => {
    if (!window.confirm('Revocar misión?')) return
    await revokeMissionFromUser(uId,mId)
    setPending(p=>({...p,[uId]:p[uId].filter(m=>m.id!==mId)}))
  }

  // cargar completadas
  const loadCompleted = async uId => {
    if (completed[uId]) {
      // ya cargadas: alternar oculto/visible borrando la clave
      setCompleted(c=>{
        const nc={...c}; delete nc[uId]; return nc
      })
    } else {
      const data = await fetchUserCompletedMissions(uId)
      setCompleted(c=>({...c,[uId]:data}))
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0e27] flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-8">

        <h1 className="text-4xl font-semibold text-white text-center">Admin Panel</h1>

        {/* Crear misión */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl text-white mb-4">Crear misión</h2>
          <form onSubmit={doCreate} className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              placeholder="Título de la misión"
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg"
              value={title} onChange={e=>setTitle(e.target.value)}
            />
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
              value={difficulty} onChange={e=>setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map(d=>(
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Crear
            </button>
          </form>
        </div>

        {/* Misiones Globales */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl text-white mb-4">Misiones existentes</h2>
          {missions.length===0
            ? <p className="text-gray-400">Sin misiones.</p>
            : (
              <ul className="space-y-2">
                {missions.map(m=>(
                  <li key={m.id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                    <span className="text-white">{m.title} <em className="text-gray-300">({m.difficulty})</em></span>
                    <button
                      onClick={()=>doDeleteMission(m.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Borrar
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        </div>

        {/* Usuarios */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl text-white mb-4">Usuarios & Misiones</h2>
          {users.map(u=>(
            <div key={u.id} className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{u.username}</h3>
                <div className="space-x-2">
                  <button
                    onClick={()=>loadCompleted(u.id)}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {completed[u.id] ? 'Ocultar completadas' : 'Ver completadas'}
                  </button>
                </div>
              </div>

              {/* Asignar */}
              <div className="flex mt-3 mb-2">
                <select
                  className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg"
                  defaultValue=""
                  onChange={e=>doAssign(u.id,e.target.value)}
                >
                  <option disabled value="">Asignar nueva misión…</option>
                  {missions.map(m=>(
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pendientes */}
              <p className="text-gray-300 mb-1">Pendientes:</p>
              {pending[u.id]?.length > 0 ? (
                <ul className="space-y-1 mb-2">
                  {pending[u.id].map(m=>(
                    <li key={m.id} className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">{m.title}</span>
                      <button
                        onClick={()=>doRevoke(u.id,m.id)}
                        className="text-yellow-400 hover:text-yellow-200 text-sm"
                      >
                        Revocar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm mb-2">— ninguna —</p>
              )}

              {/* Completadas */}
              {completed[u.id] && (
                <div className="mt-2 space-y-2">
                  <p className="text-gray-300">Completadas:</p>
                  {completed[u.id].length===0 ? (
                    <p className="text-gray-500 text-sm">— ninguna —</p>
                  ) : (
                    <ul className="space-y-2">
                      {completed[u.id].map(cm=>(
                        <li key={cm.missionId} className="bg-gray-600 p-3 rounded">
                          <p className="text-white font-semibold">{cm.title} ({cm.difficulty})</p>
                          <p className="text-gray-300 text-sm">Entregada: {new Date(cm.completedAt).toLocaleString()}</p>
                          <p className="text-gray-200 italic">“{cm.workDescription || '— sin descripción —'}”</p>
                          {cm.attachmentUrl && (
                            <a
                              href={cm.attachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 text-sm hover:underline"
                            >
                              📎 Ver adjunto
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
