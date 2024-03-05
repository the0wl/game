import { create } from "zustand";
import * as THREE from "three";

export interface IBlock {
  available: boolean
}

interface GameState {
  blocks: IBlock[],
  debug: boolean,
  showInventory: boolean,
  clock: THREE.Clock,

  startGame: (debug: boolean) => void,
  addBlock: (index: number) => void,
  toggleInventoryVisibility: () => void,
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
  showInventory: false,
  clock: new THREE.Clock(),
  
  startGame: (debug: boolean = false) => {
    set((state: GameState) => {
      const blocks = [...state.blocks];
      const clock = state.clock;
      clock.start();
      createGame(blocks);
      return { ...state, blocks, debug, clock };
    })
  },

  addBlock: (index: number) => {
    set((state: GameState) => {
      const blocks = [...state.blocks];
      setBlockAvailableByIndex(blocks, index);
      
      return { ...state, blocks };
    })
  },

  toggleInventoryVisibility: () => {
    set((state: GameState) => {
      return { ...state, showInventory: !state.showInventory };
    })
  }
}))