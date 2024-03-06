import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

import vertex from './shaders/water/vertex.glsl';
import fragment from './shaders/water/fragment.glsl';
import { useGameStore } from '../../store';

const Water = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [shader, setShader] = useState<THREE.WebGLProgramParametersWithUniforms>();

  const clock = useGameStore((state) => state.clock);

  useFrame(() => {
    if (!meshRef.current) return;
    if (shader === undefined) return;
    
    shader.uniforms.uTime.value = clock.getElapsedTime() / 1000;
  });

  const setCustomShader = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = { value: 0 };
    setShader(shader);
  };

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial 
        vertexShader={vertex} 
        fragmentShader={fragment} 
        onBeforeCompile={(shader) => setCustomShader(shader)}
      />
    </mesh>
  );
}

export default Water;