import BaseNode from './BaseNode';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      gradientColors={['#a855f7', '#7c3aed']}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-response` }
      ]}
      body={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              padding: '4px 10px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#fff'
            }}>
              AI Powered
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Generic LLM Model</span>
        </div>
      }
    />
  );
};