import React from 'react';
import * as THREE from 'three';
import { useGLTF, MeshRefractionMaterial } from '@react-three/drei';

export default function Ring({ frame, diamonds, env, ...props }) {
  const { nodes, materials } = useGLTF('/dist/assets/3-stone-transformed.glb');

  if (!nodes || !materials) {
    console.error("Could not load GLTF model. Ensure the path is correct.");
    return null; // Prevents rendering undefined meshes.
  }

  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial
          color={frame}
          roughness={0.15}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
      <instancedMesh
        castShadow
        args={[nodes.mesh_4.geometry, null, 65]}
        instanceMatrix={nodes.mesh_4.instanceMatrix}
      >
        <MeshRefractionMaterial
          color={diamonds}
          side={THREE.DoubleSide}
          envMap={env}
          aberrationStrength={0.02}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

