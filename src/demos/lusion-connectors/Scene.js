import React from 'react';
import { Physics } from '@react-three/rapier';
import Connector from './Connector';
import Pointer from './Pointer';

export default function Scene({ connectors }) {
  return (
    <>
      <color attach="background" args={['#141622']} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      {/* Physics and 3D Objects */}
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
      </Physics>
    </>
  );
}
