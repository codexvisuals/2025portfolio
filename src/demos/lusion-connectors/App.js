import React, { useReducer, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { Environment, Lightformer } from '@react-three/drei';
import useVisibility from '/src/shared/useVisibility';

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
  const canvasRef = useRef(null);
  const isVisible = useVisibility(canvasRef);

  const [accent, click] = useReducer((state) => ++state % accents.length, 0);

  // Generate connectors only when visible
  const connectors = useMemo(() => {
    if (!isVisible) return []; // Return an empty array when not visible

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
  }, [accent, isVisible]);

  return (
    <Canvas
      ref={canvasRef}
      concurrent
      onClick={click}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 20], fov: 20, near: 1, far: 30 }}
    >
      {isVisible && <Scene connectors={connectors} />}

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
