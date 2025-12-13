import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const MergeNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Merge"
            handles={[
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-input-1`,
                    style: { top: '30%' }
                },
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-input-2`,
                    style: { top: '55%' }
                },
                {
                    type: 'source',
                    position: Position.Right,
                    id: `${id}-output`
                }
            ]}
            body={
                <div className="text-xs text-gray-600">
                    Merges multiple inputs
                </div>
            }
        />
    );
};
