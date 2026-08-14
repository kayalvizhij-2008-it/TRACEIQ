import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';
import CaseGraph from '../components/CaseGraph';
import EvidenceVault from '../components/EvidenceVault';
import LiveMetrics from '../components/LiveMetrics';
import LiveActivity from '../components/LiveActivity';
import Timeline from '../components/Timeline';
import PriorityLeads from '../components/PriorityLeads';
import Copilot from '../components/Copilot';
import InvestigationBrief from '../components/InvestigationBrief';
import AgenticPipeline from '../components/AgenticPipeline';
import './CommandCenter.css';

const initialMetrics = {
  evidence: 147,
  entities: 38,
  relationships: 64,
  timelineEvents: 29,
  priorityLeads: 6
};

const CommandCenter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [activities, setActivities] = useState([
    { id: '1', time: '10:42:00 IST', text: 'Case ACPIA-2048 loaded into workstation memory' }
  ]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'leads' | 'copilot' | 'brief'>('timeline');
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stages = [
    { name: 'FILE RECEIVED', agentIndex: 0 },
    { name: 'SECURE INGESTION', agentIndex: 0 },
    { name: 'DOCUMENT PARSING', agentIndex: 1 },
    { name: 'ENTITY EXTRACTION', agentIndex: 1 },
    { name: 'METADATA ANALYSIS', agentIndex: 2 },
    { name: 'CROSS-SOURCE CORRELATION', agentIndex: 3 },
    { name: 'RELATIONSHIP DISCOVERY', agentIndex: 3 },
    { name: 'TIMELINE RECONSTRUCTION', agentIndex: 4 },
    { name: 'RISK SIGNAL ANALYSIS', agentIndex: 6 },
    { name: 'CASEGRAPH UPDATED', agentIndex: 7 }
  ];

  const handleFileUpload = (fileName: string = 'TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf') => {
    setIsProcessing(true);
    let currentStageIndex = 0;
    
    const interval = setInterval(() => {
      if (currentStageIndex < stages.length) {
        const stageObj = stages[currentStageIndex];
        setProcessingStage(stageObj.name);
        setActiveStageIndex(stageObj.agentIndex);
        setProgressPercent(Math.round(((currentStageIndex + 1) / stages.length) * 100));

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
        setActivities(prev => [
          { id: Date.now().toString(), time: timeStr, text: `[${stageObj.name}] — ${fileName}` },
          ...prev
        ]);

        currentStageIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setProcessingStage('');
        setActiveStageIndex(7);
        setTriggerUpdate(prev => prev + 1);
        
        // Update live metrics
        setMetrics({
          evidence: 148,
          entities: 40,
          relationships: 66,
          timelineEvents: 30,
          priorityLeads: 7
        });
        
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
        setActivities(prev => [
          { id: Date.now().toString(), time: timeStr, text: 'NEW EVIDENCE CHANGED THE CASE' },
          ...prev
        ]);
      }
    }, 1100);
  };

  const handleJudgeDemo = () => {
    // Reset state first
    setMetrics(initialMetrics);
    setActiveStageIndex(-1);
    setProgressPercent(0);
    setActiveTab('timeline');
    setActivities([{ id: '1', time: '10:42:00 IST', text: 'Judicial Live Demo Triggered — Resetting Case Context' }]);
    setTriggerUpdate(0);
    
    // Step 1: Start Ingestion
    setTimeout(() => {
      handleFileUpload('TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf');
    }, 800);

    // Step 2: Auto-switch to Priority Leads after completion
    setTimeout(() => {
      setActiveTab('leads');
    }, 13000);

    // Step 3: Auto-switch to Copilot Explanation
    setTimeout(() => {
      setActiveTab('copilot');
    }, 17000);

    // Step 4: Auto-switch to Investigation Brief
    setTimeout(() => {
      setActiveTab('brief');
    }, 21000);
  };

  useEffect(() => {
    if (searchParams.get('autodemo') === 'true') {
      handleJudgeDemo();
    }
  }, [searchParams]);

  return (
    <div className="command-center">
      <header className="cc-header">
        <div className="cc-brand">
          <h2>TRACE<span className="text-acid-lime glow-text">IQ</span></h2>
          <div className="case-id">CASE-ACPIA-2048</div>
        </div>
        
        <div className="cc-status">
          <span className="status-dot animate-pulse"></span>
          ACTIVE INVESTIGATION WORKSTATION <span className="status-live">● LIVE</span>
        </div>
        
        <div className="cc-actions">
          <button 
            className="btn-secondary demo-btn" 
            onClick={handleJudgeDemo}
            disabled={isProcessing}
          >
            <Play size={16} className="text-amber" /> RUN JUDGE DEMO
          </button>
          
          <button className="btn-secondary" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>

          <button className="btn-secondary" onClick={() => {
            setMetrics(initialMetrics);
            setTriggerUpdate(0);
            setActiveStageIndex(-1);
            setActiveTab('timeline');
            setActivities([{ id: Date.now().toString(), time: '10:42:00 IST', text: 'Case state reset to baseline.' }]);
          }}>
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      {/* Multi-Agent Reasoning Pipeline Bar */}
      <AgenticPipeline activeStageIndex={activeStageIndex} />

      <main className="cc-main">
        {/* Left Sidebar */}
        <aside className="cc-sidebar left-sidebar">
          <EvidenceVault 
            onUpload={handleFileUpload} 
            isProcessing={isProcessing} 
            stage={processingStage} 
            progressPercent={progressPercent}
          />
          <LiveMetrics metrics={metrics} />
          <LiveActivity activities={activities} />
        </aside>

        {/* Center Canvas (Visually Dominant) */}
        <section className="cc-canvas">
          <CaseGraph triggerUpdate={triggerUpdate} />
          
          {triggerUpdate > 0 && (
            <div className="case-update-toast">
              <ShieldCheck size={16} className="text-acid-lime" />
              <span>NEW EVIDENCE CHANGED THE CASE — 3 ENTITIES LINKED</span>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="cc-sidebar right-sidebar">
          <div className="tabs">
            <button className={`tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
              Timeline
            </button>
            <button className={`tab ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
              Leads {metrics.priorityLeads > 6 && <span className="tab-badge">{metrics.priorityLeads}</span>}
            </button>
            <button className={`tab ${activeTab === 'copilot' ? 'active' : ''}`} onClick={() => setActiveTab('copilot')}>
              Copilot
            </button>
            <button className={`tab ${activeTab === 'brief' ? 'active' : ''}`} onClick={() => setActiveTab('brief')}>
              Brief
            </button>
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
