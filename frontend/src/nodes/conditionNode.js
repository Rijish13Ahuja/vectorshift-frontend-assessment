import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id }) => {
    return (
        <BaseNode
            id={id}
            title="Condition"
            handles={[
                {
                    type: 'target',
                    position: Position.Left,
                    id: `${id}-input`
                },
                {
                    type: 'source',
                    position: Position.Right,
                    id: `${id}-true`,
                    style: { top: '35%' }
                },
                {
                    type: 'source',
                    position: Position.Right,
                    id: `${id}-false`,
                    style: { top: '65%' }
                }
            ]}
            body={
                <div className="text-xs text-gray-600">
                    Routes based on condition
                </div>
            }
        />
    );
};
