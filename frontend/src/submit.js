// submit.js

import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        const nodes = getNodes();
        const edges = getEdges();

        const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nodes, edges })
        });

        const data = await res.json();

        alert(
            `Pipeline Summary\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`
        );
    };

    return (
        <div className="flex items-center justify-center mt-6">
            <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </div>
    );
};
