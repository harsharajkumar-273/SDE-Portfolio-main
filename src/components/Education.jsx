import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" style={{
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
        <GraduationCap size={28} style={{ color: 'var(--secondary)' }} /> Academic Credentials
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Vanderbilt University */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                Master of Science in Computer Science
              </h3>
              <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
                Vanderbilt University
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} /> Aug 2025 – Jun 2027
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Nashville, TN
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            Specializing in intelligent physical systems, robotics control pipelines, real-time distributed engineering, and self-supervised medical image processing. Active Research Assistant at the VU-BEAM Lab.
          </p>
        </div>

        {/* VIT Chennai */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                Bachelor of Technology in Computer Science
              </h3>
              <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
                Vellore Institute of Technology (VIT)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} /> Aug 2021 – May 2025
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Chennai, India
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            Completed core coursework in Algorithms & Data Structures, Systems Engineering, ML/AI, and Database Design. Co-lead of the Technical Division at the Google Developer Student Club (GDSC).
          </p>
        </div>
      </div>
    </section>
  );
}
