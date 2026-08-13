import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './Components.css';

interface TimelineProps {
  triggerUpdate: number;
}

const Timeline: React.FC<TimelineProps> = ({ triggerUpdate }) => {
  const [events, setEvents] = useState([
    { id: 1, time: '2023-10-12 14:32', title: 'Account X-17 Created', source: 'Metadata', entities: ['X-17'] },
    { id: 2, time: '2023-11-05 09:15', title: 'Device D04 Registered', source: 'Device Log', entities: ['D04'] },
    { id: 3, time: '2023-12-20 18:45', title: 'Suspicious Transfer', source: 'Bank Record', entities: ['X-17'] },
  ]);

  useEffect(() => {
    if (triggerUpdate > 0) {
      setEvents(prev => [
        { id: Date.now(), time: '2024-01-15 11:20', title: 'Cross-device Login Detected', source: 'Auth Log E063', entities: ['X-17', 'D04'] },
        ...prev
      ]);
    }
  }, [triggerUpdate]);

  return (
    <div className="tab-pane">
      <div className="timeline-container">
        {events.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={triggerUpdate > 0 && i === 0 ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="timeline-event"
          >
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-line"></div>
            </div>
            <div className="timeline-content glass-panel">
              <div className="event-time"><Clock size={12} /> {event.time}</div>
              <div className="event-title">{event.title}</div>
              <div className="event-meta">
                <span className="source">{event.source}</span>
                <div className="entities">
                  {event.entities.map(e => <span key={e} className="entity-tag">{e}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
