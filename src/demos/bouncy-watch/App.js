// App.js
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei';
import useVisibility from '/src/shared/useVisibility'; // Adjust the path

useGLTF.preload('/dist/assets/watch-v1.glb');

function Watch({ paused, ...props }) {
  const { nodes, materials } = useGLTF('/dist/assets/watch-v1.glb');
  const meshRef = useRef();

  useFrame((state) => {
    if (paused) return; // Skip updates when paused
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.set(-Math.PI / 2, Math.sin(t / 4) / 4, 0);
    meshRef.current.position.y = (1 + Math.sin(t / 2)) / 10;
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <mesh geometry={nodes.Object005_glass_0.geometry} material={materials.glass}>
        <Html scale={100} rotation={[Math.PI / 2, 0, 0]} position={[180, -350, 50]} transform occlude>
          <div className="annotation">
            6.550 $ <span style={{ fontSize: '1.5em' }}>🥲</span>
          </div>
        </Html>
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Object006_watch_0.geometry} material={materials.watch} />
    </group>
  );
}

export default function BouncyWatchScene() {
  const canvasRef = useRef(null);
  const isVisible = useVisibility(canvasRef); // Track visibility directly on the Canvas

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }} ref={canvasRef}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={1024} castShadow />
        <PresentationControls
        global
        enabled={isVisible} // Disable interaction when paused
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Watch paused={!isVisible} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} />
      </PresentationControls>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={3} far={4} />
      <Environment preset="city" />
    </Canvas>
  );
}