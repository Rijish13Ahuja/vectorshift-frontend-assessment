import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';


export const MergeNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Merge"
            gradientColors={['#06b6d4', '#0891b2']}
            handles={[
                { type: 'target', position: Position.Left, id: `${id}-input-1`, style: { top: '30%' } },
                { type: 'target', position: Position.Left, id: `${id}-input-2`, style: { top: '55%' } },
                { type: 'source', position: Position.Right, id: `${id}-output` }
            ]}
            body={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        display: 'flex',
                        gap: '4px'
                    }}>
                        {[1, 2].map(i => (
                            <div key={i} style={{
                                width: '6px',
                                height: '20px',
                                background: 'linear-gradient(180deg, #06b6d4, #0891b2)',
                                borderRadius: '3px'
                            }} />
                        ))}
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Merges multiple inputs</span>
                </div>
            }
        />
    );
};
