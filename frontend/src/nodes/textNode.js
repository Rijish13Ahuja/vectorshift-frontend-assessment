// textNode.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

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
      gradientColors={['#ec4899', '#db2777']}
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
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '12px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            minHeight: '60px',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#ec4899';
            e.target.style.boxShadow = '0 0 0 3px rgba(236, 72, 153, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(236, 72, 153, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
      }
    />
  );
};
