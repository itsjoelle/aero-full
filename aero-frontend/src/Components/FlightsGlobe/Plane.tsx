import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { convertLatLonTo3D } from '../../helpers/convertCoordinates';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Flight } from './Planes';

interface PlaneProps {
  flight: Flight;
}

const Plane = ({ flight }: PlaneProps) => {
  const positionRef = useRef(
    convertLatLonTo3D(flight.latitude, flight.longitude, 2 / 5000)
  );

  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const clonedScene = clone(gltf.scene);

  const ref = useRef<Mesh>(null);
  const normal = new THREE.Vector3(...positionRef.current).normalize();

  // Create rotation quaternion to align with the normal
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

  useEffect(() => {
    clonedScene.traverse((node) => {
      if (node.isMesh) {
        node.material = new MeshStandardMaterial({
          color: 'maroon',
          opacity: 1,
        });
      }
    });
  }, [clonedScene]);

  return (
    <mesh
      quaternion={quaternion}
      position={[
        positionRef.current[0],
        positionRef.current[1] + 0.8,
        positionRef.current[2],
      ]}
      scale={0.2}
      ref={ref}
      castShadow
      receiveShadow
    >
      <primitive object={clonedScene} />
    </mesh>
  );
};

export default Plane;
