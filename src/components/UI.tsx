import { useGameStore } from "../store";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='absolute top-0 w-full h-full bg-slate-950 bg-opacity-70'>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        { children }
      </div>
    </div>
  )
}

const UI = () => {
  const showInventory = useGameStore((state) => state.showInventory);

  return (
    <div>
      { showInventory && (
        <Background>
          <div></div>
        </Background>
      )}
    </div>
  );
}

export default UI;