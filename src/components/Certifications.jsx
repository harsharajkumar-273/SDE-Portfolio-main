import React from 'react';
import { Calendar, ShieldCheck, FileText } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      issued: 'Nov 2024',
      credentialId: 'DA594ED396D6BED',
      skills: ['Artificial Intelligence (AI)', 'Cloud Computing', 'Azure'],
      credentialUrl: '/Credentials%20-%20harshar-1294%20_%20Microsoft%20Learn.pdf',
      logo: (
        <svg width="18" height="18" viewBox="0 0 23 23" style={{ minWidth: '18px' }}>
          <rect x="0" y="0" width="11" height="11" fill="#f25022" />
          <rect x="12" y="0" width="11" height="11" fill="#7fba00" />
          <rect x="0" y="12" width="11" height="11" fill="#00a4ef" />
          <rect x="12" y="12" width="11" height="11" fill="#ffb900" />
        </svg>
      )
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {certifications.map((cert, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '1.5rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}>
            {/* Logo container */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              background: 'var(--primary-glow)',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}>
              {cert.logo}
            </div>

            {/* Cert Details */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.15rem', fontFamily: 'var(--font-space)', fontWeight: 500 }}>
                    {cert.issuer}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <Calendar size={12} style={{ color: 'var(--primary)' }} /> Issued {cert.issued}
                  </div>
                  {cert.credentialId && (
                    <div style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>

              {/* Skills tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tag tag-blue" style={{ fontSize: '0.6rem' }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Credential PDF Link */}
              {cert.credentialUrl && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn"
                    style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.35rem 0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      textDecoration: 'none'
                    }}
                  >
                    <FileText size={12} /> View Certificate PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
