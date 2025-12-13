import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

export const MathNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Math"
            gradientColors={['#f97316', '#ea580c']}
            handles={[
                { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '33%' } },
                { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '66%' } },
                { type: 'source', position: Position.Right, id: `${id}-result` }
            ]}
            body={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        padding: '8px 12px',
                        background: 'rgba(249, 115, 22, 0.1)',
                        borderRadius: '8px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#f97316'
                    }}>
                        +
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Adds two numbers</span>
                </div>
            }
        />
    );
};
