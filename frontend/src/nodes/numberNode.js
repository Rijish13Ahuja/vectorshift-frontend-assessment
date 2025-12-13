import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

export const NumberNode = ({ id, data }) => {
    const [value, setValue] = useState(data?.value ?? 0);

    return (
        <BaseNode
            id={id}
            title="Number"
            gradientColors={['#14b8a6', '#0d9488']}
            handles={[
                { type: 'source', position: Position.Right, id: `${id}-value` }
            ]}
            body={
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
                    Value
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(20, 184, 166, 0.3)',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            fontSize: '12px',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#14b8a6';
                            e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(20, 184, 166, 0.3)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </label>
            }
        />
    );
};
