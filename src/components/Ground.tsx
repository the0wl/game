import GroundBlock from "./GroundBlock";
import { useEffect } from 'react';
import { useGameStore, IBlock } from './../store';
import * as THREE from 'three';

const Ground = () => {
  const positions: THREE.Vector3[] = [ 
    new THREE.Vector3(-5,0,-5), new THREE.Vector3(-5,0,0), new THREE.Vector3(-5,0,5), new THREE.Vector3(-5,0,10), 
    new THREE.Vector3(0,0,-5), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,10), 
    new THREE.Vector3(5,0,-5), new THREE.Vector3(5,0,0), new THREE.Vector3(5,0,5), new THREE.Vector3(5,0,10),
    new THREE.Vector3(10,0,-5), new THREE.Vector3(10,0,0), new THREE.Vector3(10,0,5), new THREE.Vector3(10,0,10) 
  ];

  const startGame = useGameStore((state) => state.startGame);
  const blocks = useGameStore((state) => state.blocks);

  useEffect(() => {
    startGame();
  }, []);

  return (
    <mesh>
      { 
        blocks && blocks.map((block: IBlock, index: number) => {
          return (
            <GroundBlock 
              key={index}
              index={index}
              position={positions[index]}
              available={block.available}/>
          )})
      }
    </mesh>
  );
}

export default Ground