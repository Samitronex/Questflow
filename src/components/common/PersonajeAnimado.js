import React from 'react';
import SpriteAnimator from 'react-sprite-animator';
import mageIdle from '../assets/sprites/mago/B_witch_idle.png'; 

const PersonajeAnimado = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-white mb-2">Mago</h2>
      <SpriteAnimator
        sprite={mageIdle}
        width={32}            // Ancho por frame
        height={36}           // Alto por frame
        fps={6}               // Velocidad de la animación
        scale={3}             // Escala para que no se vea muy pequeño
        frameCount={8}        // Número de frames
        wrapAfter={1}         // Porque es vertical
        direction="vertical"  // Muy importante para sprites en columna
      />
    </div>
  );
};

export default PersonajeAnimado;
