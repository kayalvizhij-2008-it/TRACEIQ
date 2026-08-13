import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { User, Smartphone, FileText, Calendar, MapPin } from 'lucide-react';
import './Components.css';

interface CaseGraphProps {
  triggerUpdate: number;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Account X-17', icon: 'account' },
    position: { x: 250, y: 100 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Device D04', icon: 'device' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

const updatedNodes: Node[] = [
  ...initialNodes,
  {
    id: '3',
    type: 'custom',
    data: { label: 'Evidence E063', icon: 'evidence', isNew: true },
    position: { x: 250, y: 400 },
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Event T14', icon: 'event', isNew: true },
    position: { x: 100, y: 550 },
  },
  {
    id: '5',
    type: 'custom',
    data: { label: 'Location L08', icon: 'location', isNew: true },
    position: { x: 400, y: 550 },
  },
];

const updatedEdges: Edge[] = [
  ...initialEdges,
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
];

const CustomNode = ({ data }: any) => {
  const getIcon = () => {
    switch(data.icon) {
      case 'account': return <User size={16} />;
      case 'device': return <Smartphone size={16} />;
      case 'evidence': return <FileText size={16} />;
      case 'event': return <Calendar size={16} />;
      case 'location': return <MapPin size={16} />;
      default: return null;
    }
  };

  return (
    <div className={`custom-node ${data.isNew ? 'node-new' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle-top" style={{ background: 'var(--color-electric-violet)', width: '8px', height: '8px', border: '2px solid var(--color-black)' }} />
      <div className="node-icon-wrapper">{getIcon()}</div>
      <div className="node-label-wrapper">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="node-handle-bottom" style={{ background: 'var(--color-electric-violet)', width: '8px', height: '8px', border: '2px solid var(--color-black)' }} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const CaseGraph: React.FC<CaseGraphProps> = ({ triggerUpdate }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds));

  useEffect(() => {
    if (triggerUpdate > 0) {
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    }
  }, [triggerUpdate]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="rgba(255, 255, 255, 0.05)" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CaseGraph;
