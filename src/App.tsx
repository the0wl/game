import { Canvas } from '@react-three/fiber'
import Game from './pages/game'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier';
import { Stats } from '@react-three/drei'
import { UI } from './components';
import { useGameStore } from './store';

function App() {
  const debug = useGameStore((state) => state.debug);

  return (
    <div className='w-screen h-screen'>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 42 }}
      >
        <color attach="background" args={['rgb(191, 219, 254)']} />
        <Suspense>
          <Physics>
            <Game />
          </Physics>
        </Suspense>
        { debug && <Stats/> }
      </Canvas>
      <UI />
    </div>
  )
}

export default App;
