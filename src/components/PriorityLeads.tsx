import React, { useEffect, useState } from 'react';
import { AlertTriangle, ChevronRight, CheckCircle, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Components.css';

interface PriorityLeadsProps {
  triggerUpdate: number;
}

interface Lead {
  id: string;
  priority: 'HIGH' | 'CRITICAL';
  title: string;
  confidence: number;
  evidence: string[];
  description: string;
  suggestedAction: string;
}

const PriorityLeads: React.FC<PriorityLeadsProps> = ({ triggerUpdate }) => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LEAD 01',
      priority: 'HIGH',
      title: 'Geographic Location Anomaly Detected',
      confidence: 78,
      evidence: ['E012', 'E044'],
      description: 'Account login attempted from geographic IP coordinates incongruent with registered device physical location.',
      suggestedAction: 'Verify telecommunication tower logs against ISP metadata.'
    }
  ]);

  const [selectedLeadModal, setSelectedLeadModal] = useState<Lead | null>(null);

  useEffect(() => {
    if (triggerUpdate > 0) {
      setLeads(prev => [
        {
          id: 'LEAD 02',
          priority: 'CRITICAL',
          title: 'Cross-Source Account & Device Correlation',
          confidence: 89,
          evidence: ['E027', 'E041', 'E063'],
          description: 'High-confidence alignment between Account X-17 and Device D04 corroborated by newly ingested document E063.',
          suggestedAction: 'Issue formal forensic preservation order for IMEI 86429104...'
        },
        ...prev
      ]);
    }
  }, [triggerUpdate]);

  return (
    <div className="tab-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-amber)', letterSpacing: '0.08em' }}>
          ACTIONABLE INVESTIGATIVE LEADS
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>{leads.length} LEADS ACTIVE</div>
      </div>

      <AnimatePresence>
        {leads.map((lead, i) => (
          <motion.div 
            key={lead.id}
            initial={triggerUpdate > 0 && i === 0 ? { opacity: 0, scale: 0.95, y: -10 } : { opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`lead-card priority-${lead.priority.toLowerCase()}`}
          >
            <div className="lead-header">
              <span className="lead-id">{lead.id}</span>
              <span className={`priority-badge ${lead.priority.toLowerCase()}`}>
                <AlertTriangle size={12} /> {lead.priority} PRIORITY
              </span>
            </div>
            
            <h4 className="lead-title">{lead.title}</h4>
            
            <div className="lead-meta">
              <div className="confidence-meter">
                <div className="confidence-label">AI CORRELATION CONFIDENCE</div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${lead.confidence}%` }}></div>
                </div>
                <div className="confidence-value">{lead.confidence}%</div>
              </div>
            </div>
            
            <div className="lead-evidence">
              <div className="evidence-label">SUPPORTING EVIDENCE CHAIN</div>
              <div className="evidence-tags">
                {lead.evidence.map(e => (
                  <span key={e} className="evidence-tag">{e}</span>
                ))}
              </div>
            </div>
            
            <div className="lead-actions">
              <button className="btn-review" onClick={() => setSelectedLeadModal(lead)}>
                REVIEW EVIDENCE <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="human-review-notice">
              <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
              HUMAN REVIEW REQUIRED — AI RECOMMENDS, HUMANS DECIDE
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Review Evidence Modal */}
      {selectedLeadModal && (
        <div className="modal-overlay" onClick={() => setSelectedLeadModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-amber)', letterSpacing: '0.1em' }}>
                  EVIDENTIAL REVIEW PANEL — {selectedLeadModal.id}
                </div>
                <h3>{selectedLeadModal.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedLeadModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '16px' }}>
                <h5 style={{ fontSize: '0.75rem', color: 'var(--color-acid-lime)', marginBottom: '8px' }}>
                  FINDINGS DISCOVERY
                </h5>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory)', marginBottom: '12px' }}>
                  {selectedLeadModal.description}
                </p>

                <h5 style={{ fontSize: '0.75rem', color: 'var(--color-acid-lime)', marginBottom: '8px' }}>
                  RECOMMENDED ACTION
                </h5>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory)' }}>
                  {selectedLeadModal.suggestedAction}
                </p>
              </div>

              <div>
                <h5 style={{ fontSize: '0.75rem', color: 'var(--color-amber)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  ATTACHED EVIDENCE CORRELATION
                </h5>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {selectedLeadModal.evidence.map(item => (
                    <div key={item} className="glass-panel" style={{ padding: '10px 14px', flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-warm-ivory)' }}>{item}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>Synthetic Log</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, background: 'var(--color-amber)', color: 'var(--color-black)', borderColor: 'var(--color-amber)' }}
                  onClick={() => {
                    alert(`Lead ${selectedLeadModal.id} confirmed by investigator.`);
                    setSelectedLeadModal(null);
                  }}
                >
                  <CheckCircle size={16} /> ACCEPT & MARK VERIFIED
                </button>
                <button className="btn-secondary" onClick={() => setSelectedLeadModal(null)}>
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityLeads;
