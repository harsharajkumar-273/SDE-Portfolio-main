import React from 'react';
import { Mail, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" style={{
      padding: '5rem 1.5rem 2rem 1.5rem',
      maxWidth: '850px',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      <div className="font-mono" style={{
        background: 'rgba(31, 182, 166, 0.05)',
        padding: '0.4rem 1rem',
        borderRadius: '20px',
        border: '1px solid rgba(31, 182, 166, 0.18)',
        fontSize: '0.65rem',
        fontWeight: 600,
        color: 'var(--secondary)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Software & Systems Engineer
      </div>
      
      <h1 style={{
        fontFamily: 'var(--font-space)',
        fontSize: '3.8rem',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-.05em',
        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0.5rem 0'
      }}>
        Harsha Raj Kumar
      </h1>
      
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        maxWidth: '640px',
        lineHeight: 1.7,
        margin: '0 auto'
      }}>
        MS Computer Science student at <strong>Vanderbilt University</strong>. 
        Engineered low-level C++20 storage engines (`io_uring`), high-throughput event streaming pipelines, SRE rate-limiting gateways, and WebAssembly-powered browser IDE sandboxes.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <a href="mailto:harsharajkumar273@gmail.com" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <Mail size={16} /> Get in Touch
        </a>
        <a href="https://github.com/harsharajkumar-273" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg> GitHub
        </a>
        <a href="https://linkedin.com/in/harsharajkumar273" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" rx="1" />
            <circle cx="4" cy="4" r="2" />
          </svg> LinkedIn
        </a>
      </div>

      {/* Dynamic Systems Stats Row */}
      <div className="stats-row" style={{ width: '100%' }}>
        <div className="stat">
          <div><span className="stat-num">25</span><span className="stat-suf">k+</span></div>
          <span className="stat-label">req/sec P99 &lt; 15ms</span>
        </div>
        <div className="stat">
          <div><span className="stat-num">72</span><span className="stat-suf" style={{ color: 'var(--accent-purple)' }}>%</span></div>
          <span className="stat-label">WASM Build Latency Cut</span>
        </div>
        <div className="stat">
          <div><span className="stat-num">4.2</span><span className="stat-suf" style={{ color: 'var(--secondary)' }}>x</span></div>
          <span className="stat-label">AVX2 SIMD Speedup</span>
        </div>
      </div>
      
      <a 
        href="#projects"
        style={{ 
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          marginTop: '1rem', 
          color: 'var(--text-muted)', 
          animation: 'bounce 2s infinite' 
        }}
      >
        <ChevronDown size={28} style={{ color: 'var(--text-muted)' }} />
      </a>
    </section>
  );
}
