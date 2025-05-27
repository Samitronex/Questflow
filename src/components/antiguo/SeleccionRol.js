import React, { useState } from "react";
import SpriteAnimado from "./SpriteAnimado";

// Sprites individuales por rol
import asesino1 from "../assets/sprites/asesino/idle_1.png";
import asesino2 from "../assets/sprites/asesino/idle_2.png";
import asesino3 from "../assets/sprites/asesino/idle_3.png";
import asesino4 from "../assets/sprites/asesino/idle_4.png";
import asesino5 from "../assets/sprites/asesino/idle_5.png";
import asesino6 from "../assets/sprites/asesino/idle_6.png";

import mago1 from "../assets/sprites/mago/idle_1.png";
import mago2 from "../assets/sprites/mago/idle_2.png";
import mago3 from "../assets/sprites/mago/idle_3.png";
import mago4 from "../assets/sprites/mago/idle_4.png";
import mago5 from "../assets/sprites/mago/idle_5.png";

import chaman1 from "../assets/sprites/chaman/idle1.png";
import chaman2 from "../assets/sprites/chaman/idle2.png";
import chaman3 from "../assets/sprites/chaman/idle3.png";
import chaman4 from "../assets/sprites/chaman/idle4.png";
import chaman5 from "../assets/sprites/chaman/idle5.png";

import tanque1 from "../assets/sprites/tanque/idle1.png";
import tanque2 from "../assets/sprites/tanque/idle2.png";
import tanque3 from "../assets/sprites/tanque/idle3.png";
import tanque4 from "../assets/sprites/tanque/idle4.png";
import tanque5 from "../assets/sprites/tanque/idle5.png";
import tanque6 from "../assets/sprites/tanque/idle6.png";

// Aura segun rol
const getAuraColor = (rol) => {
  switch (rol) {
    case "Asesino":
      return "bg-red-500";
    case "Tanque":
      return "bg-yellow-300";
    case "Chamán":
      return "bg-green-500";
    case "Mago":
      return "bg-purple-600";
    default:
      return "bg-white";
  }
};

const roles = [
  {
    name: "Asesino",
    description: "Daño crítico y alta velocidad.",
    sprite: [asesino1, asesino2, asesino3, asesino4, asesino5, asesino6],
    frameWidth: 153,
    frameHeight: 85,
  },
  {
    name: "Tanque",
    description: "Alta defensa y vida.",
    sprite: [tanque1, tanque2, tanque3, tanque4, tanque5, tanque6],
    frameWidth: 88,
    frameHeight: 75,
  },
  {
    name: "Chamán",
    description: "Curación y apoyo espiritual.",
    sprite: [chaman1, chaman2, chaman3, chaman4, chaman5],
    frameWidth: 69,
    frameHeight: 51,
  },
  {
    name: "Mago",
    description: "Hechizos mágicos y daño elemental.",
    sprite: [mago1, mago2, mago3, mago4, mago5],
    frameWidth: 56,
    frameHeight: 67,
  },
];

const SeleccionRol = ({ onSelect }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const role = roles[currentRoleIndex];

  const nextRole = () =>
    setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
  const prevRole = () =>
    setCurrentRoleIndex((currentRoleIndex - 1 + roles.length) % roles.length);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Selecciona tu Rol</h2>

        <div className="relative">
          <div className="w-72 h-72 rounded-full border-4 border-white flex flex-col items-center justify-center bg-white/10 backdrop-blur-md shadow-lg text-center overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>

            <div className="relative flex items-center justify-center">
              {/* AURA + SPRITE */}
              <div
                className={`absolute w-28 h-28 rounded-full blur-xl opacity-60 animate-pulse ${getAuraColor(
                  role.name
                )}`}
              />
              <SpriteAnimado
                sprite={role.sprite}
                frameWidth={role.frameWidth}
                frameHeight={role.frameHeight}
                frameCount={role.sprite.length}
                fps={6}
                scale={1.5}
              />
            </div>

            <p className="text-sm text-white mt-2">{role.description}</p>
          </div>

          <button
            onClick={prevRole}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-gray-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-200"
          >
            {"<"}
          </button>
          <button
            onClick={nextRole}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-gray-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-200"
          >
            {">"}
          </button>
        </div>

        <button
          onClick={() => onSelect(role)}
          className="mt-8 px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition-all"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default SeleccionRol;
