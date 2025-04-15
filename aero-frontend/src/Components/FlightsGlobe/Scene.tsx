import React, { useRef } from 'react';
import Globe from './Globe';
import Planes from './Planes';
import { Mesh } from 'three';

const Scene = () => {
  const ref = useRef<Mesh>(null);

  return (
    <group ref={ref}>
      <Globe />
      <Planes />
    </group>
  );
};

export default Scene;
