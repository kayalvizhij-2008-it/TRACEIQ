import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Cpu, Database, Network, GitBranch, Clock, AlertTriangle, FileCheck, 
  X, ShieldAlert, ArrowRight, Sparkles, FileText
} from 'lucide-react';
import './Components.css';

interface AgenticPipelineProps {
  activeStageIndex?: number;
}

interface AgentDetail {
  id: string;
  label: string;
  description: string;
  icon: any;
  status: string;
  purpose: string;
  input: string;
  process: string[];
  signals: string[];
  metadata: string;
  confidence: string;
  evidence: string[];
  entities: string[];
  humanReviewRequired: boolean;
  specialView?: 'correlation' | 'pattern' | 'timeline' | 'synthetic' | 'risk' | 'reporting' | 'media' | 'evidence';
}

const agentsData: AgentDetail[] = [
  {
    id: 'evidence',
    label: 'EVIDENCE AGENT',
    description: 'Multimodal Ingestion',
    icon: Database,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Multimodal ingestion, cryptographic hash verification, and evidential vault indexing.',
    input: 'PDF, Documents, Images, Audio, Video, CSV Log files',
    process: ['File Received', 'Hash Calculation', 'Format Validation', 'Vault Indexing'],
    signals: ['SHA-256 Hash Match Verified', 'Metadata Integrity Intact', 'Vault Encryption Active'],
    metadata: '148 Artifacts Registered in Case ACPIA-2048',
    confidence: '99% Provenance Certified',
    evidence: ['E001', 'E014', 'E027', 'E063'],
    entities: ['Account X-17', 'Device D04', 'Evidence E063'],
    humanReviewRequired: false,
    specialView: 'evidence'
  },
  {
    id: 'media',
    label: 'MEDIA INTELLIGENCE',
    description: 'OCR & Signal Parsing',
    icon: Cpu,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Analyzes multimedia evidence, performs OCR extraction, and extracts contextual signals.',
    input: 'Synthetic multimedia evidence (Images, PDFs, Screen Captures)',
    process: ['Media', 'Context', 'Entities', 'Signals'],
    signals: ['OCR Text Extracted', 'EXIF Metadata Correlated', 'Steganographic Check Clean'],
    metadata: 'Image resolution 4K • Encrypted Payload Check Negative',
    confidence: '91% High Signal Confidence',
    evidence: ['E041', 'E052', 'E063'],
    entities: ['Account X-17', 'Device D04'],
    humanReviewRequired: true,
    specialView: 'media'
  },
  {
    id: 'correlation',
    label: 'CORRELATION AGENT',
    description: 'Cross-Source Entity Linkage',
    icon: Network,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Connects identifiers, accounts, devices, and evidence across multiple disparate sources.',
    input: 'Extracted Entity Graph & Identifier Strings',
    process: ['Entity Matching', 'Cross-Source Triangulation', 'Edge Weighting', 'Graph Fusion'],
    signals: ['Account X-17 ↔ Device D04 Binding', 'Auth Log Timestamp Synchronization'],
    metadata: '66 Active Correlated Edges in CaseGraph',
    confidence: '89% Cross-Source Correlation',
    evidence: ['E027', 'E041', 'E063'],
    entities: ['Account X-17', 'Device D04', 'Location L08'],
    humanReviewRequired: true,
    specialView: 'correlation'
  },
  {
    id: 'pattern',
    label: 'PATTERN AGENT',
    description: 'Behavior & Graph Analysis',
    icon: GitBranch,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Detects repeated temporal and behavioral relationships within synthetic investigation data.',
    input: 'Chronological Logs & Telemetry Events',
    process: ['Clustering', 'Temporal Spikes', 'Repeated Identifiers', 'Anomaly Detection'],
    signals: ['Off-Hours Authentication Spike', 'Geo-Coordinate Shift Anomaly'],
    metadata: '3 Recurrent Activity Clusters Detected',
    confidence: '86% Pattern Probability',
    evidence: ['E014', 'E027', 'E063'],
    entities: ['Device D04', 'Event T14'],
    humanReviewRequired: true,
    specialView: 'pattern'
  },
  {
    id: 'timeline',
    label: 'TIMELINE AGENT',
    description: 'Chronological Fusion',
    icon: Clock,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Evidence events are ordered and correlated into an investigative timeline.',
    input: 'Time-stamped Logs, Sensor Data, Document Headers',
    process: ['Timestamp Normalization', 'Sequence Ordering', 'Gap Identification', 'Timeline Fusion'],
    signals: ['30 Chronological Milestones Unified', '0 Sequence Inconsistencies'],
    metadata: 'Timeline window: 2023-10-12 to 2024-01-15',
    confidence: '95% Chronological Alignment',
    evidence: ['E001', 'E014', 'E027', 'E063'],
    entities: ['Account X-17', 'Device D04', 'Event T14'],
    humanReviewRequired: false,
    specialView: 'timeline'
  },
  {
    id: 'synthetic',
    label: 'SYNTHETIC DETECTION',
    description: 'Provenance & Authenticity',
    icon: ShieldCheck,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Analyzes synthetic / manipulated content indicators and verifies file provenance.',
    input: 'Ingested Documents & Synthetic Artifacts',
    process: ['Metadata Check', 'Artifact Consistency', 'Watermark Verification', 'Synthetic Tagging'],
    signals: ['Synthetic Demonstration Marker Verified', 'Non-Real Victim Guardrail PASS'],
    metadata: '100% Deterministic Synthetic Test Benchmark',
    confidence: '96% Synthetic Verification',
    evidence: ['E063'],
    entities: ['Evidence E063'],
    humanReviewRequired: true,
    specialView: 'synthetic'
  },
  {
    id: 'risk',
    label: 'RISK ENGINE',
    description: 'Threat Priority Scoring',
    icon: AlertTriangle,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Prioritizes investigative leads based on correlated evidence signals and risk rules.',
    input: 'Correlated Entities, Graph Centrality, Anomaly Scores',
    process: ['Signal Weighting', 'Risk Rule Evaluation', 'Priority Scoring', 'Lead Generation'],
    signals: ['Lead 02 Marked CRITICAL Priority', 'High Multi-Source Confidence (89%)'],
    metadata: '7 Priority Leads Active',
    confidence: '89% Risk Score Accuracy',
    evidence: ['E027', 'E041', 'E063'],
    entities: ['Account X-17', 'Device D04'],
    humanReviewRequired: true,
    specialView: 'risk'
  },
  {
    id: 'reporting',
    label: 'REPORTING AGENT',
    description: 'Brief & Intelligence Synthesis',
    icon: FileCheck,
    status: 'ACTIVE ● ONLINE',
    purpose: 'Transforms verified investigative findings into a structured, formal investigation brief.',
    input: 'Verified CaseGraph, Timeline, Priority Leads, Provenance Data',
    process: ['Evidence', 'Findings', 'Timeline', 'Priority Leads', 'Brief Generation'],
    signals: ['Investigation Brief Ready for Export', 'Provenance References Formatted'],
    metadata: 'Formal Case Brief ACPIA-2048 Prepared',
    confidence: '98% Synthesis Precision',
    evidence: ['E001', 'E014', 'E027', 'E041', 'E063'],
    entities: ['Account X-17', 'Device D04', 'Location L08', 'Event T14'],
    humanReviewRequired: false,
    specialView: 'reporting'
  }
];

