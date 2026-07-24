import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      issued: 'Jul 2026',
      expires: 'Jul 2029',
      badge: 'AWS Certified',
      color: '#FF9900', // AWS Brand Color
      icon: 'AWS',
      desc: 'Demonstrates expert competency in AI/ML workloads, generative AI architectures, and cloud-native AI implementation strategies on Amazon Web Services.'
    },
    {
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      issued: 'Nov 2024',
      expires: 'Lifetime',
      credentialId: 'DA594ED396D6BED',
      badge: 'Azure AI',
      color: '#0089D6', // Microsoft Azure Brand Color
      icon: 'Azure',
      desc: 'Validates foundational knowledge of artificial intelligence, machine learning concepts, and Microsoft Azure AI cloud services.',
      link: 'https://learn.microsoft.com/en-us/users/harshar-1294/credentials/DA594ED396D6BED'
    }
  ];

  return (
    <section id="certifications" style={{
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
        <ShieldCheck size={28} style={{ color: 'var(--primary)' }} /> Licenses & Certifications
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {certifications.map((item, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '1.5rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            borderTop: `4px solid ${item.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                {item.issuer}
              </span>
              <span style={{
                fontSize: '0.6rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '10px',
                background: `${item.color}15`,
                color: item.color,
                border: `1px solid ${item.color}35`,
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)'
              }}>
                {item.badge}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {item.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
              {item.desc}
            </p>

            {item.credentialId && (
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Credential ID: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.credentialId}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Issued {item.issued} {item.expires ? `· Expires ${item.expires}` : ''}
              </span>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: 'var(--font-space)'
                }}>
                  Verify <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
