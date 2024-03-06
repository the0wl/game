import { Canvas } from '@react-three/fiber'
import Game from './pages/game'
import { Suspense, useEffect } from 'react'
import { Physics } from '@react-three/rapier';
import { Stats } from '@react-three/drei'
import { Inventory } from './components';
import { useGameStore } from './store';

function App() {
  const debug = useGameStore((state) => state.debug);
  const toggleInventoryVisibility = useGameStore((state) => state.toggleInventoryVisibility);

  useEffect(() => {
    function onDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === 'i') {
        toggleInventoryVisibility();
      }
    }
    
    document.addEventListener("keydown", onDocumentKeyDown, false);
    
    return () => {
      document.removeEventListener("keydown", onDocumentKeyDown, false);
    }
  }, [])

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
      <Inventory />
    </div>
  )
}

export default App;
