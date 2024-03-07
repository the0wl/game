import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Water } from 'three-stdlib'

extend({ Water })

const Ocean = () => {
  const ref = useRef<Water>()
  
  const gl = useThree((state) => state.gl)

  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])

  const config = useMemo(() => {
    if (waterNormals) {
        // WaterOptions
        return {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: false,
            format: gl.encoding
        };
    } else {
        return undefined;
    }
}, [waterNormals, gl.encoding]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.material.uniforms.time.value += delta;
  })
  
  return (
    <water 
      ref={ref} 
      args={[geom, config]}
      position={[0, -0.1, 0]}
      rotation-x={-Math.PI / 2}
    />
  );
}

export default Ocean;