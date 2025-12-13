import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
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
      title="Input"
      gradientColors={['#10b981', '#059669']}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` }
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
                borderColor: focused === 'name' ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: focused === 'name' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
              }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
            Type
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              onFocus={() => setFocused('type')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                borderColor: focused === 'type' ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: focused === 'type' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
              }}
            >
              <option value="Text" style={{ background: '#1e293b' }}>Text</option>
              <option value="File" style={{ background: '#1e293b' }}>File</option>
            </select>
          </label>
        </div>
      }
    />
  );
};
