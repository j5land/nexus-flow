import { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Connection, 
  Edge, 
  NodeTypes,
  Panel,
  ReactFlowProvider
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { ImageNode } from './nodes/ImageNode';
import { BrowserNode } from './nodes/BrowserNode';
import { MarkdownNode } from './nodes/MarkdownNode';
import { useBoardStore } from '../store/useBoardStore';
import { Image, Globe, FileText, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const nodeTypes: NodeTypes = {
  image: ImageNode,
  browser: BrowserNode,
  markdown: MarkdownNode,
};

function BoardContent() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currentNodes, currentEdges, updateBoardData, currentBoardId, isLoading } = useBoardStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  // Sync store data to local state ONLY when board ID changes or loading finishes
  useEffect(() => {
    if (!isLoading && currentBoardId) {
      setNodes(currentNodes);
      setEdges(currentEdges);
      setIsInitialized(true);
    } else if (isLoading) {
      // Reset initialization when starting to load a new board
      setIsInitialized(false);
    }
  }, [currentBoardId, isLoading, currentNodes, currentEdges, setNodes, setEdges]); 
  
  // Notice we added currentNodes/currentEdges back to dependencies.
  // WHY? Because when Store finishes loading DB asynchronously, isLoading becomes false, 
  // AND currentNodes is updated. We MUST react to that update.
  
  // Save changes to store (debounced)
  useEffect(() => {
    // IMPORTANT: Only save if initialized IS TRUE.
    if (currentBoardId && !isLoading && isInitialized) {
      const timer = setTimeout(() => {
        updateBoardData(currentBoardId, nodes, edges);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [nodes, edges, currentBoardId, updateBoardData, isLoading, isInitialized]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#ff6d5a' } }, eds)),
    [setEdges]
  );

  const addImageNode = useCallback(() => {
    const newNode = {
      id: uuidv4(),
      type: 'image',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { src: '' },
    };
    setNodes((nds) => [...nds, newNode]);
    setIsToolbarOpen(false);
  }, [setNodes]);

  const addBrowserNode = useCallback(() => {
    const newNode = {
      id: uuidv4(),
      type: 'browser',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { url: '' },
      style: { width: 800, height: 600 },
    };
    setNodes((nds) => [...nds, newNode]);
    setIsToolbarOpen(false);
  }, [setNodes]);

  const addMarkdownNode = useCallback(() => {
    const newNode = {
      id: uuidv4(),
      type: 'markdown',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { content: '# New Markdown Node\n\nEdit me!' },
      style: { width: 300, height: 200 },
    };
    setNodes((nds) => [...nds, newNode]);
    setIsToolbarOpen(false);
  }, [setNodes]);

  if (!currentBoardId || isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        {isLoading ? t('common.loading') : t('common.selectBoard')}
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'bg-[#1b1d21] text-white' : 'bg-white text-gray-900'}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode={theme}
        className={theme === 'dark' ? "bg-[#1b1d21]" : "bg-gray-50"}
        minZoom={0.1}
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Background color={theme === 'dark' ? "#3e4149" : "#e5e7eb"} gap={20} size={1} />
        <Controls 
          className={theme === 'dark' ? "react-flow__controls-dark" : "react-flow__controls-light"} 
          style={{
            backgroundColor: theme === 'dark' ? '#2d3036' : '#ffffff',
            borderColor: theme === 'dark' ? '#3e4149' : '#e5e7eb',
            fill: theme === 'dark' ? '#ffffff' : '#4b5563',
          }}
        />
        
        <Panel 
          position="top-center" 
          className="flex flex-col items-center gap-2 translate-y-2"
          onMouseEnter={() => setIsToolbarOpen(true)}
          onMouseLeave={() => setIsToolbarOpen(false)}
        >
          {/* Main Toggle Button */}
          <button 
            className={`
              w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${theme === 'dark' ? 'bg-[#2d3036] text-white border border-[#3e4149] hover:bg-[#3e4149]' : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'}
              ${isToolbarOpen ? 'rotate-45' : 'rotate-0'}
            `}
            title="Add Node"
          >
            <Plus size={16} />
          </button>

          {/* Expanded Toolbar */}
          <div className={`
            flex gap-1.5 p-1 backdrop-blur-sm rounded-full border shadow-xl
            transition-all duration-300 origin-top
            ${theme === 'dark' ? 'bg-[#2d3036]/90 border-[#3e4149]' : 'bg-white/90 border-gray-200'}
            ${isToolbarOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none absolute top-10'}
          `}>
            <button 
              onClick={addImageNode}
              className={`flex items-center gap-1.5 px-3 py-1.5 bg-transparent transition-all rounded-full text-xs font-semibold group
                ${theme === 'dark' ? 'hover:bg-[#3e4149] text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
              `}
              title={t('common.add') + ' ' + t('common.image')}
            >
              <Image size={14} className="text-[#ff6d5a] group-hover:scale-110 transition-transform" />
              <span>{t('common.image')}</span>
            </button>
            
            <div className={`w-[1px] h-5 my-auto ${theme === 'dark' ? 'bg-[#3e4149]' : 'bg-gray-200'}`} />
            
            <button 
              onClick={addBrowserNode}
              className={`flex items-center gap-1.5 px-3 py-1.5 bg-transparent transition-all rounded-full text-xs font-semibold group
                ${theme === 'dark' ? 'hover:bg-[#3e4149] text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
              `}
              title={t('common.add') + ' ' + t('common.browser')}
            >
              <Globe size={14} className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
              <span>{t('common.browser')}</span>
            </button>

            <div className={`w-[1px] h-5 my-auto ${theme === 'dark' ? 'bg-[#3e4149]' : 'bg-gray-200'}`} />

            <button 
              onClick={addMarkdownNode}
              className={`flex items-center gap-1.5 px-3 py-1.5 bg-transparent transition-all rounded-full text-xs font-semibold group
                ${theme === 'dark' ? 'hover:bg-[#3e4149] text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
              `}
              title={t('common.add') + ' ' + t('common.markdown')}
            >
              <FileText size={14} className="text-[#10b981] group-hover:scale-110 transition-transform" />
              <span>{t('common.markdown')}</span>
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export function Board() {
  const { currentBoardId } = useBoardStore();
  return (
    <ReactFlowProvider key={currentBoardId}>
      <BoardContent />
    </ReactFlowProvider>
  );
}
