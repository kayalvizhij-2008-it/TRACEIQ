import React, { useEffect, useState } from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Components.css';

interface PriorityLeadsProps {
  triggerUpdate: number;
}

const PriorityLeads: React.FC<PriorityLeadsProps> = ({ triggerUpdate }) => {
  const [leads, setLeads] = useState([
    {
      id: 'L-01',
      priority: 'HIGH',
      title: 'Location Anomaly Detected',
      confidence: 78,
      evidence: ['E012', 'E044']
    }
  ]);

  useEffect(() => {
    if (triggerUpdate > 0) {
      setLeads(prev => [
        {
          id: 'L-02',
          priority: 'CRITICAL',
          title: 'Cross-source account/device correlation',
          confidence: 89,
          evidence: ['E027', 'E041', 'E063']
        },
        ...prev
      ]);
    }
  }, [triggerUpdate]);

  return (
    <div className="tab-pane">
      <AnimatePresence>
        {leads.map((lead, i) => (
          <motion.div 
            key={lead.id}
            initial={triggerUpdate > 0 && i === 0 ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`lead-card glass-panel priority-${lead.priority.toLowerCase()}`}
          >
            <div className="lead-header">
              <span className="lead-id">{lead.id}</span>
              <span className={`priority-badge ${lead.priority.toLowerCase()}`}>
                <AlertTriangle size={12} /> {lead.priority}
              </span>
            </div>
            
            <h4 className="lead-title">{lead.title}</h4>
            
            <div className="lead-meta">
              <div className="confidence-meter">
                <div className="confidence-label">CONFIDENCE</div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${lead.confidence}%` }}></div>
                </div>
                <div className="confidence-value">{lead.confidence}%</div>
              </div>
            </div>
            
            <div className="lead-evidence">
              <div className="evidence-label">SUPPORTING EVIDENCE</div>
              <div className="evidence-tags">
                {lead.evidence.map(e => <span key={e} className="evidence-tag">{e}</span>)}
              </div>
            </div>
            
            <div className="lead-actions">
              <button className="btn-review">
                REVIEW EVIDENCE <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="human-review-notice">HUMAN REVIEW REQUIRED</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PriorityLeads;
