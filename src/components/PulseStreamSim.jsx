import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, Server, Zap } from 'lucide-react';

export default function PulseStreamSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ingestRate, setIngestRate] = useState(12000); // RPS
  const [dedupedCount, setDedupedCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const resetSim = () => {
    setLogs(['[Ingestion Service] Stream listener active. Connect devices.']);
    setIngestRate(12000);
    setDedupedCount(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    resetSim();
  }, []);

  const addLog = (msg) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 8)]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Ingestion events
      const devId = Math.floor(Math.random() * 80) + 10;
      const isDuplicate = Math.random() > 0.65; // 35% duplicate rate

      if (isDuplicate) {
        setDedupedCount(prev => prev + 1);
        addLog(`🚫 INTERCEPT: Edge Redis deduplicated duplicate event from device_${devId}. Served HTTP 200.`);
      } else {
        addLog(`✅ ACCEPT: POST /v1/events from device_${devId} -> Redpanda Part_2 (offset: ${Math.floor(Math.random() * 1000)}).`);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Server size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>PulseStream Telemetry Gate</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>Redpanda & Redis Deduplication Broker</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Performance Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '0.6rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>THROUGHPUT</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--secondary)' }}>
                {isPlaying ? ingestRate.toLocaleString() : 0} RPS
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>REDIS DEDUPED</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-orange)' }}>
                {dedupedCount}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>BROKER PARTITION KEYS:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Zap size={12} style={{ color: 'var(--secondary)' }} /> deviceId
            </span>
          </div>

        </div>

        {/* Right Side: Control & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Stop Pipeline' : 'Ingest IoT Stream'}
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              Reset
            </button>
          </div>

          {/* Logs Terminal */}
          <div style={{
            height: '115px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.6rem 0.8rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem'
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
