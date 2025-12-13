import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const NumberNode = ({ id, data }) => {
    const [value, setValue] = useState(data?.value ?? 0);

    return (
        <BaseNode
            id={id}
            title="Number"
            handles={[
                { type: 'source', position: Position.Right, id: `${id}-value` }
            ]}
            body={
                <div className="flex flex-col gap-2">
                    <label className="flex flex-col text-xs">
                        Value
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </label>
                </div>
            }
        />
    );
};
