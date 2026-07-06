import React from 'react';
import { Award, FileText, ExternalLink } from 'lucide-react';

export default function Publications() {
  const list = [
    {
      title: 'IEEE Best Paper Award — Paper2Story',
      type: 'Publication & Award',
      date: '2024',
      badge: 'IEEE Best Paper',
      color: 'var(--secondary)',
      desc: 'Engineered a multi-model NLP pipeline utilizing Mistral 7B + LoRA to generate creative narrative summaries from dense academic research PDFs, yielding a 15% ROUGE/BLEU score improvement over baselines.',
    },
    {
      title: 'Hybrid API Vulnerability Detection System using ML Classification',
      type: 'IEEE Published Paper',
      date: '2025',
      badge: 'IEEE Published',
      color: '#34d399',
      desc: 'Developed a hybrid machine learning classification framework to automate structural endpoint discovery and identify authentication flaws across RESTful APIs, combining static AST analysis with runtime telemetry.',
      link: 'https://ieeexplore.ieee.org/abstract/document/11399172'
    },
    {
      title: 'Vanderbilt Global Good Hackathon Finalist',
      type: 'Hackathon Award',
      date: '2025',
      badge: 'Hackathon Finalist',
      color: '#f59e0b',
      desc: 'Co-developed a high-impact crisis response system, winning finalist recognition for social impact and real-time systems execution among competitive university engineering cohorts.',
    }
  ];

  return (
    <section id="publications" style={{
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
        <Award size={28} style={{ color: 'var(--secondary)' }} /> Publications & Recognition
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {list.map((item, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '1.5rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            borderTop: `4px solid ${item.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                {item.type}
              </span>
              <span style={{
                fontSize: '0.6rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '10px',
                background: `${item.color}15`,
                color: item.color,
                border: `1px solid ${item.color}30`,
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {item.badge}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              {item.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
              {item.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-space)' }}>
                {item.date}
              </span>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: 'var(--secondary)',
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                  View on IEEE <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
