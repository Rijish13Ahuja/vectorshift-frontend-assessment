import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const DelayNode = ({ id, data }) => {
    const [seconds, setSeconds] = useState(data?.seconds ?? 1);

    return (
        <BaseNode
            id={id}
            title="Delay"
            handles={[
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-input`
                },
                {
                    type: 'source',
                    position: Position.Right,
                    id: `${id}-output`
                }
            ]}
            body={
                <div className="flex flex-col gap-2">
                    <label className="flex flex-col text-xs">
                        Seconds
                        <input
                            type="number"
                            min="0"
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </label>
                </div>
            }
        />
    );
};
