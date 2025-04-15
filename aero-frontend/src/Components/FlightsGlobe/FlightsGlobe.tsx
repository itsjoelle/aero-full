import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useErrorBoundary } from 'use-error-boundary';
import styles from './FlightsGlobe.module.css';
import Scene from './Scene';

const FlightsGlobe = () => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <div className={styles.globusContainer}>
      <ErrorBoundary>
        <Canvas camera={{ position: [10, 10, 10], fov: 30, near: 1, far: 500 }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={20.5} />
          <Scene />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default FlightsGlobe;
