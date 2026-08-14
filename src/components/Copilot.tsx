import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Network, ShieldCheck } from 'lucide-react';
import './Components.css';

interface Message {
  sender: 'bot' | 'user';
  text?: string;
  structured?: {
    conclusion: string;
    evidence: string[];
    confidence: string;
    entities: string[];
    events: string[];
  };
}

const Copilot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'bot', 
      text: 'TRACEIQ Copilot active. Grounded exclusively in current CaseGraph and ingested evidence artifacts.' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    'What connects Account X-17 and Device D04?',
    'What new intelligence emerged from Evidence E063?',
    'Show confidence score breakdown for Lead 02.'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setQuery('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (text.toLowerCase().includes('connect') || text.toLowerCase().includes('x-17')) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          structured: {
            conclusion: 'Account X-17 and Device D04 share a verified hardware-account binding established during session handover.',
            evidence: ['Auth Log E014', 'Forensic PDF E063'],
            confidence: '89% High Correlation',
            entities: ['Account X-17', 'Device D04', 'Location L08'],
            events: ['2023-11-05 Device Registration', '2024-01-15 Cross-device Login']
          }
        }]);
      } else if (text.toLowerCase().includes('e063') || text.toLowerCase().includes('pdf') || text.toLowerCase().includes('new')) {
        setMessages(prev => [...prev, {
          sender: 'bot',
          structured: {
            conclusion: 'Ingestion of Brief E063 introduced 3 new CaseGraph nodes: Evidence E063, Event T14 (Timestamped Login), and Location L08 (Kochi Cyber Corridor).',
            evidence: ['Brief E063.pdf (1.8 MB)'],
            confidence: '98% Direct Extraction',
            entities: ['Evidence E063', 'Event T14', 'Location L08'],
            events: ['2024-01-15 11:20 Synchronized Login']
          }
        }]);
      } else {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: `Grounded Query Result for "${text}": Ingested evidence points to 2 primary entities (Account X-17, Device D04) operating across 3 spatial-temporal anchors with an overall case confidence of 89%.`
        }]);
      }
    }, 1200);
  };

  return (
    <div className="tab-pane copilot-pane">
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="message-avatar">
              {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            
            <div className="message-content">
              {msg.text && <div>{msg.text}</div>}

              {msg.structured && (
                <div className="structured-response">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-acid-lime)', fontWeight: 600, fontSize: '0.75rem', marginBottom: '6px' }}>
                    <Sparkles size={14} /> REASONED CASE SUMMARY
                  </div>
                  
                  <h6>CONCLUSION</h6>
                  <p style={{ fontSize: '0.85rem' }}>{msg.structured.conclusion}</p>

                  <h6>SUPPORTING EVIDENCE</h6>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {msg.structured.evidence.map(e => (
                      <span key={e} className="entity-tag" style={{ background: 'rgba(217, 249, 157, 0.1)', color: 'var(--color-acid-lime)' }}>
                        <ShieldCheck size={10} style={{ display: 'inline', marginRight: '3px' }} />{e}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                    <span>CONFIDENCE: <strong style={{ color: 'var(--color-acid-lime)' }}>{msg.structured.confidence}</strong></span>
                    <span>ENTITIES: <strong style={{ color: 'var(--color-warm-ivory)' }}>{msg.structured.entities.length} Linked</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-avatar"><Bot size={16} /></div>
            <div className="message-content typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions Chips */}
      <div className="copilot-suggestions">
        {sampleQuestions.map((q, idx) => (
          <button key={idx} className="suggestion-chip" onClick={() => handleSend(q)}>
            <Network size={10} style={{ marginRight: '4px' }} /> {q}
          </button>
        ))}
      </div>
      
      <div className="chat-input-area">
        <input 
          type="text" 
          placeholder="Ask Copilot about evidence, entities, or timeline..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={() => handleSend()} disabled={!query.trim()} className="btn-send">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Copilot;
