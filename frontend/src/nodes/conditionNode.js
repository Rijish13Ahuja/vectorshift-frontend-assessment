import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, ReactFlow, useReactFlow } from 'reactflow';
import BaseNode from './BaseNode';
import 'reactflow/dist/style.css';

export const ConditionNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Condition"
            gradientColors={['#eab308', '#ca8a04']}
            handles={[
                { type: 'target', position: Position.Left, id: `${id}-input` },
                { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
                { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } }
            ]}
            body={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{
                            padding: '4px 8px',
                            background: 'rgba(234, 179, 8, 0.2)',
                            border: '1px solid rgba(234, 179, 8, 0.5)',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#eab308'
                        }}>
                            TRUE
                        </div>
                        <div style={{
                            padding: '4px 8px',
                            background: 'rgba(234, 179, 8, 0.1)',
                            border: '1px solid rgba(234, 179, 8, 0.3)',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#94a3b8'
                        }}>
                            FALSE
                        </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Routes based on condition</span>
                </div>
            }
        />
    );
};