import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Center, Float } from '@react-three/drei';
import Model from './Model';

// Simple R3F mesh fallback while the model is loading
function ModelLoadingSpinner() {
  return (
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <torusGeometry args={[0.8, 0.2, 16, 64]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function Canvas3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Background ambient lighting */}
      <ambientLight intensity={0.4} />

      {/* Main soft white highlight */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Stylized Neon Violet Spot Light */}
      <spotLight
        position={[-10, 8, -5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#8b5cf6"
      />

      {/* Stylized Neon Pink Spot Light */}
      <spotLight
        position={[10, -5, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.5}
        color="#ec4899"
      />

      {/* Center and Float wrapper to give a gentle baseline floating motion */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center>
          <Suspense fallback={<ModelLoadingSpinner />}>
            <Model url="/model.glb" />
          </Suspense>
        </Center>
      </Float>

      {/* Real-looking floor shadows */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={4.5}
      />
    </Canvas>
  );
}