const AgenticPipeline: React.FC<AgenticPipelineProps> = ({ activeStageIndex = -1 }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentDetail | null>(null);

  return (
    <div className="agentic-pipeline-container">
      <div className="pipeline-header">
        <div className="pipeline-title">
          <Cpu size={14} className="text-acid-lime" />
          <span>MULTI-AGENT CASE INTELLIGENCE PIPELINE</span>
        </div>
        <div className="pipeline-badge">
          CLICK ANY AGENT TO INSPECT INTELLIGENCE DRAWER
        </div>
      </div>

      <div className="pipeline-flow">
        {agentsData.map((agent, index) => {
          const Icon = agent.icon;
          const isActive = index === activeStageIndex;
          const isCompleted = activeStageIndex > index;

          return (
            <React.Fragment key={agent.id}>
              <div 
                className={`agent-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setSelectedAgent(agent)}
                title={`Click to open ${agent.label} Drawer`}
                style={{ cursor: 'pointer' }}
              >
                <div className="agent-icon-box">
                  <Icon size={16} />
                </div>
                <div className="agent-info">
                  <div className="agent-name">{agent.label}</div>
                  <div className="agent-desc">{agent.description}</div>
                </div>
                {isActive && <span className="agent-pulse-ring"></span>}
              </div>
              {index < agentsData.length - 1 && (
                <div className={`pipeline-connector ${isCompleted ? 'completed' : ''}`}>
                  <span className="connector-line"></span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Agent Detail Intelligence Drawer / Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="modal-overlay" onClick={() => setSelectedAgent(null)}>
            <motion.div 
              className="modal-card agent-drawer"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-acid-lime)', letterSpacing: '0.12em', fontWeight: 600 }}>
                    INTELLIGENCE AGENT DRAWER — {selectedAgent.status}
                  </div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <selectedAgent.icon size={22} className="text-acid-lime" />
                    {selectedAgent.label}
                  </h3>
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedAgent(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="agent-drawer-body">
                {/* Purpose & Process Flow */}
                <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-gray)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    AGENT PURPOSE
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-warm-ivory)', marginBottom: '12px' }}>
                    {selectedAgent.purpose}
                  </p>

                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-gray)', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    REASONING PROCESS FLOW
                  </div>
                  <div className="process-flow-row">
                    {selectedAgent.process.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="process-chip">{step}</span>
                        {idx < selectedAgent.process.length - 1 && <ArrowRight size={12} className="text-acid-lime" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Agent Specific View Displays */}
                {selectedAgent.specialView === 'correlation' && (
                  <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px', background: 'rgba(217, 249, 157, 0.04)', borderColor: 'rgba(217, 249, 157, 0.3)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-acid-lime)', marginBottom: '12px', letterSpacing: '0.08em' }}>
                      SOURCE CORRELATION RELATIONSHIP PATHWAY
                    </div>
                    <div className="correlation-flow-diagram">
                      <div className="diagram-node">ACCOUNT X-17</div>
                      <ArrowRight size={16} className="text-acid-lime" />
                      <div className="diagram-node">DEVICE D04</div>
                      <ArrowRight size={16} className="text-acid-lime" />
                      <div className="diagram-node">EVIDENCE E063</div>
                      <ArrowRight size={16} className="text-acid-lime" />
                      <div className="diagram-node">EVENT T14</div>
                    </div>
                  </div>
                )}

                {selectedAgent.specialView === 'pattern' && (
                  <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-acid-lime)', marginBottom: '8px' }}>
                      PATTERN ANALYSIS CLUSTERS
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      <div className="metric-box" style={{ padding: '10px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warm-ivory)' }}>Activity Clusters</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>3 Spikes Correlated</div>
                      </div>
                      <div className="metric-box" style={{ padding: '10px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warm-ivory)' }}>Temporal Patterns</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>11:20 IST Handover</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAgent.specialView === 'reporting' && (
                  <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-acid-lime)', marginBottom: '8px' }}>
                      REPORT SYNTHESIS PIPELINE
                    </div>
                    <div className="process-flow-row" style={{ justifyContent: 'space-between' }}>
                      <span className="process-chip">Evidence</span> →
                      <span className="process-chip">Findings</span> →
                      <span className="process-chip">Timeline</span> →
                      <span className="process-chip">Leads</span> →
                      <span className="process-chip" style={{ background: 'var(--color-acid-lime)', color: 'var(--color-black)' }}>Brief</span>
                    </div>
                  </div>
                )}

                {/* Signals & Metadata */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div className="glass-panel" style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)', marginBottom: '6px' }}>DETECTED SIGNALS</div>
                    {selectedAgent.signals.map((sig, i) => (
                      <div key={i} style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={10} className="text-acid-lime" /> {sig}
                      </div>
                    ))}
                  </div>

                  <div className="glass-panel" style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)', marginBottom: '6px' }}>CONFIDENCE & PROVENANCE</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-acid-lime)', marginBottom: '4px' }}>
                      {selectedAgent.confidence}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-warm-ivory)' }}>
                      {selectedAgent.metadata}
                    </div>
                  </div>
                </div>

                {/* Supporting Evidence & Human Review Warning */}
                <div className="glass-panel" style={{ padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)', marginBottom: '6px' }}>SUPPORTING EVIDENCE CHAIN</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedAgent.evidence.map(ev => (
                      <span key={ev} className="evidence-tag" style={{ background: 'rgba(217, 249, 157, 0.1)', color: 'var(--color-acid-lime)', border: '1px solid rgba(217, 249, 157, 0.3)' }}>
                        <FileText size={10} style={{ display: 'inline', marginRight: '3px' }} /> {ev}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedAgent.humanReviewRequired && (
                  <div className="human-review-notice" style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px' }}>
                    <ShieldAlert size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    HUMAN REVIEW REQUIRED — AI RECOMMENDS, HUMANS DECIDE
                  </div>
                )}
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-secondary" onClick={() => setSelectedAgent(null)}>
                  CLOSE AGENT DRAWER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgenticPipeline;
