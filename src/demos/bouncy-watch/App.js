// App.js
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei';

function Watch({ paused, ...props }) {
  const { nodes, materials } = useGLTF('/dist/assets/watch-v1.glb');
  const meshRef = useRef();

  // Apply hovering animation while preserving original orientation
  useFrame((state) => {
    if (paused) return; // Skip updates if paused

    const t = state.clock.getElapsedTime(); // Get elapsed time

    // Adjust hover and minor rotation while keeping upright orientation
    meshRef.current.rotation.set(
      -Math.PI / 2, // Original X-axis rotation (upright position)
      Math.sin(t / 4) / 4, // Y-axis oscillation
      0 // No Z-axis tilt
    );
    meshRef.current.position.y = (1 + Math.sin(t / 2)) / 10; // Y-axis hover movement
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
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('bouncy-watch-container');
    containerRef.current = container;

    const parentSection = container.closest('section');
    if (!parentSection) {
      console.error('Parent section not found for #bouncy-watch-container');
      return;
    }

    const observer = new MutationObserver(() => {
      const isParentActive = parentSection.classList.contains('active');
      console.log('Parent section active state:', isParentActive);
      setPaused(!isParentActive);
    });

    observer.observe(parentSection, { attributes: true, attributeFilter: ['class'] });

    const initialActiveState = parentSection.classList.contains('active');
    console.log('Initial active state:', initialActiveState);
    setPaused(!initialActiveState);

    return () => observer.disconnect();

    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.set(0.1 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
      ref.current.position.y = (1 + Math.sin(t / 2)) / 10
    })
  }, []);

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={1024} castShadow />
      <PresentationControls
        global
        enabled={!paused} // Disable interaction when paused
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Watch paused={paused} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} />
      </PresentationControls>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={3} far={4} />
      <Environment preset="city" />
    </Canvas>
  );
}
