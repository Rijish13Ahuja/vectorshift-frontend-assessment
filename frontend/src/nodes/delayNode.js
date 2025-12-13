import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

const DelayNode = ({ id, data }) => {
    const [seconds, setSeconds] = useState(data?.seconds ?? 1);

    return (
        <BaseNode
            id={id}
            title="Delay"
            gradientColors={['#6366f1', '#4f46e5']}
            handles={[
                { type: 'target', position: Position.Left, id: `${id}-input` },
                { type: 'source', position: Position.Right, id: `${id}-output` }
            ]}
            body={
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
                    Seconds
                    <input
                        type="number"
                        min="0"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            fontSize: '12px',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </label>
            }
        />
    );
};
