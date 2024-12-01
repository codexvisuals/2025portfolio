import React, { useReducer, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { Environment, Lightformer } from '@react-three/drei';

const accents = ['#3f36a1', '#20ffa0', '#ff4060', '#ffcc00'];

// Shuffle function to generate connector properties
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
];

export default function App() {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);

  const connectors = useMemo(() => {
    const shuffled = shuffle(accent);

    // Add the glass connector explicitly
    return [
      ...shuffled,
      {
        position: [5, 5, 5], // Place the glass connector explicitly
        isGlass: true,
        materialProps: {
          clearcoat: 1,
          thickness: 0.2,
          anisotropicBlur: 0.5,
          chromaticAberration: 0.2,
          samples: 8,
          resolution: 512,
        },
      },
    ];
  }, [accent]);

  return (
    <Canvas
      onClick={click}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 20], fov: 20, near: 1, far: 30 }}
    >
      <Scene connectors={connectors} />

      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  );
}
