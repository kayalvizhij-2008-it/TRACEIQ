import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, FileText, Smartphone, User, MapPin, Database, ArrowRight } from 'lucide-react';
import './Landing.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 2000); // Connecting
    const timer2 = setTimeout(() => setAnimationStage(2), 4000); // Correlating
    const timer3 = setTimeout(() => setAnimationStage(3), 6000); // CaseGraph Forms
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnterCaseGraph = () => {
    navigate('/case/CASE-ACPIA-2048');
  };

  const floatingIcons = [
    { Icon: FileText, label: 'DOCUMENT', delay: 0 },
    { Icon: Network, label: 'MESSAGE', delay: 0.2 },
    { Icon: Smartphone, label: 'DEVICE', delay: 0.4 },
    { Icon: User, label: 'ACCOUNT', delay: 0.6 },
    { Icon: MapPin, label: 'LOCATION', delay: 0.8 },
    { Icon: Database, label: 'METADATA', delay: 1.0 },
  ];

  return (
    <div className="landing-container">
      <div className="landing-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>
      
      <main className="landing-main">
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="brand-badge">
            <span className="dot animate-pulse"></span>
            AGENTIC CHILD PROTECTION INVESTIGATION ASSISTANT
          </div>
          
          <h1 className="hero-title">
            <span className="text-gradient">TRACE</span>
            <span className="text-accent glow-text">IQ</span>
            <span className="subtitle">CASEGRAPH</span>
          </h1>
          
          <h2 className="hero-tagline">
            CONNECT THE EVIDENCE. <br />
            RECONSTRUCT THE TRUTH.
          </h2>
          
          <p className="hero-description">
            An evidence-grounded investigation intelligence platform that transforms fragmented digital evidence into connected, explainable case intelligence.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary btn-large" onClick={handleEnterCaseGraph}>
              ENTER CASEGRAPH <ArrowRight size={18} />
            </button>
            <button className="btn-secondary btn-large" onClick={handleEnterCaseGraph}>
              RUN LIVE CASE
            </button>
          </div>
        </motion.div>

        <div className="animation-section">
          <div className="animation-container">
            {animationStage === 0 && <h3 className="stage-label">FRAGMENTED EVIDENCE</h3>}
            {animationStage === 1 && <h3 className="stage-label">CONNECTING...</h3>}
            {animationStage === 2 && <h3 className="stage-label">CORRELATING...</h3>}
            {animationStage >= 3 && <h3 className="stage-label text-accent">INTELLIGENCE EMERGES</h3>}
            
            <div className={`nodes-container stage-${animationStage}`}>
              {floatingIcons.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="floating-node"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: animationStage === 0 ? [0, -15, 0] : 0,
                    x: animationStage >= 2 ? (Math.cos(index * Math.PI / 3) * 120) : 0,
                    top: animationStage >= 2 ? `calc(50% + ${Math.sin(index * Math.PI / 3) * 120}px)` : 'auto',
                    left: animationStage >= 2 ? `calc(50% + ${Math.cos(index * Math.PI / 3) * 120}px)` : 'auto',
                  }}
                  transition={{ 
                    duration: 0.8,
                    y: { repeat: animationStage === 0 ? Infinity : 0, duration: 3, delay: item.delay, ease: 'easeInOut' }
                  }}
                >
                  <div className="node-icon"><item.Icon size={24} /></div>
                  <div className="node-label">{item.label}</div>
                </motion.div>
              ))}
              
              {animationStage >= 3 && (
                <motion.div 
                  className="center-node"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  CASE<br/>INTELLIGENCE
                </motion.div>
              )}
              
              {animationStage >= 2 && (
                <svg className="connection-lines" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                   {floatingIcons.map((_, index) => (
                     <motion.line 
                        key={`line-${index}`}
                        x1="50%" y1="50%"
                        x2={`calc(50% + ${Math.cos(index * Math.PI / 3) * 120}px)`}
                        y2={`calc(50% + ${Math.sin(index * Math.PI / 3) * 120}px)`}
                        stroke="rgba(124, 58, 237, 0.4)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                     />
                   ))}
                </svg>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="core-principles">
          <div className="principle">AI RECOMMENDS.</div>
          <div className="principle">EVIDENCE SUPPORTS.</div>
          <div className="principle">HUMANS DECIDE.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
