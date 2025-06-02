import React, { useEffect, useState } from 'react'
import crownIcon from '../../../assets/icons/crownn.png'
import { fetchRankings } from '../../../services/api'

export default function RankingsBoard() {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    fetchRankings()
      .then(data => setRankings(data))
      .catch(err => {
        console.error("Error cargando ranking:", err)
        setRankings([])
      })
  }, [])

  return (
    <div className="w-full px-8 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Ranking</h1>

      {rankings.length === 0 ? (
        <p className="text-center text-gray-400">No hay datos para mostrar.</p>
      ) : (
        <ul className="space-y-4">
          {rankings.slice(0, 20).map((r, i) => (
            <li
              key={r.userId}
              className="w-full bg-[#313a65] rounded-2xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {i === 0 && (
                  <img src={crownIcon} alt="🥇" className="w-18 h-14 animate-pulse" />
                )}
                <span className="text-white text-xl font-semibold">
                  {i + 1}. {r.username}
                </span>
              </div>
              <span className="text-gray-300 text-lg font-mono">
                Nivel {r.level} — {r.xpTotal} XP
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
