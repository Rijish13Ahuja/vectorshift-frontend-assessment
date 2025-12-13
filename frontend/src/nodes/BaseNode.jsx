import { Handle } from 'reactflow';

export default function BaseNode({ id, title, handles = [], body, styleOverrides = {} }) {
    return (
        <div
            className="bg-white border rounded-xl shadow-md p-3 min-w-[220px] inline-block"
            style={styleOverrides}
        >
            <div className="font-semibold text-gray-700 mb-2">
                {title}
            </div>
            <div className="text-sm text-gray-600">
                {body}
            </div>

            {handles.map((h, i) => (
                <Handle
                    key={i}
                    type={h.type}
                    position={h.position}
                    id={h.id}
                    style={h.style}
                />
            ))}
        </div>
    );
}
