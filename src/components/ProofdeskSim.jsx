import React, { useState } from 'react';
import { Terminal, Cpu, CheckCircle2, Play, RefreshCw } from 'lucide-react';

export default function ProofdeskSim() {
  const [compiling, setCompiling] = useState(false);
  const [mode, setMode] = useState('wasm'); // 'wasm' or 'docker'
  const [log, setLog] = useState('Proofdesk WASM Sandbox initialized. Editor ready.');
  const [latency, setLatency] = useState('300ms');

  const runBuild = () => {
    setCompiling(true);
    if (mode === 'wasm') {
      setLog('Parsing PreTeXt XML via Pyodide WASM runtime in-browser...');
      setLatency('300ms');
      setTimeout(() => {
        setLog('✅ Client-Side WASM Build Complete. Rendered SVG/HTML DOM tree in 302ms (0 server roundtrips).');
        setCompiling(false);
      }, 400);
    } else {
      setLog('Submitting TeX compilation job to BullMQ Redis Queue...');
      setLatency('1100ms');
      setTimeout(() => {
        setLog('🐳 Containerized Docker Sandbox spawned (512MB RAM, node-pty terminal). Executing pdflatex...');
      }, 500);
      setTimeout(() => {
        setLog('✅ Server-Side PDF/HTML Build Completed in 1,140ms. Streamed back via WebSockets.');
        setCompiling(false);
      }, 1200);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border)' }}>
      <div className="widget-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Terminal size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Proofdesk Web IDE Sandbox</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem', fontWeight: 600 }}>WebAssembly Client-Side & Docker Worker Compiler</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setMode('wasm')}
              className="font-space"
              style={{
                flex: 1,
                padding: '0.5rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: mode === 'wasm' ? 'var(--primary)' : 'var(--border)',
                background: mode === 'wasm' ? 'rgba(31, 182, 166, 0.1)' : 'transparent',
                color: mode === 'wasm' ? 'var(--secondary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <Cpu size={12} style={{ display: 'inline', marginRight: '4px' }} /> Pyodide WASM (Fast)
            </button>
            <button
              onClick={() => setMode('docker')}
              className="font-space"
              style={{
                flex: 1,
                padding: '0.5rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: mode === 'docker' ? 'var(--primary)' : 'var(--border)',
                background: mode === 'docker' ? 'rgba(31, 182, 166, 0.1)' : 'transparent',
                color: mode === 'docker' ? 'var(--secondary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              🐳 Docker Worker (Full)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={runBuild} disabled={compiling} style={{ flex: 1, fontSize: '0.8rem' }}>
              {compiling ? <RefreshCw size={14} className="spin" /> : <Play size={14} />} {compiling ? 'Compiling...' : 'Run Compilation Test'}
            </button>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.04)',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Target Compilation Latency:</span>
            <span style={{ fontWeight: 700, color: mode === 'wasm' ? 'var(--secondary)' : 'var(--accent-purple)' }}>{latency} (72% Faster)</span>
          </div>
        </div>

        {/* Logs */}
        <div style={{
          background: '#0f172a',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', marginBottom: '0.4rem', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Execution Status Log
          </div>
          <div>{log}</div>
        </div>
      </div>
    </div>
  );
}
