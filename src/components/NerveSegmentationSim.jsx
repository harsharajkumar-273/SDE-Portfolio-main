import React, { useState } from 'react';

export default function NerveSegmentationSim() {
  const [threshold, setThreshold] = useState(0.5);

  // Dynamic radius based on threshold to simulate sensitivity trade-off
  const nerveRadius = Math.max(10, 45 - threshold * 40);
  const nerveOpacity = Math.max(0.1, 1.2 - threshold);

  return (
    <div className="glass-card" style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      background: 'rgba(20, 24, 33, 0.6)',
      border: '1px solid var(--border)',
      borderRadius: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 className="font-space" style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#fff' }}>
          U-Net Real-Time Segmenter
        </h4>
        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', fontWeight: 600 }}>
          Brachial Plexus Scan
        </span>
      </div>

      {/* Simulated Scan Screen */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        background: 'radial-gradient(circle at center, #1b202c 0%, #0c0d12 100%)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* SVG showing concentric circles representing tissue boundaries */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Tissue speckle background lines */}
          <path d="M 10,90 Q 90,60 170,90 T 330,90" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 10,130 Q 90,110 170,130 T 330,130" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
          
          {/* Artery Boundary (Reference Structure) */}
          <circle cx="100" cy="90" r="30" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="100" y="93" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Artery</text>
          
          {/* Scalene Muscle boundary */}
          <path d="M 150,40 Q 220,90 280,140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          
          {/* U-Net Segmented Nerve Bundle (Dynamic Area) */}
          <circle cx="210" cy="90" r={nerveRadius} fill={`rgba(52, 211, 153, ${nerveOpacity * 0.4})`} stroke="rgba(52, 211, 153, 0.8)" strokeWidth="2" style={{ transition: 'r 0.2s ease, fill 0.2s ease' }} />
          
          {/* Highlight indicator */}
          {nerveRadius > 15 && (
            <text x="210" y="93" fill="#fff" fontSize="8" textAnchor="middle" fontFamily="var(--font-space)" fontWeight="700">Nerve</text>
          )}
        </svg>

        {/* Scan Line Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'rgba(52, 211, 153, 0.15)',
          boxShadow: '0 0 8px #34d399',
          animation: 'scanLine 3s linear infinite'
        }} />
      </div>

      {/* Control panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Confidence Threshold</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>{threshold.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.9"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--secondary)',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Style insertion for scan line keyframes */}
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}
