import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { easing } from 'maath';

export default function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/dist/assets/c-transformed.glb');

  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
      {children}
    </mesh>
  );
}
