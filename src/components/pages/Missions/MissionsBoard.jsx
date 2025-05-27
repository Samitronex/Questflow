import React, { useEffect, useState } from 'react'
import { fetchMissions, completeMission, fetchProfile } from '../../../services/api'
import coinIcon from '../../../assets/icons/coin.png'
import xpIcon   from '../../../assets/icons/xp.png'

export default function MissionsBoard({ onRefreshUser }) {
  const [missions, setMissions]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [modalMission, setModalMission] = useState(null)
  const [description, setDescription]   = useState('')
  const [attachment, setAttachment]     = useState(null)
  const [submitting, setSubmitting]     = useState(false)
  const [error, setError]               = useState('')

  // 1) Cargar misiones
  const loadMissions = async () => {
    setLoading(true)
    try {
      const data = await fetchMissions()
      setMissions(data)
    } catch (e) {
      console.error('❌ error en fetchMissions:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMissions()
  }, [])

  // 2) Modal
  const openModal = m => {
    setModalMission(m)
    setDescription('')
    setAttachment(null)
    setError('')
  }
  const closeModal = () => {
    setModalMission(null)
    setError('')
  }

  // 3) Completar
  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      await completeMission({
        missionId: modalMission.id,
        description,
        attachment
      })
      closeModal()
      await loadMissions()
      // ¡Aquí refrescamos el perfil!
      const updatedUser = await fetchProfile()
      onRefreshUser(updatedUser)
    } catch (e) {
      console.error(e)
      setError('No se pudo completar la misión. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Mis Misiones
      </h1>
      {loading ? (
        <p className="text-center text-gray-300">Cargando misiones…</p>
      ) : missions.length === 0 ? (
        <p className="text-center text-gray-500">
          ¡Enhorabuena! No tienes misiones pendientes.
        </p>
      ) : (
        <ul className="space-y-6">
          {missions.map(m => (
            <li key={m.id} className="w-full bg-gray-800 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">{m.title}</h2>
                <p className="text-gray-300 mt-1">{m.description}</p>
                <div className="flex items-center gap-6 text-gray-400 text-sm mt-4">
                  <span className="flex items-center gap-1">
                    <img src={xpIcon} alt="XP" className="w-5 h-5" />{m.xp_reward} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={coinIcon} alt="Monedas" className="w-5 h-5" />{m.coins_reward} monedas
                  </span>
                </div>
              </div>
              <button
                onClick={() => openModal(m)}
                className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
              >
                Completar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {modalMission && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Completar: {modalMission.title}
            </h2>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Descripción (opcional)</span>
              <textarea
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 text-gray-800 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                rows={4}
                placeholder="Detalla brevemente tu trabajo..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700 font-medium">Adjuntar fichero</span>
              <input
                type="file"
                className="mt-1 block w-full text-gray-800"
                onChange={e => setAttachment(e.target.files[0])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {submitting ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
