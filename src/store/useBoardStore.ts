import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Edge, Node } from '@xyflow/react';
import { getDB, saveAsset, getAsset } from '../lib/db';

export interface BoardMeta {
  id: string;
  name: string;
  createdAt: number;
}

export interface BoardContent {
  nodes: Node[];
  edges: Edge[];
}

interface BoardState {
  // Metadata list (lightweight)
  boards: BoardMeta[];
  currentBoardId: string | null;
  
  // Current loaded content (heavy)
  currentNodes: Node[];
  currentEdges: Edge[];
  isLoading: boolean;
  
  // Actions
  init: () => Promise<void>;
  createBoard: (name: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  updateBoardName: (id: string, name: string) => Promise<void>;
  setCurrentBoard: (id: string) => Promise<void>;
  updateBoardData: (id: string, nodes: Node[], edges: Edge[]) => Promise<void>;
  
  // Asset helpers
  saveImage: (file: File) => Promise<string>;
  getImageUrl: (id: string) => Promise<string | undefined>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  currentBoardId: null,
  currentNodes: [],
  currentEdges: [],
  isLoading: true,

  init: async () => {
    try {
      const db = await getDB();
      const boards = await db.getAll('boards');
      
      // Sort by createdAt desc
      boards.sort((a, b) => b.createdAt - a.createdAt);
      
      set({ boards, isLoading: false });
      
      // If we have boards but no current selection, select the first one
      if (boards.length > 0 && !get().currentBoardId) {
        get().setCurrentBoard(boards[0].id);
      } else if (boards.length === 0) {
        // Auto create first board if empty
        get().createBoard('My First Board');
      }
    } catch (error) {
      console.error('Failed to init DB:', error);
      set({ isLoading: false });
    }
  },

  createBoard: async (name: string) => {
    const id = uuidv4();
    const newBoard: BoardMeta = {
      id,
      name,
      createdAt: Date.now(),
    };
    
    // Save meta
    const db = await getDB();
    await db.put('boards', newBoard);
    
    // Save empty content
    await db.put('board-data', {
      id,
      nodes: [],
      edges: []
    });

    set((state) => ({
      boards: [newBoard, ...state.boards],
    }));
    
    // Switch to new board
    get().setCurrentBoard(id);
  },

  deleteBoard: async (id: string) => {
    const db = await getDB();
    await db.delete('boards', id);
    await db.delete('board-data', id);
    // TODO: Cleanup assets associated with this board if needed
    
    set((state) => {
      const newBoards = state.boards.filter((b) => b.id !== id);
      // If we deleted the current board, switch to another one
      if (state.currentBoardId === id) {
        const nextId = newBoards.length > 0 ? newBoards[0].id : null;
        if (nextId) {
           // We need to trigger load for the next board, but we can't await inside set
           // So we just set ID and rely on effect or explicit call? 
           // Better to call action.
           setTimeout(() => get().setCurrentBoard(nextId), 0);
        } else {
           // No boards left
           set({ currentBoardId: null, currentNodes: [], currentEdges: [] });
        }
      }
      return { boards: newBoards };
    });
  },

  updateBoardName: async (id: string, name: string) => {
    const db = await getDB();
    const board = await db.get('boards', id);
    if (board) {
      board.name = name;
      await db.put('boards', board);
      
      set((state) => ({
        boards: state.boards.map((b) =>
          b.id === id ? { ...b, name } : b
        ),
      }));
    }
  },

  setCurrentBoard: async (id: string) => {
    set({ isLoading: true, currentBoardId: id });
    
    try {
      const db = await getDB();
      const data = await db.get('board-data', id);
      
      if (data) {
        set({
          currentNodes: data.nodes || [],
          currentEdges: data.edges || [],
          isLoading: false
        });
      } else {
        console.warn('[Store] Board data not found, init empty');
        // Should not happen if data integrity is kept
        set({ currentNodes: [], currentEdges: [], isLoading: false });
      }
    } catch (error) {
      console.error('Failed to load board data:', error);
      set({ isLoading: false });
    }
  },

  updateBoardData: async (id: string, nodes: Node[], edges: Edge[]) => {
    // DO NOT update currentNodes/currentEdges here anymore!
    // Doing so triggers the Board.tsx sync useEffect, which overwrites React Flow's internal state
    // with the very state it just gave us, breaking internal interactions (like dragging/editing).
    // Let React Flow own the state of truth while editing.
    // We only update the DB asynchronously.
    
    try {
      // Async save
      const db = await getDB();
      // console.log(`[Store] Saving board ${id} with ${nodes.length} nodes and ${edges.length} edges`);
      
      // Ensure we are saving JSON-serializable data
      const serializedData = {
        id,
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges))
      };
      
      await db.put('board-data', serializedData);
      // console.log(`[Store] Save success`);
    } catch (error) {
      console.error('[Store] Save failed:', error);
    }
  },

  saveImage: async (file: File) => {
    return saveAsset(file);
  },

  getImageUrl: async (id: string) => {
    const blob = await getAsset(id);
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return undefined;
  }
}));
