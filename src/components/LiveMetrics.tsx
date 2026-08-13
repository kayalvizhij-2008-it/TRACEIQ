import React from 'react';
import './Components.css';
import { motion } from 'framer-motion';

interface MetricsProps {
  metrics: {
    evidence: number;
    entities: number;
    relationships: number;
    timelineEvents: number;
    priorityLeads: number;
  };
}

const LiveMetrics: React.FC<MetricsProps> = ({ metrics }) => {
  return (
    <div className="sidebar-section live-metrics">
      <h3 className="section-title">Live Metrics</h3>
      <div className="metrics-grid">
        <MetricBox label="EVIDENCE" value={metrics.evidence} />
        <MetricBox label="ENTITIES" value={metrics.entities} />
        <MetricBox label="RELATIONS" value={metrics.relationships} />
        <MetricBox label="EVENTS" value={metrics.timelineEvents} />
        <MetricBox label="LEADS" value={metrics.priorityLeads} highlight />
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, highlight = false }: { label: string, value: number, highlight?: boolean }) => (
  <div className={`metric-box ${highlight ? 'highlight' : ''}`}>
    <motion.div 
      key={value}
      initial={{ scale: 1.2, color: 'var(--color-electric-violet)' }}
      animate={{ scale: 1, color: highlight ? 'var(--color-amber)' : 'var(--color-warm-ivory)' }}
      transition={{ duration: 0.5 }}
      className="metric-value"
    >
      {value.toString().padStart(2, '0')}
    </motion.div>
    <div className="metric-label">{label}</div>
  </div>
);

export default LiveMetrics;
