// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` }
      ]}
      body={
        <div className="flex flex-col gap-2">
          <label className="flex flex-col text-xs">
            Name
            <input
              type="text"
              value={currName}
              onChange={(e) => setCurrName(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-xs">
            Type
            <select
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Text">Text</option>
              <option value="File">Image</option>
            </select>
          </label>
        </div>
      }
    />
  );
};
