// outputNode.js
import BaseNode from './BaseNode';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const [focused, setFocused] = useState(null);

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '12px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      gradientColors={['#3b82f6', '#2563eb']}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` }
      ]}
      body={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
            Name
            <input
              type="text"
              value={currName}
              onChange={(e) => setCurrName(e.target.value)}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                borderColor: focused === 'name' ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: focused === 'name' ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
              }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
            Type
            <select
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
              onFocus={() => setFocused('type')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                borderColor: focused === 'type' ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: focused === 'type' ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
              }}
            >
              <option value="Text" style={{ background: '#1e293b' }}>Text</option>
              <option value="File" style={{ background: '#1e293b' }}>Image</option>
            </select>
          </label>
        </div>
      }
    />
  );
};
