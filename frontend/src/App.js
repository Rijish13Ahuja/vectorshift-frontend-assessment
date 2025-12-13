import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div>
      <PipelineToolbar />

      <ReactFlowProvider>
        <PipelineUI />
        <SubmitButton />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
