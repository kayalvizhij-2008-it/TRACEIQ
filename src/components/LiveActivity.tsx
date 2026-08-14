import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Components.css';

interface LiveActivityProps {
  activities: { id: string; time: string; text: string }[];
}

const LiveActivity: React.FC<LiveActivityProps> = ({ activities }) => {
  return (
    <div className="sidebar-section live-activity">
      <div className="flex-between" style={{ marginBottom: 'var(--spacing-3)' }}>
        <h3 className="section-title" style={{ marginBottom: 0 }}>Investigation Activity</h3>
        <span className="status-live" style={{ fontSize: '0.65rem' }}>● LIVE LOG</span>
      </div>
      
      <div className="activity-list">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -15, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="activity-item"
            >
              <div className="activity-time">{activity.time}</div>
              <div className="activity-text">{activity.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveActivity;
