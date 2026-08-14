import React, { useState } from 'react';
import { FileText, Download, Printer, Loader2, Shield } from 'lucide-react';
import './Components.css';

const InvestigationBrief: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStage, setGenStage] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenStage('AGGREGATING MULTIMODAL EVIDENCE...');
    
    setTimeout(() => {
      setGenStage('SYNTHESIZING ENTITY RELATIONSHIPS...');
    }, 800);

    setTimeout(() => {
      setGenStage('FORMULATING PROVENANCE TRAIL...');
    }, 1500);

    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tab-pane brief-pane">
      {!isGenerated ? (
        <div className="generate-state flex-center flex-column" style={{ padding: '32px 16px', textOverflow: 'ellipsis' }}>
          <FileText size={48} className="text-acid-lime" style={{ marginBottom: '16px', opacity: 0.8 }} />
          <h4 style={{ marginBottom: '12px', textAlign: 'center', fontSize: '1.1rem' }}>Compile Case Intelligence Brief</h4>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-muted-gray)', marginBottom: '24px', maxWidth: '320px' }}>
            Generates an official, grounded forensic brief combining key entities, timeline milestones, priority leads, and evidence provenance.
          </p>
          
          {isGenerating ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Loader2 className="animate-spin text-acid-lime" size={24} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-acid-lime)', letterSpacing: '0.05em' }}>
                {genStage}
              </div>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleGenerate}>
              GENERATE INVESTIGATION BRIEF
            </button>
          )}
        </div>
      ) : (
        <div className="generated-brief glass-panel" style={{ padding: '20px' }}>
          <div className="brief-header flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-acid-lime)', letterSpacing: '0.1em' }}>FORMAL BRIEF</div>
              <h4 style={{ fontSize: '1.1rem' }}>CASE ACPIA-2048</h4>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handlePrint}>
                <Printer size={14} /> PRINT
              </button>
              <button className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => alert('Exporting brief as PDF...')}>
                <Download size={14} /> EXPORT
              </button>
            </div>
          </div>

          <div className="brief-content" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <h5>1. CASE OVERVIEW</h5>
            <p>
              Digital forensic evidence ingested under Case ACPIA-2048 establishes a high-confidence correlation between primary target handle Account X-17 and physical device identifier Device D04.
            </p>

            <h5>2. EVIDENCE SUMMARY</h5>
            <p>
              Total Ingested Artifacts: 148 items (Document Brief E063, Session Handover Logs, MAC Address Bindings, Cell Tower Triangulation Files).
            </p>

            <h5>3. KEY ENTITIES</h5>
            <ul>
              <li><strong>Account X-17</strong> — Primary Target User Account (94% confidence)</li>
              <li><strong>Device D04</strong> — Samsung Galaxy S22 Ultra (IMEI 86429104...)</li>
              <li><strong>Evidence E063</strong> — Forensic Brief PDF Artifact</li>
              <li><strong>Location L08</strong> — Kochi Cyber Corridor (Lat 9.9312° N, Long 76.2673° E)</li>
            </ul>

            <h5>4. RELATIONSHIPS & CORRELATIONS</h5>
            <p>
              Session Handover Log E063 confirms simultaneous authentication across Device D04 and Account X-17 at 2024-01-15 11:20 IST.
            </p>

            <h5>5. TIMELINE MILESTONES</h5>
            <ul>
              <li>2023-10-12: Account X-17 created</li>
              <li>2023-11-05: Device D04 registered</li>
              <li>2024-01-15: Cross-device login correlated (E063)</li>
            </ul>

            <h5>6. PRIORITY LEADS</h5>
            <p style={{ color: 'var(--color-amber)' }}>
              LEAD 02 (CRITICAL) — Cross-Source Account & Device Correlation (89% Confidence). Human review required prior to warrant issuance.
            </p>

            <h5>7. UNRESOLVED QUESTIONS</h5>
            <p>
              Secondary MAC address binding on Device D04 requires ISP subscriber lookup.
            </p>

            <h5>8. EVIDENCE PROVENANCE</h5>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-gray)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <Shield size={14} className="text-moss-green" /> Deterministic synthetic demonstration pipeline. Cryptographic hash verified.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationBrief;
