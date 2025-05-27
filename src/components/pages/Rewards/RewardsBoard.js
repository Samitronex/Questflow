import React, { useEffect, useState } from 'react'
import { fetchRewards, redeemReward } from '../../../services/api'

export default function RewardsBoard({ user }) {
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    fetchRewards(user.id).then(setRewards).catch(console.error)
  }, [user.id])

  return (
    <div>
      <h1 className="text-3xl mb-4">Recompensas</h1>
      <ul className="space-y-4">
        {rewards.map(r => (
          <li key={r.id} className="flex justify-between bg-gray-700 p-4 rounded">
            <div>
              <h2>{r.name}</h2>
              <p>{r.description}</p>
              <p>Precio: {r.coins_cost}</p>
            </div>
            <button
              onClick={()=>{
                redeemReward(user.id, r.id)
                  .then(()=>fetchRewards(user.id).then(setRewards))
              }}
              className="bg-blue-600 px-4 rounded"
            >Canjear</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
