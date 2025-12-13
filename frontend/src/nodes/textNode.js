// textNode.js
import { useEffect, useMemo, useRef, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const vars = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  }, [currText]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [currText]);

  const inputHandles = variables.map((v, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${v}`,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` }
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        ...inputHandles,
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
      styleOverrides={{ minWidth: 260 }}
      body={
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="w-full border rounded px-2 py-1 text-xs resize-none overflow-hidden"
        />
      }
    />
  );
};
