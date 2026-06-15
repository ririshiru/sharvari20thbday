import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// A beautiful glowing 3D geometric shape fallback
function GeometricFallback() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

    if (groupRef.current) {
      // Smooth continuous rotation combined with scroll position
      groupRef.current.rotation.y = scrollPercent * Math.PI * 2.5 + time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.15 + scrollPercent * 0.8;
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer neon wireframe wire cage */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          wireframe 
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Inner glass/crystal core */}
      <mesh scale={[0.9, 0.9, 0.9]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshPhysicalMaterial 
          color="#ec4899" 
          roughness={0.1}
          metalness={0.8}
          transmission={0.7}
          thickness={1.2}
          transparent
          opacity={0.85}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
}

// Inner GLB loading component
function GLBModel({ url }) {
  const groupRef = useRef();
  
  // This will throw a promise (caught by Suspense) or throw an error (caught by ErrorBoundary)
  const gltf = useGLTF(url);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

    if (groupRef.current) {
      // Scroll-linked model rotation and scaling
      groupRef.current.rotation.y = scrollPercent * Math.PI * 2.2 + time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.08 + scrollPercent * 0.4;
      groupRef.current.position.y = Math.sin(time * 1.0) * 0.15;
      
      // Scale dynamically slightly with scroll for depth
      const targetScale = 1.6 + scrollPercent * 0.4;
      groupRef.current.scale.setScalar(targetScale);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// Custom React Error Boundary to catch 3D loading errors gracefully
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Model load error (could be missing file):", error);
  }

  render() {
    if (this.state.hasError) {
      return <GeometricFallback />;
    }
    return this.props.children;
  }
}

export default function Model({ url = '/model.glb' }) {
  return (
    <ModelErrorBoundary>
      <GLBModel url={url} />
    </ModelErrorBoundary>
  );
}

// Pre-load the GLTF to speed up rendering
try {
  useGLTF.preload('/model.glb');
} catch (e) {
  // Ignored in case model.glb doesn't exist yet
}
