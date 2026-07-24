import React from 'react';
import { Code2, Server, Database, Cloud, Cpu } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={20} style={{ color: 'var(--primary)' }} />,
      items: ['C++20', 'C', 'Java', 'Python', 'Go', 'TypeScript', 'JavaScript (Node.js)', 'SQL']
    },
    {
      title: 'Systems & Storage Engine',
      icon: <Cpu size={20} style={{ color: 'var(--secondary)' }} />,
      items: ['Linux Systems Programming', 'io_uring', 'O_DIRECT', 'Lock-Free SkipList', 'Block Bloom Filters', 'AVX2 SIMD', 'WebAssembly (Pyodide)']
    },
    {
      title: 'Backend & Distributed Systems',
      icon: <Database size={20} style={{ color: 'var(--accent-purple)' }} />,
      items: ['Express', 'FastAPI', 'Redis (zsets / SETNX)', 'Redpanda / Kafka', 'PostgreSQL (PostGIS)', 'Docker', 'WebSockets (Socket.io)', 'RESTful APIs']
    },
    {
      title: 'Cloud & Infrastructure',
      icon: <Cloud size={20} style={{ color: 'var(--primary)' }} />,
      items: ['AWS (EC2, ECS, S3, RDS)', 'Prometheus', 'Grafana', 'GitHub Actions CI/CD', 'BullMQ Queue', 'Linux CLI']
    },
    {
      title: 'CS Fundamentals & SRE',
      icon: <Server size={20} style={{ color: 'var(--secondary)' }} />,
      items: ['Data Structures & Algorithms', 'System Design', 'SRE Circuit Breaking', 'Token-Bucket Rate Limiting', 'EWMA PID Limiter', 'Memory Arenas']
    }
  ];

  return (
    <section id="skills" style={{
      maxWidth: '1000px',
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
        <Cpu size={28} style={{ color: 'var(--primary)' }} /> Technical Arsenal & Systems Skills
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              {cat.icon}
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                {cat.title}
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cat.items.map((item, i) => (
                <span key={i} style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '8px',
                  background: 'rgba(31, 182, 166, 0.04)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-outfit)'
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
