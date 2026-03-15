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
import { Image, Globe, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const nodeTypes: NodeTypes = {
  image: ImageNode,
  browser: BrowserNode,
  markdown: MarkdownNode,
};

function BoardContent() {
  const { t } = useTranslation();
  const { currentNodes, currentEdges, updateBoardData, currentBoardId, isLoading } = useBoardStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isInitialized, setIsInitialized] = useState(false);

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
  }, [setNodes]);

  if (!currentBoardId || isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        {isLoading ? t('common.loading') : t('common.selectBoard')}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background text-foreground">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
        className="bg-background"
        minZoom={0.1}
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Background color="#3e4149" gap={20} size={1} />
        <Controls className="bg-card border-border text-foreground fill-foreground" />
        
        <Panel position="top-center" className="flex gap-1.5 p-1.5 bg-[#2d3036]/90 backdrop-blur-sm rounded-full border border-[#3e4149] shadow-xl translate-y-2">
          <button 
            onClick={addImageNode}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#3e4149] text-gray-300 hover:text-white transition-all rounded-full text-xs font-semibold group"
            title={t('common.add') + ' ' + t('common.image')}
          >
            <Image size={16} className="text-[#ff6d5a] group-hover:scale-110 transition-transform" />
            <span>{t('common.image')}</span>
          </button>
          
          <div className="w-[1px] h-6 bg-[#3e4149] my-auto" />
          
          <button 
            onClick={addBrowserNode}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#3e4149] text-gray-300 hover:text-white transition-all rounded-full text-xs font-semibold group"
            title={t('common.add') + ' ' + t('common.browser')}
          >
            <Globe size={16} className="text-[#3b82f6] group-hover:scale-110 transition-transform" />
            <span>{t('common.browser')}</span>
          </button>

          <div className="w-[1px] h-6 bg-[#3e4149] my-auto" />

          <button 
            onClick={addMarkdownNode}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#3e4149] text-gray-300 hover:text-white transition-all rounded-full text-xs font-semibold group"
            title={t('common.add') + ' ' + t('common.markdown')}
          >
            <FileText size={16} className="text-[#10b981] group-hover:scale-110 transition-transform" />
            <span>{t('common.markdown')}</span>
          </button>
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
