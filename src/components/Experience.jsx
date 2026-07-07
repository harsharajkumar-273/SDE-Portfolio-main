import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const roles = [
    {
      title: 'Systems & Backend Research Assistant',
      company: 'VU Math Department',
      date: 'Sep 2025 – Present',
      location: 'Nashville, TN',
      details: [
        'Architected a browser-based Cloud IDE using the Monaco code editor with custom auto-completion utilities.',
        'Developed a PreTeXt/XML to static HTML compilation pipeline running inside microservice Docker containers.',
        'Decreased textbook deployment build failures by 60% and optimized CI/CD cycles by 75% using GitHub Actions.',
        'Implemented collaborative concurrent editing features using CRDTs (Y.js) and a custom WebSocket sync server.'
      ]
    },
    {
      title: 'Software Engineer RA',
      company: 'VU-BEAM Lab',
      date: 'Oct 2025 – Present',
      location: 'Nashville, TN',
      details: [
        'Designed high-throughput data pipelines on multi-GPU nodes to handle real-time medical sensor streams.',
        'Optimized core numerical compute blocks in PyTorch, reducing execution latency by 40% across training nodes.',
        'Engineered distributed database ingestion scripts to process clinical benchmark datasets in parallel.'
      ]
    }
  ];

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
        gap: '0.5rem',
        color: 'var(--text-main)'
      }}>
        <Briefcase size={28} style={{ color: 'var(--secondary)' }} /> Professional History
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {roles.map((role, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {role.title}
                </h3>
                <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem', fontFamily: 'var(--font-space)' }}>
                  {role.company}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--primary)' }} /> {role.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} /> {role.location}
                </div>
              </div>
            </div>

            <ul style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              listStyleType: 'none',
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              {role.details.map((detail, dIdx) => (
                <li key={dIdx} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.55rem',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'inline-block'
                  }} />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
