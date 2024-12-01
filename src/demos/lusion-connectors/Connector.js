import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Model from './Model';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Connector({
  position,
  isGlass = false,
  materialProps,
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);

  useFrame(() => {
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2));
  });

  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {isGlass ? (
        <Model>
          <MeshTransmissionMaterial {...materialProps} />
        </Model>
      ) : (
        <Model {...props} />
      )}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  );
}
