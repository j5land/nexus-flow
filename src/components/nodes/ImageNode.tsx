import { memo, useCallback } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { Upload, X } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export const ImageNode = memo(({ id, data, selected }: NodeProps) => {
  const { updateNodeData } = useReactFlow();

  const onUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        updateNodeData(id, { src: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  }, [id, updateNodeData]);

  const onRemove = useCallback(() => {
    updateNodeData(id, { src: undefined });
  }, [id, updateNodeData]);

  return (
    <div className={`relative group min-w-[150px] min-h-[100px] bg-card rounded-lg border-2 shadow-sm transition-colors ${selected ? 'border-primary' : 'border-border'}`}>
      <NodeResizer minWidth={100} minHeight={100} isVisible={selected} lineClassName="border-primary" handleClassName="h-3 w-3 bg-primary border-2 rounded" />
      
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
      
      <div className="p-2 w-full h-full flex flex-col">
        {data.src ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded bg-black/20">
            <img 
              src={data.src as string} 
              alt="Node content" 
              className="max-w-full max-h-full object-contain pointer-events-none" 
            />
            <button 
              onClick={onRemove}
              className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full p-4 border-2 border-dashed border-muted rounded hover:bg-muted/10 transition-colors">
            <label className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
              <Upload size={24} />
              <span className="text-xs font-medium">Upload Image</span>
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
    </div>
  );
});
