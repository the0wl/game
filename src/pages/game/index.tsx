import { OrbitControls } from '@react-three/drei'
import { Ground, Ocean, Lights, Chicken } from '../../components';

const Game = () => {
  return (
    <>
      <OrbitControls />
      <Lights />
      <Chicken position-y={0.5} scale={[0.015, 0.015, 0.015]} />
      <Ground />
      <Ocean />
    </>
  );
}

export default Game;