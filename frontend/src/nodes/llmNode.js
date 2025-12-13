import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: '33%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: '66%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`
        }
      ]}
      body={
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-medium text-gray-700">Model</span>
          <span className="text-gray-500">Generic LLM</span>
        </div>
      }
    />
  );
};
