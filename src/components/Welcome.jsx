import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


import DragonSilhouette from '../assets/Ilustracion/DragonSilhouette.png'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      {/* === FORMAS DE FONDO RPG === */}
      <div className="absolute -top-48 -left-48 w-128 h-128 bg-purple-600 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-192 h-192 bg-indigo-700 rounded-full opacity-15 filter blur-2xl"></div>
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-blue-700 rounded-full opacity-15 filter blur-3xl"></div>

      {/* === SILUETA DE DRAGÓN (fondo decorativo) === */}
      <img
        src={DragonSilhouette}
        alt="Silueta de dragón"
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 
          w-[90%] md:w-[80%] 
          opacity-10 
          pointer-events-none 
          select-none
        "
      />

      {/* === CONTENEDOR PRINCIPAL: centrado vertical y horizontal === */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12">
        {/*
          Cambiamos a flex flex-col para apilar:
            1. Bloque de texto (QuestFlow + descripción + botones)
            2. Bloque de ilustración abajo
          Y se mantendrá centrado en toda la pantalla.
        */}
        <div className="flex flex-col items-center max-w-[800px] w-full">
          {/* ------------------------------ */}
          {/* SECCIÓN DE TEXTO */}
          {/* ------------------------------ */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
              QuestFlow
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-indigo-200 max-w-2xl mb-8">
              Organiza tu día, sube de nivel y conquista tus misiones diarias con un sistema gamificado tipo RPG.
              ¡Empieza tu aventura productiva ahora!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button
                onClick={() => nav('/login')}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 text-lg"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => nav('/register')}
                className="w-full sm:w-auto px-10 py-4 bg-white/90 text-indigo-800 font-bold rounded-2xl shadow-2xl hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-200 text-lg"
              >
                Registrarse
              </button>
            </div>
          </motion.div>

          {/* ------------------------------ */}
          {/* SECCIÓN DE ILUSTRACIÓN */}
          {/* ------------------------------ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mt-12 w-full flex justify-center"
          >
         
          </motion.div>
        </div>
      </div>
    </div>
  )
}
