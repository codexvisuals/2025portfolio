import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import DiamondScene from './DiamondScene';
console.log('DiamondScene Component:', DiamondScene);

export default function DiamondApp() {
  const { shadow, mounting, diamonds } = useControls({
    shadow: '#000000',
    mounting: '#fff0f0',
    diamonds: '#ffffff',
  });

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [-5, 5, 14], fov: 20 }}
    >
      <DiamondScene mounting={mounting} diamonds={diamonds} shadow={shadow} />
    </Canvas>
  );
}
