import { Board } from '../components/Board';
import { Sidebar } from '../components/layout/Sidebar';
import { useBoardStore } from '../store/useBoardStore';
import Empty from '../components/Empty';
import { useTheme } from '../context/ThemeContext';

export function Home() {
  const { currentBoardId } = useBoardStore();
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen w-full ${theme === 'dark' ? 'bg-[#1b1d21]' : 'bg-gray-50'}`}>
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden relative">
        {currentBoardId ? <Board /> : <Empty />}
      </main>
    </div>
  );
}
