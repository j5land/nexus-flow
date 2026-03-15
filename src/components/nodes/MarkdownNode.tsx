import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { FileText, Edit3, Check, Table, Code, Image, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownNodeData = {
  content?: string;
};

export const MarkdownNode = memo(({ id, data, selected }: NodeProps) => {
  const { updateNodeData, deleteElements } = useReactFlow();
  const nodeData = data as MarkdownNodeData;
  const [content, setContent] = useState(nodeData.content || '# Hello Markdown\n\nThis is a **rich text** node.\n\n| Feature | Status |\n| :--- | :--- |\n| Tables | ✅ |\n| Code | ✅ |\n\n```js\nconsole.log("Hello World");\n```');
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Sync content state when data prop changes
  useEffect(() => {
    if (nodeData.content !== undefined) {
      setContent(nodeData.content);
    }
  }, [nodeData.content]);

  const saveContent = useCallback(() => {
    updateNodeData(id, { content });
    setIsEditing(false);
  }, [id, content, updateNodeData]);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const insertText = useCallback((textToInsert: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newContent = content.substring(0, start) + textToInsert + content.substring(end);
    setContent(newContent);
    
    // Restore focus and cursor position after React rerender
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [content]);

  const insertTable = () => insertText('\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n');
  const insertCodeBlock = () => insertText('\n```javascript\nconsole.log("Hello World");\n```\n');
  const insertImage = () => insertText('\n![Image Alt Text](https://placehold.co/600x400)\n');

  const handleDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  return (
    <div 
      className={`relative group w-full h-full bg-card rounded-lg border-2 shadow-sm transition-colors flex flex-col ${selected ? 'border-primary' : 'border-border'}`}
      onDoubleClick={!isEditing ? onDoubleClick : undefined}
    >
      <NodeResizer minWidth={200} minHeight={150} isVisible={selected} lineClassName="border-primary" handleClassName="h-3 w-3 bg-primary border-2 rounded" />
      
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/20 rounded-t-lg handle">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <FileText size={14} />
          <span>Markdown</span>
        </div>
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <div className="flex items-center gap-0.5 mr-2 border-r border-border pr-2">
                <button onClick={insertTable} className="p-1 hover:text-primary transition-colors" title="Insert Table">
                  <Table size={12} />
                </button>
                <button onClick={insertCodeBlock} className="p-1 hover:text-primary transition-colors" title="Insert Code Block">
                  <Code size={12} />
                </button>
                <button onClick={insertImage} className="p-1 hover:text-primary transition-colors" title="Insert Image">
                  <Image size={12} />
                </button>
              </div>
              <button onClick={saveContent} className="p-1 text-green-500 hover:text-green-400 transition-colors" title="Save">
                <Check size={12} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="p-1 hover:text-primary transition-colors" title="Edit">
                <Edit3 size={12} />
              </button>
              <button onClick={handleDelete} className="p-1 hover:text-destructive transition-colors" title="Delete">
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full h-full relative overflow-auto bg-[#1e1e1e] text-gray-200 p-4 nodrag cursor-text">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm"
            autoFocus
            onKeyDown={(e) => {
              // Allow saving with Ctrl+Enter or Cmd+Enter
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                saveContent();
              }
            }}
            placeholder="Type your markdown here..."
          />
        ) : (
          <div className="prose prose-invert prose-sm max-w-none 
            prose-headings:border-b prose-headings:border-border prose-headings:pb-1 prose-headings:mb-2
            prose-h1:text-2xl prose-h1:font-bold prose-h1:text-primary
            prose-h2:text-xl prose-h2:font-semibold prose-h2:text-foreground
            prose-h3:text-lg prose-h3:font-medium prose-h3:text-foreground
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-border prose-pre:rounded-md
            prose-code:text-[#ff6d5a] prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-table:border-collapse prose-table:w-full prose-table:my-4
            prose-th:border prose-th:border-border prose-th:bg-white/5 prose-th:p-2 prose-th:text-left
            prose-td:border prose-td:border-border prose-td:p-2
            prose-img:rounded-lg prose-img:shadow-md prose-img:border prose-img:border-border
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!bg-muted-foreground w-3 h-3 border-2 border-background" />
    </div>
  );
});
