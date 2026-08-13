import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward, FileText, Activity } from 'lucide-react';
import CaseGraph from '../components/CaseGraph';
import EvidenceVault from '../components/EvidenceVault';
import LiveMetrics from '../components/LiveMetrics';
import LiveActivity from '../components/LiveActivity';
import Timeline from '../components/Timeline';
import PriorityLeads from '../components/PriorityLeads';
import Copilot from '../components/Copilot';
import InvestigationBrief from '../components/InvestigationBrief';
import './CommandCenter.css';

const initialMetrics = {
  evidence: 147,
  entities: 38,
  relationships: 64,
  timelineEvents: 29,
  priorityLeads: 6
};

const CommandCenter: React.FC = () => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [activities, setActivities] = useState([
    { id: '1', time: '10:42 AM', text: 'Case loaded successfully' }
  ]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'leads' | 'copilot' | 'brief'>('timeline');
  const [triggerUpdate, setTriggerUpdate] = useState(0); // Trigger graph updates
  
  const handleFileUpload = () => {
    setIsProcessing(true);
    const stages = [
      'SECURE INGESTION',
      'DOCUMENT PARSING',
      'ENTITY EXTRACTION',
      'METADATA ANALYSIS',
      'CROSS-SOURCE CORRELATION',
      'RELATIONSHIP DISCOVERY',
      'TIMELINE RECONSTRUCTION',
      'RISK SIGNAL ANALYSIS',
      'CASEGRAPH UPDATED'
    ];
    
    let currentStage = 0;
    
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProcessingStage(stages[currentStage]);
        setActivities(prev => [{ id: Date.now().toString(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: stages[currentStage] }, ...prev]);
        currentStage++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setProcessingStage('');
        setTriggerUpdate(prev => prev + 1);
        
        // Update metrics
        setMetrics({
          evidence: 148,
          entities: 40,
          relationships: 66,
          timelineEvents: 30,
          priorityLeads: 7
        });
        
        setActivities(prev => [{ id: Date.now().toString(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: 'NEW EVIDENCE CHANGED THE CASE' }, ...prev]);
      }
    }, 1200);
  };

  const handleJudgeDemo = () => {
    // Reset state
    setMetrics(initialMetrics);
    setActivities([{ id: '1', time: '10:42 AM', text: 'Case loaded successfully' }]);
    
    setTimeout(() => {
      handleFileUpload();
    }, 1000);
  };

  return (
    <div className="command-center">
      <header className="cc-header">
        <div className="cc-brand">
          <h2>TRACE<span className="text-accent glow-text">IQ</span></h2>
          <div className="case-id">CASE-ACPIA-2048</div>
        </div>
        
        <div className="cc-status">
          <span className="status-dot animate-pulse"></span>
          ACTIVE INVESTIGATION <span className="status-live">● LIVE</span>
        </div>
        
        <div className="cc-actions">
          <button className="btn-secondary demo-btn" onClick={handleJudgeDemo}>
            <Play size={16} /> RUN JUDGE DEMO
          </button>
        </div>
      </header>

      <main className="cc-main">
        {/* Left Sidebar */}
        <aside className="cc-sidebar left-sidebar">
          <EvidenceVault onUpload={handleFileUpload} isProcessing={isProcessing} stage={processingStage} />
          <LiveMetrics metrics={metrics} />
          <LiveActivity activities={activities} />
        </aside>

        {/* Center Canvas */}
        <section className="cc-canvas">
          <CaseGraph triggerUpdate={triggerUpdate} />
        </section>

        {/* Right Sidebar */}
        <aside className="cc-sidebar right-sidebar">
          <div className="tabs">
            <button className={`tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>Timeline</button>
            <button className={`tab ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>Leads</button>
            <button className={`tab ${activeTab === 'copilot' ? 'active' : ''}`} onClick={() => setActiveTab('copilot')}>Copilot</button>
            <button className={`tab ${activeTab === 'brief' ? 'active' : ''}`} onClick={() => setActiveTab('brief')}>Brief</button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'timeline' && <Timeline triggerUpdate={triggerUpdate} />}
            {activeTab === 'leads' && <PriorityLeads triggerUpdate={triggerUpdate} />}
            {activeTab === 'copilot' && <Copilot />}
            {activeTab === 'brief' && <InvestigationBrief />}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CommandCenter;
