import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` }
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
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </div>
      }
    />
  );
};
