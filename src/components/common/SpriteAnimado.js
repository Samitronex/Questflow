// src/components/common/SpriteAnimado.jsx
import React, { useState, useEffect } from 'react';

const SpriteAnimado = ({
  sprite,
  frameWidth, frameHeight,
  frameCount, fps = 4,
  scale = 2, direction = 'horizontal'
}) => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f+1)%frameCount), 1000/fps);
    return () => clearInterval(iv);
  }, [frameCount, fps]);
  const isArray = Array.isArray(sprite);
  const current = isArray ? sprite[frame] : sprite;
  const bgPos = isArray
    ? 'center'
    : direction === 'horizontal'
      ? `-${frame*frameWidth}px 0`
      : `0 -${frame*frameHeight}px`;
  const bgSize = isArray
    ? 'contain'
    : direction === 'horizontal'
      ? `${frameWidth*frameCount}px ${frameHeight}px`
      : `${frameWidth}px ${frameHeight*frameCount}px`;

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-[100px] h-[100px] rounded-full bg-green-400 opacity-30 blur-2xl animate-pulse z-0"/>
      <div
        className="z-10 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: `url(${current})`,
          backgroundPosition: bgPos,
          backgroundSize: bgSize,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transform: `scale(${scale})`
        }}
      />
    </div>
  );
};

export default SpriteAnimado;
