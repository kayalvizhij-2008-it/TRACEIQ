import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import './Components.css';

const InvestigationBrief: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <div className="tab-pane brief-pane">
      {!isGenerated ? (
        <div className="generate-state flex-center flex-column">
          <FileText size={48} className="text-accent" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>Compile Case Intelligence</h4>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '24px' }}>
            Generate a comprehensive investigation brief summarizing entities, relationships, timeline, and priority leads.
          </p>
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? <><Loader2 className="animate-spin" size={16} /> GENERATING...</> : 'GENERATE INVESTIGATION BRIEF'}
          </button>
        </div>
      ) : (
        <div className="generated-brief glass-panel">
          <div className="brief-header flex-between">
            <h4>CASE BRIEF ACPIA-2048</h4>
            <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }}><Download size={14} /> EXPORT</button>
          </div>
          <div className="brief-content">
            <h5>CASE OVERVIEW</h5>
            <p>Synthetic digital evidence reveals a coordinated network involving Account X-17 and multiple devices.</p>
            
            <h5>KEY ENTITIES</h5>
            <ul>
              <li>Account X-17</li>
              <li>Device D04</li>
              <li>Location L08</li>
            </ul>
            
            <h5>PRIORITY LEADS</h5>
            <p>High confidence (89%) correlation between Account X-17 and Device D04 based on Auth Log E063.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationBrief;
