import { useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Board } from '../components/Board';
import { useBoardStore } from '../store/useBoardStore';

export default function Home() {
  // We no longer need to auto-create board here, the store init handles it.
  const { currentBoardId, isLoading } = useBoardStore();

  return (
    <div className="flex w-full h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative h-full">
        {currentBoardId && !isLoading ? (
          <Board />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            {isLoading ? 'Loading Workspace...' : 'Select a board to start'}
          </div>
        )}
      </main>
    </div>
  );
}
