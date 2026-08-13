import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import './Components.css';

const Copilot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'TRACEIQ Copilot initialized. Grounded in current CaseGraph context. How can I assist your investigation?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setQuery('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Based on the synthetic CaseGraph, Account X-17 and Device D04 are connected via Auth Log E063, establishing a high-confidence link (89%) at 2024-01-15 11:20.' 
      }]);
    }, 1500);
  };

  return (
    <div className="tab-pane copilot-pane">
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="message-avatar">
              {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="message-content glass-panel">
              {msg.text}
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
      
      <div className="chat-input-area">
        <input 
          type="text" 
          placeholder="Ask Copilot..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={!query.trim()} className="btn-send">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Copilot;
