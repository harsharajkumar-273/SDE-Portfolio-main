import React from 'react';

export default function ReCLMetrics() {
  const benchmarks = [
    { name: 'ReCL (Ours)', score: 0.6060, color: 'var(--secondary)' },
    { name: 'ReDCL+Strat', score: 0.5604, color: '#9ca3af' },
    { name: 'Supervised (Scratch)', score: 0.4351, color: '#6b7280' },
    { name: 'SimCLR (Baseline)', score: 0.2394, color: '#4b5563' },
  ];

  return (
    <div className="glass-card" style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      background: 'rgba(20, 24, 33, 0.6)',
      border: '1px solid var(--border)',
      borderRadius: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 className="font-space" style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
          PICMUS Sim-to-Real Benchmark
        </h4>
        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', fontWeight: 600 }}>
          10% Label Budget
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {benchmarks.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: idx === 0 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: idx === 0 ? 600 : 400 }}>
                {item.name}
              </span>
              <span style={{ color: item.color, fontWeight: 700 }}>
                {item.score.toFixed(4)} NCC
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${item.score * 100}%`,
                height: '100%',
                background: item.color,
                borderRadius: '4px',
                transition: 'width 1s ease-in-out'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '0.5rem',
        padding: '0.8rem',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '0.8rem',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1rem' }}>0.9037</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>EEG Denoising NCC</div>
        </div>
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }} />
        <div>
          <div style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1rem' }}>10%</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>Label Scarcity Cap</div>
        </div>
      </div>
    </div>
  );
}
