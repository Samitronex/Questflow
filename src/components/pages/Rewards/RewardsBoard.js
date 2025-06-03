import React, { useEffect, useState } from 'react'
import { fetchRewards, redeemReward } from '../../../services/api'

export default function RewardsBoard({ user, onRefreshUser }) {
  const [rewards, setRewards] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRewards()
      .then(setRewards)
      .catch(err => {
        console.error("Error al cargar recompensas:", err)
        setError('No se pudieron cargar las recompensas.')
      })
  }, [])

  const handleRedeem = async (rewardId) => {
    try {
      await redeemReward(rewardId)
      if (onRefreshUser) await onRefreshUser()

      // > Aquí quitamos de la lista local la recompensa recién canjeada:
      setRewards(current => current.filter(r => r.id !== rewardId))
    } catch (e) {
      console.error("Error al canjear recompensa:", e)
      setError('No se pudo canjear la recompensa.')
    }
  }

  return (
    <div className="w-full px-8 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Recompensas</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {rewards.map(r => (
          <li key={r.id} className="flex justify-between items-start bg-[#313a65] rounded-2xl p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">{r.name}</h2>
              <p className="text-gray-300 mt-1">{r.description}</p>
              <p className="text-gray-400 mt-2"><strong>Precio:</strong> {r.cost} monedas</p>
            </div>
            <button
              onClick={() => handleRedeem(r.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Canjear
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
