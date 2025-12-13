import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const MathNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Math"
            handles={[
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-a`,
                    style: { top: '33%' }
                },
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-b`,
                    style: { top: '66%' }
                },
                {
                    type: 'source',
                    position: Position.Right,
                    id: `${id}-result`
                }
            ]}
            body={
                <div className="text-xs text-gray-600">
                    Adds two numbers
                </div>
            }
        />
    );
};
