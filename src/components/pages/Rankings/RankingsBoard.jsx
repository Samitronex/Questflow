import React, { useEffect, useState } from 'react'
import crownIcon from '../../../assets/icons/crownn.png'
import { fetchRankings } from '../../../services/api'

export default function RankingsBoard({ user }) {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    fetchRankings(user.groupId)
      .then(setRankings)
      .catch(console.error)
  }, [user.groupId])

  return (
    <div className="w-full px-8 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Ranking</h1>
      <ul className="space-y-4">
        {rankings.slice(0, 20).map((r, i) => (
          <li
            key={r.user_id}
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
              Nivel {r.level} — {r.xp_total} XP
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
