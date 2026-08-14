import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Node, Edge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { User, Smartphone, FileText, Calendar, MapPin, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import './Components.css';

interface CaseGraphProps {
  triggerUpdate: number;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { 
      label: 'Account X-17', 
      typeLabel: 'User Account',
      icon: 'account',
      confidence: '94%',
      provenance: 'Telegram Export / Auth Logs',
      details: 'Primary target handle linked to encrypted communications.'
    },
    position: { x: 300, y: 120 },
  },
  {
    id: '2',
    type: 'custom',
    data: { 
      label: 'Device D04', 
      typeLabel: 'Hardware Identifier',
      icon: 'device',
      confidence: '91%',
      provenance: 'MAC Address Binding / IMSI Log',
      details: 'Registered Samsung Galaxy S22 Ultra (IMEI 86429104...)'
    },
    position: { x: 300, y: 280 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'AUTH LINK (89%)' },
];

const updatedNodes: Node[] = [
  ...initialNodes,
  {
    id: '3',
    type: 'custom',
    data: { 
      label: 'Evidence E063', 
      typeLabel: 'Forensic PDF Document',
      icon: 'evidence', 
      isNew: true,
      confidence: '98%',
      provenance: 'Ingested Forensic Brief E063.pdf',
      details: 'Cross-source transaction log proving active session handover.'
    },
    position: { x: 300, y: 440 },
  },
  {
    id: '4',
    type: 'custom',
    data: { 
      label: 'Event T14', 
      typeLabel: 'Timestamped Event',
      icon: 'event', 
      isNew: true,
      confidence: '88%',
      provenance: 'Cell Tower Triangulation',
      details: 'Synchronized login event at 2024-01-15 11:20 IST.'
    },
    position: { x: 120, y: 600 },
  },
  {
    id: '5',
    type: 'custom',
    data: { 
      label: 'Location L08', 
      typeLabel: 'Geo-Coordinates',
      icon: 'location', 
      isNew: true,
      confidence: '85%',
      provenance: 'IP Geolocation & Cell ID',
      details: 'Kochi Cyber Corridor (Lat 9.9312° N, Long 76.2673° E)'
    },
    position: { x: 480, y: 600 },
  },
];

const updatedEdges: Edge[] = [
  ...initialEdges,
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'EXTRACTED LINK' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'TIMELINE ANCHOR' },
  { id: 'e3-5', source: '3', target: '5', animated: true, label: 'GEO MATCH' },
];

const CustomNode = ({ data }: any) => {
  const getIcon = () => {
    switch(data.icon) {
      case 'account': return <User size={18} />;
      case 'device': return <Smartphone size={18} />;
      case 'evidence': return <FileText size={18} />;
      case 'event': return <Calendar size={18} />;
      case 'location': return <MapPin size={18} />;
      default: return null;
    }
  };

  return (
    <div className={`custom-node ${data.isNew ? 'node-new' : ''} ${data.isSelected ? 'node-selected' : ''}`}>
      {data.isNew && <span className="node-badge">NEW EVIDENCE</span>}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: 'var(--color-acid-lime)', width: '8px', height: '8px', border: '2px solid var(--color-black)' }} 
      />
      <div className="node-icon-wrapper">{getIcon()}</div>
      <div className="node-label-wrapper">
        <div style={{ fontWeight: 600 }}>{data.label}</div>
        {data.typeLabel && <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>{data.typeLabel}</div>}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: 'var(--color-acid-lime)', width: '8px', height: '8px', border: '2px solid var(--color-black)' }} 
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const CaseGraph: React.FC<CaseGraphProps> = ({ triggerUpdate }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds));

  useEffect(() => {
    if (triggerUpdate > 0) {
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    }
  }, [triggerUpdate]);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background color="rgba(253, 251, 247, 0.05)" gap={20} />
        <Controls />
      </ReactFlow>

      {/* Node Details Inspector Modal */}
      {selectedNodeData && (
        <div className="modal-overlay" onClick={() => setSelectedNodeData(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-acid-lime)', letterSpacing: '0.1em' }}>
                  ENTITY INSPECTOR
                </div>
                <h3>{selectedNodeData.label}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedNodeData(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-gray)' }}>ENTITY TYPE</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-warm-ivory)' }}>{selectedNodeData.typeLabel}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-gray)' }}>CORRELATION CONFIDENCE</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-acid-lime)' }}>{selectedNodeData.confidence}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-gray)' }}>PROVENANCE SOURCE</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory)' }}>{selectedNodeData.provenance}</span>
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: '0.75rem', color: 'var(--color-acid-lime)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  INTELLIGENCE SUMMARY
                </h5>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory)', lineHeight: '1.5' }}>
                  {selectedNodeData.details}
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} className="text-acid-lime" />
                <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory)' }}>
                  Grounded in synthetic evidence chain. No autonomous decision taken.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setSelectedNodeData(null)}>
                  VIEW IN EVIDENCE VAULT <ExternalLink size={14} />
                </button>
                <button className="btn-secondary" onClick={() => setSelectedNodeData(null)}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseGraph;
