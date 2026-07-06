import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, Zap, ZapOff, Check, X } from 'lucide-react';

export default function RadarSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [simdActive, setSimdActive] = useState(true);
  const [logs, setLogs] = useState([]);
  
  // Stats
  const [throughput, setThroughput] = useState(0);
  const [dedupCount, setDedupCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [inputText, setInputText] = useState('');

  const resetSim = () => {
    setLogs(['[Deduplicator] Repost-Radar stream listener active. Click Simulate or type text.']);
    setThroughput(0);
    setDedupCount(0);
    setUniqueCount(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    resetSim();
  }, []);

  const addLog = (msg, isDuplicate) => {
    const color = isDuplicate ? 'var(--accent-orange)' : 'var(--accent-green)';
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 14)]);
  };

  // Simulate telemetry flow
  useEffect(() => {
    if (!isPlaying) {
      setThroughput(0);
      return;
    }

    setThroughput(simdActive ? 245000 : 12400);

    const interval = setInterval(() => {
      // Generate mock trajectory frame
      const r = Math.random();
      const isDuplicate = r > 0.45; // 55% duplicate probability in continuous stream
      
      const sig = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      
      if (isDuplicate) {
        setDedupCount((c) => c + 1);
        addLog(`DUPLICATE Frame: {steer: 0.12, speed: 14.5} -> Dropped (Similarity: 100%, Buckets Match)`, true);
      } else {
        setUniqueCount((c) => c + 1);
        addLog(`UNIQUE Frame: {steer: ${(Math.random() * 0.4 - 0.2).toFixed(2)}, speed: ${(10 + Math.random() * 5).toFixed(1)}} -> Signature: [${sig}] saved to DB`, false);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, simdActive]);

  // Handle custom manual text deduplication
  const checkCustomText = () => {
    if (!inputText.trim()) return;
    
    const sig = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    // Simple mock: if text contains words we saw, flag it
    const isDuplicate = inputText.toLowerCase().includes('duplicate') || inputText.length % 2 === 0;
    
    if (isDuplicate) {
      setDedupCount((c) => c + 1);
      addLog(`DUPLICATE Manual Text: "${inputText.slice(0, 20)}..." -> MinHash matched bucket. Dropped.`, true);
    } else {
      setUniqueCount((c) => c + 1);
      addLog(`UNIQUE Manual Text: "${inputText.slice(0, 20)}..." -> Generated MinHash signature [${sig}]`, false);
    }
    
    setInputText('');
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Activity size={20} style={{ color: 'var(--accent-green)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Repost-Radar Deduplicator</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>High-Throughput SIMD LSH stream filter</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Stats and Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AVX2 SIMD ACCELERATION</span>
            <button 
              className={`btn ${simdActive ? 'btn-primary' : ''}`} 
              onClick={() => setSimdActive(!simdActive)}
              style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
            >
              {simdActive ? <Zap size={12} /> : <ZapOff size={12} />} {simdActive ? 'SIMD ON' : 'SIMD OFF'}
            </button>
          </div>

          {/* Telemetry Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr 1fr',
            gap: '0.6rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>THROUGHPUT</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace', color: simdActive ? 'var(--secondary)' : '#fff' }}>
                {throughput.toLocaleString()} RPS
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>FILTERED</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-orange)' }}>
                {dedupCount} frames
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>UNIQUE</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-green)' }}>
                {uniqueCount} frames
              </span>
            </div>
          </div>

          {/* User Input Testing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MANUAL TEXT INGESTION TEST</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type text to MinHash check..."
                style={{
                  flexGrow: 1,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.8rem',
                  color: '#fff',
                  outline: 'none'
                }}
                onKeyDown={(e) => e.key === 'Enter' && checkCustomText()}
              />
              <button className="btn" onClick={checkCustomText} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                Submit
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Log Feed & Play button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause Ingestion' : 'Simulate Telemetry Stream'}
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              Reset
            </button>
          </div>

          <div style={{
            height: '145px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.8rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            {logs.map((log, i) => {
              const isDuplicate = log.includes('DUPLICATE');
              const isUnique = log.includes('UNIQUE');
              const color = isDuplicate ? 'var(--accent-orange)' : isUnique ? 'var(--accent-green)' : 'var(--text-muted)';
              
              return (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', color }}>
                  {isDuplicate && <X size={12} style={{ marginTop: '2px', flexShrink: 0 }} />}
                  {isUnique && <Check size={12} style={{ marginTop: '2px', flexShrink: 0 }} />}
                  <span style={{ lineBreak: 'anywhere' }}>{log}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
