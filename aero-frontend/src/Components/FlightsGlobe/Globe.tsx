import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import earth from '../../assets/8k_earth_nightmap.jpg';

const Globe = () => {
  const globeRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, earth);

  return (
    <mesh ref={globeRef} scale={[1.2, 1.2, 1.2]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Globe;
