// src/components/pages/Profile/Profile.jsx
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

// Icono de monedas
import coinIcon from '../../../assets/icons/coin.png'

// Avatares RPG
import guerrero from '../../../assets/avatars/guerrero.png'
import mago     from '../../../assets/avatars/mago.png'
import soporte  from '../../../assets/avatars/soporte.png'
import asesino  from '../../../assets/avatars/asesino.png'

// Medallas RPG
import luchador   from '../../../assets/medals/luchador.png'
import superacion from '../../../assets/medals/superacion.png'
import intensidad from '../../../assets/medals/intensidad.png'
import defensa    from '../../../assets/medals/defensa.png'
import sabio      from '../../../assets/medals/sabio.png'

// Rangos RPG
import bronzeIcon   from '../../../assets/ranks/bronze.png'
import silverIcon   from '../../../assets/ranks/silver.png'
import goldIcon     from '../../../assets/ranks/gold.png'
import platinumIcon from '../../../assets/ranks/platinum.png'
import diamondIcon  from '../../../assets/ranks/diamond.png'

const avatarOptions = {
  Guerrero: guerrero,
  Mago: mago,
  Soporte: soporte,
  Asesino: asesino
}

const medalImages = {
  luchador,
  superacion,
  intensidad,
  defensa,
  sabio
}

const rankIcons = {
  Bronce: bronzeIcon,
  Plata: silverIcon,
  Oro: goldIcon,
  Platino: platinumIcon,
  Diamante: diamondIcon
}

export default function Profile({ user }) {
  // Destructuramos snake_case y renombramos
   const {
      username,
      email,
       coins,
       level,
       xp,
       xpToNext,
       weeklyTitle,
       weeklyTasks,
       avatarClass,
       titles = [],
       medals: backendMedals = []
     } = user

  // Fallback: si el backend no manda medallas, mostramos todas
  const allMedals = ['luchador','superacion','intensidad','defensa','sabio']
  const medalsToShow = backendMedals.length > 0 ? backendMedals : allMedals

  // Calcula rango según XP total
  const getRankByXP = xp => {
    if (xp >= 10000) return 'Diamante'
    if (xp >= 5000)  return 'Platino'
    if (xp >= 2500)  return 'Oro'
    if (xp >= 1000)  return 'Plata'
    return 'Bronce'
  }
  const currentRank = getRankByXP(xp)

  // Animación de barra de XP
  const xpControls = useAnimation()
  useEffect(() => {
    const pct = Math.min((xp / xpToNext) * 100, 100)
    xpControls.start({
      width: `${pct}%`,
      transition: { duration: 1.2, ease: 'easeOut' }
    })
  }, [xp, xpToNext, xpControls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07091d] to-[#11132f] flex justify-center py-10">
      <motion.div
        className="w-full max-w-5xl bg-[#1f2545] rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cabecera morada */}
        <div className="h-44 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900" />

        {/* Avatar animé + datos */}
        <div className="-mt-20 flex flex-col items-center">
          <motion.div
            className="w-44 h-44 rounded-full border-4 border-yellow-500 overflow-hidden shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <img
              src={avatarOptions[avatarClass] || asesino}
              alt={avatarClass}
              className="w-full h-full object-contain"
            />
          </motion.div>
          <h1 className="mt-4 text-5xl font-bold text-white drop-shadow-lg">
            {username}
          </h1>
          <p className="text-gray-300 text-sm mb-1">{email}</p>
          <span className="text-indigo-300 text-lg">{avatarClass}</span>
        </div>

        {/* Estadísticas superior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
          {/* Monedas */}
          <motion.div
            className="bg-[#313a65] p-6 rounded-2xl shadow-lg flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={coinIcon} alt="Monedas" className="w-10 h-10 mb-3" />
            <p className="text-gray-400 uppercase text-sm mb-1">Monedas</p>
            <p className="text-3xl font-bold text-white">{coins}</p>
          </motion.div>

          {/* Nivel + XP */}
          <motion.div
            className="bg-[#313a65] p-6 rounded-2xl shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-400 uppercase text-xl font-semibold mb-2">
              Nivel {level}
            </p>
            <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
              <motion.div
                className="bg-green-400 h-3"
                initial={{ width: 0 }}
                animate={xpControls}
              />
            </div>
            <p className="text-xs text-gray-200 mt-1">
              {xp} / {xpToNext} XP
            </p>
          </motion.div>

          {/* Rango */}
          <motion.div
            className={`flex flex-col items-center p-6 rounded-2xl shadow-lg ${
              currentRank === 'Diamante'
                ? 'bg-gradient-to-br from-blue-700 to-cyan-500 border-2 border-cyan-400'
                : 'bg-[#313a65]'
            }`}
            whileHover={{ scale: currentRank === 'Diamante' ? 1.1 : 1.05 }}
            animate={
              currentRank === 'Diamante'
                ? { opacity: [0.9, 1, 0.9], scale: [1, 1.05, 1] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img
              src={rankIcons[currentRank]}
              alt={currentRank}
              className={`mb-2 ${
                currentRank === 'Diamante' ? 'w-32 h-32' : 'w-20 h-20'
              }`}
            />
            <p className="text-gray-100 uppercase text-xs tracking-wide">
              Rango
            </p>
            <p className="text-xl font-semibold text-white mt-1">
              {currentRank}
            </p>
          </motion.div>

          {/* Título Semanal */}
          <motion.div
            className="bg-[#313a65] p-6 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-400 uppercase text-xs">Título Semanal</p>
            <p className="text-lg font-semibold mt-1 text-white">
              {weeklyTitle}
            </p>
            <p className="text-sm text-gray-200 mt-1">
              {weeklyTasks} tareas completadas
            </p>
          </motion.div>
        </div>

        {/* Títulos RPG (si hay) */}
        {titles.length > 0 && (
          <div className="px-10 mb-8">
            <div className="bg-[#313a65] p-6 rounded-2xl shadow-lg">
              <p className="text-xs uppercase text-gray-400 mb-2">Títulos RPG</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {titles.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Medallas */}
        {medalsToShow.length > 0 && (
          <div className="px-10 mt-16 pb-12">
            <div className="bg-[#313a65] p-8 rounded-3xl shadow-2xl">
              <p className="text-sm uppercase text-gray-400 mb-6 text-center tracking-wide">
                Logros / Medallas
              </p>
              <div className="flex justify-center gap-16">
                {medalsToShow.map((m, i) => (
                  <motion.img
                    key={i}
                    src={medalImages[m]}
                    alt={m}
                    className="w-24 h-24 drop-shadow-xl"
                    whileHover={{ scale: 1.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
