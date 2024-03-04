import { create } from "zustand";

export interface IBlock {
  available: boolean
}

interface GameState {
  blocks: IBlock[],
  debug: boolean,
  startGame: () => void,
  startGameDebug: () => void,
  addBlock: (index: number) => void
}

const setBlockAvailable = (blocks : IBlock[], x: number, y: number) => {
  const blockIndex = (y * 4) + x;
  blocks[blockIndex].available = true;
}

const setBlockAvailableByIndex = (blocks : IBlock[], index: number) => {
  blocks[index].available = true;
}

const createGame = (blocks: IBlock[]) => {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = { available: false };
  }
  
  setBlockAvailable(blocks, 1, 1);
  setBlockAvailable(blocks, 1, 2);
  setBlockAvailable(blocks, 2, 1);
  setBlockAvailable(blocks, 2, 2);

  return blocks;
}

export const useGameStore = create<GameState>()((set, get) => ({
  blocks: new Array(16).fill({}),
  debug: false,
  
  startGame: () => {
    set((state: GameState) => {
      const blocks = [...state.blocks];
      createGame(blocks);
      return { blocks, debug: false };
    })
  },

  startGameDebug: () => {
    set((state: GameState) => {
      const blocks = [...state.blocks];
      createGame(blocks);
      return { blocks, debug: true };
    })
  },

  addBlock: (index: number) => {
    set((state: GameState) => {
      const blocks = [...state.blocks];
      setBlockAvailableByIndex(blocks, index);
      return { blocks, debug: state.debug };
    })
  }
}))