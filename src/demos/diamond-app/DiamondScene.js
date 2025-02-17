import React from 'react';
import {
  Center,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  useEnvironment,
} from '@react-three/drei';
import { EffectComposer, Bloom, N8AO, ToneMapping } from '@react-three/postprocessing';
import Ring from './Ring';

export default function DiamondScene({ mounting, diamonds }) {
  // Use useEnvironment to load the HDR environment map.
  const env = useEnvironment({
    files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr',
  });

  const shadow = {color: '#000000',}

  return (
    <>
      {/* Lighting setup */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <group position={[0, -0.25, 0]}>
        <Center top position={[0, -0.12, 0]} rotation={[-0.1, 0, 0.085]}>
          {/* Ring component using the environment map for reflections */}
          <Ring frame={mounting} diamonds={diamonds} env={env} scale={0.1} />
        </Center>
        <AccumulativeShadows temporal frames={100} color={shadow} opacity={1.05}>
          <RandomizedLight radius={5} position={[10, 5, -5]} />
        </AccumulativeShadows>
      </group>

      {/* Camera Controls */}
      <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} />

      {/* Post Processing Effects */}
      <EffectComposer>
        <N8AO aoRadius={0.15} intensity={4} distanceFalloff={2} />
        <Bloom luminanceThreshold={3.5} intensity={0.85} levels={9} mipmapBlur />
        <ToneMapping />
      </EffectComposer>

      {/* Environment setup for the scene's background */}
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr" background blur={1.5} />
    </>
  );
}
