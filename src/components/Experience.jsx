import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" style={{
      maxWidth: '850px',
      margin: '4rem auto 0 auto',
      padding: '0 1.5rem'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-space)',
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Briefcase size={28} style={{ color: 'var(--secondary)' }} /> Professional History
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* VU-BEAM Lab Experience */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                Research Assistant
              </h3>
              <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
                VU-BEAM Lab, Vanderbilt University
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} /> Oct 2025 – Present
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Nashville, TN
              </div>
            </div>
          </div>
          
          <ul style={{
            paddingLeft: '1.2rem',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <li>
              Designed and evaluated <strong style={{ color: '#fff' }}>ReCL / DAC-Learn</strong>, a novel self-supervised ultrasound representation learning model for processing high-frequency medical sensor streams, evaluated against 4 baselines on the PICMUS benchmark.
            </li>
            <li>
              Achieved <strong style={{ color: '#fff' }}>85% improvement</strong> in image contrast (CNR: 3.5+ dB) and outperformed CycleGAN by <strong style={{ color: '#fff' }}>20%</strong> on clinical cardiac datasets with zero paired training samples.
            </li>
            <li>
              Optimized multi-GPU training throughput, reducing training latency by <strong style={{ color: '#fff' }}>40%</strong> via custom data loader pipelines built to preprocess, augment, and cache 10,000+ high-resolution images.
            </li>
          </ul>
        </div>

        {/* Math Dept Experience */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                Platform Architect & Software Engineer
              </h3>
              <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
                Vanderbilt University Mathematics Department
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} /> Jan 2024 – May 2024
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Nashville, TN
              </div>
            </div>
          </div>
          
          <ul style={{
            paddingLeft: '1.2rem',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <li>
              Engineered <strong style={{ color: '#fff' }}>Proofdesk</strong>, a collaborative Web IDE and compilation sandbox, reducing book compilation latency by <strong style={{ color: '#fff' }}>72%</strong> via client-side WebAssembly (Pyodide) compilation.
            </li>
            <li>
              Deployed isolated, resource-constrained sandbox terminals (512MB RAM limit) using WebSocket streams, node-pty, and containerized Docker runtimes.
            </li>
            <li>
              Architected a resilient distributed task queue using Redis and BullMQ, implementing local fallback loops to ensure 100% uptime under network partitions.
            </li>
            <li>
              Provisioned and hosted the platform on AWS (EC2, Route 53, S3) with automated deployment pipelines via GitHub Actions.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
