import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../../store';

const Water = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [shader, setShader] = useState<THREE.WebGLProgramParametersWithUniforms>();

  const clock = useGameStore((state) => state.clock);

  useFrame(() => {
    if (!meshRef.current) return;
    if (shader === undefined) return;
      
    shader.uniforms.uTime.value = clock.getElapsedTime();
  });

  const setCustomShader = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = { value: 0 };

    setShader(shader);
    
    shader.fragmentShader = shader.fragmentShader.replace(
      /* glsl*/`#include <color_pars_fragment>`,
      /* glsl*/`#include <color_pars_fragment>
        uniform float uTime;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      /* glsl*/`#include <color_fragment>`,
      /* glsl*/`#include <color_fragment>
        diffuseColor = vec4(0, 0, sin(uTime), 1);
      `
    );

    //console.log(shader.fragmentShader);
  }

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial onBeforeCompile={shader => setCustomShader(shader)}/>
    </mesh>
  );
}

export default Water;