import React, { useState, useEffect } from 'react';
import { Play, Pause, Compass } from 'lucide-react';

export default function FernOSSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hazardTime, setHazardTime] = useState(0); // In hours since disaster
  const [activeRoute, setActiveRoute] = useState('Default (Unpenalized)');
  const [logs, setLogs] = useState([]);

  const resetSim = () => {
    setLogs(['[Pathfinder] Spatial routing graph listener loaded. Ready.']);
    setHazardTime(0);
    setActiveRoute('Default (Unpenalized)');
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
      // Simulate ticking hazard age
      setHazardTime(prev => {
        const next = Math.round((prev + 0.5) * 10) / 10;
        if (next > 10) return 0; // wrap around
        
        // Calculate penalty multiplier exp(-1.5 * next)
        const penalty = Math.exp(-1.5 * next);
        
        // Route changes dynamically based on decay penalty
        if (next < 2.0) {
          setActiveRoute('Alternate Sector 3 Route (Hazard Threat: High)');
          addLog(`⚠️ PATH SHIFT: Default road has active hazard edge. Scaling Dijkstra weight by exp(-1.5 * ${next}) = ${(penalty * 100).toFixed(2)}% reliability.`);
        } else {
          setActiveRoute('Default Route (Hazard Cleared/Decayed)');
          addLog(`✅ PATH RESTORED: Hazard edge has decayed. Dijkstra weights normalized.`);
        }
        
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border)' }}>
      <div className="widget-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Compass size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>ARIA Pathfinder Router</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem', fontWeight: 600 }}>Dijkstra Spatial PostGIS Routing</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Route Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>HAZARD DURATION ELAPSED</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                {hazardTime} hours
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.5"
              value={hazardTime} 
              onChange={(e) => setHazardTime(Number(e.target.value))}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          <div style={{
            background: 'rgba(15,23,42,0.04)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem'
          }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ACTIVE COMPUTED PATH</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: activeRoute.includes('Default') ? 'var(--secondary)' : 'var(--accent-gold)' }}>
              {activeRoute}
            </span>
          </div>

        </div>

        {/* Right Side: Play & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause Simulation' : 'Simulate Disaster Influx'}
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              Reset
            </button>
          </div>

          {/* Logs Terminal */}
          <div style={{
            background: '#09090b',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: '#121214',
              padding: '0.4rem 0.6rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>pathfinder.log</span>
              <span style={{ 
                fontSize: '0.6rem', 
                fontFamily: 'var(--font-mono)', 
                color: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                  display: 'inline-block',
                  animation: isPlaying ? 'pulse 2s infinite' : 'none'
                }} />
                {isPlaying ? 'RUNNING' : 'IDLE'}
              </span>
            </div>
            <div style={{
              height: '95px',
              padding: '0.6rem 0.8rem',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#94a3b8',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              background: '#09090b'
            }}>
              {logs.map((log, i) => (
                <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
