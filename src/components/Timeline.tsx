import React, { useEffect, useState } from 'react';
import { Clock, ShieldCheck, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import './Components.css';

interface TimelineProps {
  triggerUpdate: number;
}

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  source: string;
  entities: string[];
  evidenceRef: string;
}

const Timeline: React.FC<TimelineProps> = ({ triggerUpdate }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: 1, time: '2023-10-12 14:32 IST', title: 'Account X-17 Created', source: 'Metadata Log', entities: ['Account X-17'], evidenceRef: 'E001' },
    { id: 2, time: '2023-11-05 09:15 IST', title: 'Device D04 Hardware Binding', source: 'Device Registry', entities: ['Device D04'], evidenceRef: 'E014' },
    { id: 3, time: '2023-12-20 18:45 IST', title: 'Suspicious Session Handover', source: 'Encrypted Message Headers', entities: ['Account X-17', 'Device D04'], evidenceRef: 'E027' },
  ]);

  useEffect(() => {
    if (triggerUpdate > 0) {
      setEvents(prev => [
        { 
          id: Date.now(), 
          time: '2024-01-15 11:20 IST', 
          title: 'Cross-Source Authentication Log Correlated', 
          source: 'Ingested Brief E063', 
          entities: ['Account X-17', 'Device D04', 'Evidence E063', 'Location L08'],
          evidenceRef: 'E063'
        },
        ...prev
      ]);
    }
  }, [triggerUpdate]);

  return (
    <div className="tab-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-acid-lime)', letterSpacing: '0.08em' }}>
          CHRONOLOGICAL INTELLIGENCE FUSION
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gray)' }}>{events.length} EVENTS RECORDED</div>
      </div>

      <div className="timeline-container">
        {events.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={triggerUpdate > 0 && i === 0 ? { opacity: 0, x: -15 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="timeline-event"
          >
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-line"></div>
            </div>
            <div className="timeline-content">
              <div className="event-time">
                <Clock size={12} className="text-acid-lime" /> {event.time}
              </div>
              <div className="event-title">{event.title}</div>
              <div className="event-meta">
                <span className="source" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} className="text-moss-green" /> {event.source} ({event.evidenceRef})
                </span>
              </div>
              <div className="entities" style={{ marginTop: '8px', flexWrap: 'wrap' }}>
                {event.entities.map(e => (
                  <span key={e} className="entity-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Tag size={10} /> {e}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
