import { Plus, Trash2, FileText, ChevronLeft, ChevronRight, Edit2, Workflow, Box } from 'lucide-react';
import { useBoardStore } from '../../store/useBoardStore';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { HelpModal } from '../HelpModal';
import { useTranslation } from 'react-i18next';

export function Sidebar() {
  const { t } = useTranslation();
  const { boards, currentBoardId, createBoard, deleteBoard, setCurrentBoard, updateBoardName, init } = useBoardStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // Init store on mount
  useEffect(() => {
    init();
  }, [init]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardName.trim()) {
      createBoard(newBoardName);
      setNewBoardName('');
      setIsCreating(false);
    }
  };

  const startEditing = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setEditingBoardId(id);
    setEditName(name);
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) {
      updateBoardName(id, editName.trim());
    }
    setEditingBoardId(null);
  };

  const cancelEdit = () => {
    setEditingBoardId(null);
  };

  return (
    <aside 
      className={cn(
        "bg-[#1b1d21] border-r border-[#3e4149] flex flex-col h-screen text-gray-300 transition-all duration-300 relative select-none",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header / Logo Area */}
      <div className={cn(
        "h-16 border-b border-[#3e4149] flex items-center px-4 transition-all duration-300",
        isCollapsed ? "justify-center px-0" : "justify-between"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6d5a] to-[#ff8f7d] shadow-lg shadow-orange-500/20 shrink-0">
            <Workflow size={18} className="text-white" />
          </div>
          
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-white tracking-tight">Nexus</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Flow</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle - Integrated into the border */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[52px] w-6 h-6 bg-[#2d3036] border border-[#3e4149] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#ff6d5a] hover:bg-[#3e4149] transition-all z-20 shadow-sm"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {!isCollapsed && (
          <div className="px-4 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('common.workspaces')}</span>
            <button 
               onClick={() => setIsCreating(true)}
               className="p-1 text-gray-500 hover:text-[#ff6d5a] transition-colors rounded hover:bg-white/5"
               title={t('common.createBoard')}
            >
              <Plus size={14} />
            </button>
          </div>
        )}
        
        <div className="space-y-1 px-2">
          {boards.map((board) => {
            const isActive = currentBoardId === board.id;
            return (
              <div 
                key={board.id}
                className={cn(
                  "group relative flex items-center rounded-md cursor-pointer transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-[#ff6d5a]/10 to-transparent text-[#ff6d5a]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
                  isCollapsed ? "justify-center h-10 w-10 mx-auto" : "px-3 py-2"
                )}
                onClick={() => setCurrentBoard(board.id)}
                title={isCollapsed ? board.name : undefined}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#ff6d5a] rounded-r-full shadow-[0_0_8px_rgba(255,109,90,0.6)]" />
                )}

                {editingBoardId === board.id && !isCollapsed ? (
                  <div className="flex items-center gap-2 w-full pl-1" onClick={(e) => e.stopPropagation()}>
                    <Box size={18} className="shrink-0 text-[#ff6d5a]" />
                    <input
                      autoFocus
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-[#1b1d21] border border-[#ff6d5a] rounded px-2 py-1 text-sm outline-none text-white min-w-0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(board.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      onBlur={() => saveEdit(board.id)}
                    />
                  </div>
                ) : (
                  <>
                    <div className={cn("flex items-center justify-center shrink-0", isCollapsed ? "" : "mr-3")}>
                      <Box size={18} className={cn(isActive ? "text-[#ff6d5a]" : "group-hover:text-gray-200")} />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="truncate text-sm font-medium">{board.name}</span>
                        
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity absolute right-2 bg-[#1b1d21] shadow-[-8px_0_12px_#1b1d21]">
                          <button 
                            onClick={(e) => startEditing(e, board.id, board.name)}
                            className="p-1.5 hover:bg-[#3e4149] rounded hover:text-blue-400 transition-colors"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if(confirm(t('common.deleteBoardConfirm'))) {
                                  deleteBoard(board.id);
                              }
                            }}
                            className="p-1.5 hover:bg-[#3e4149] rounded hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}

          {/* Creation Form */}
          {!isCollapsed && isCreating && (
            <form onSubmit={handleCreate} className="px-2 mt-2">
              <div className="flex items-center gap-2 bg-[#1b1d21] border border-[#ff6d5a] rounded-md px-3 py-2">
                <Box size={18} className="text-[#ff6d5a] shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder={t('common.boardNamePlaceholder')}
                  className="w-full bg-transparent border-none text-sm outline-none text-white placeholder-gray-600"
                  onBlur={() => !newBoardName && setIsCreating(false)}
                />
              </div>
            </form>
          )}
          
          {/* Collapsed Add Button */}
          {isCollapsed && (
             <button 
               onClick={() => { setIsCollapsed(false); setIsCreating(true); }}
               className="w-10 h-10 mx-auto mt-2 flex items-center justify-center text-gray-500 hover:text-[#ff6d5a] hover:bg-white/5 rounded-md transition-colors border border-dashed border-gray-700 hover:border-[#ff6d5a]/50"
               title={t('common.createBoard')}
             >
               <Plus size={18} />
             </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-[#3e4149] flex items-center text-xs text-gray-500",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed ? (
            <>
                <span>{t('common.version')}</span>
                <button onClick={() => setShowHelp(true)} className="hover:text-gray-300 cursor-pointer">{t('common.help')}</button>
            </>
        ) : (
            <span className="text-[10px]">v1.2</span>
        )}
      </div>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </aside>
  );
}
