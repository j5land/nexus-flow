import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { Globe, ExternalLink } from 'lucide-react';

type BrowserNodeData = {
  url?: string;
};

export const BrowserNode = memo(({ id, data, selected }: NodeProps) => {
  const { updateNodeData } = useReactFlow();
  const nodeData = data as BrowserNodeData;
  const [urlInput, setUrlInput] = useState(nodeData.url || '');
  const [isEditing, setIsEditing] = useState(!nodeData.url);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = urlInput;
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`;
    }
    updateNodeData(id, { url: finalUrl });
    setIsEditing(false);
  }, [id, urlInput, updateNodeData]);

  const onEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className={`relative group w-full h-full bg-card rounded-lg border-2 shadow-sm transition-colors flex flex-col ${selected ? 'border-primary' : 'border-border'}`}>
      <NodeResizer minWidth={300} minHeight={200} isVisible={selected} lineClassName="border-primary" handleClassName="h-3 w-3 bg-primary border-2 rounded" />
      
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/20 rounded-t-lg handle">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Globe size={14} />
          <span>Browser</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="p-1 hover:text-primary transition-colors" title="Edit URL">
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
        {isEditing ? (
          <form onSubmit={onSubmit} className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-card z-10">
            <label className="text-sm font-medium mb-2 text-foreground">Enter Website URL</label>
            <input 
              type="text" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="example.com"
              className="w-full p-2 rounded bg-background border border-border focus:border-primary outline-none text-foreground mb-2"
              autoFocus
            />
            <button type="submit" className="px-4 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
              Load Page
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Note: Some websites block embedding via iframes.
            </p>
          </form>
        ) : (
          <iframe 
            src={nodeData.url} 
            className="w-full h-full border-none pointer-events-auto" 
            title="Browser Preview"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        )}
        
        {/* Overlay to allow dragging when not interacting with iframe */}
        {!selected && !isEditing && (
          <div className="absolute inset-0 bg-transparent pointer-events-none" />
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
    </div>
  );
});
