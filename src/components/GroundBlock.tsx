import { Box } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from './../store';
import { Grass } from './Grass';

interface GroundBlockProps {
  position: THREE.Vector3;
  onPointerEnter?: ((event: ThreeEvent<PointerEvent>) => void) | undefined;
  available: boolean;
  index: number;
}

const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true,
  opacity: 0.5,
  transparent: true,
});

const GroundBlock = (props : GroundBlockProps) => {
  const debug = useGameStore((state) => state.debug);
  const addBlock = useGameStore((state) => state.addBlock);

  const fillMaterial = new THREE.MeshStandardMaterial({
    color: props.available ? 'green' : 'red',
    opacity: props.available ? 1 : 0.5,
    transparent: props.available ? false : true,
  });

  const handleOnPointerMove = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    if (!props.available) {
      event.object.visible = true; 
    }
  }

  const handleOnPointerLeave = (event: ThreeEvent<PointerEvent>) => {
    if (!props.available) {
      event.object.visible = false;
    }
  }

  const handleOnClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    addBlock(props.index);
  }

  return (
    <RigidBody 
      colliders={false} 
      type='fixed' 
      position={props.position}
    >
      <CuboidCollider args={[5/2, 1, 5/2]}/>
      
      {/* Cube */}
      <Box args={[5, 1, 5]}
        receiveShadow
        visible={ props.available}
        onPointerMove={handleOnPointerMove} 
        onPointerLeave={handleOnPointerLeave}
        onPointerDown={handleOnClick}
      >
        <meshStandardMaterial {...fillMaterial} />
      </Box>

      { props.available && <Grass position={[0, 0.5, 0]} scale={[1.5,1.5,1.5]} /> }

      {/* Wireframe */}
      { debug && (
        <Box args={[5, 1, 5]} receiveShadow >
          <meshBasicMaterial {...wireframeMaterial} />
        </Box>
      )}
    </RigidBody>
  );
}

export default GroundBlock