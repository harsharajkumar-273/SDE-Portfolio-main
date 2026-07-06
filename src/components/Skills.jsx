import React from 'react';
import { Code2, Brain, Database, Cloud, Settings } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={20} style={{ color: 'var(--primary)' }} />,
      items: ['Python', 'C++', 'Java', 'JavaScript (Node.js)', 'TypeScript', 'SQL', 'HTML/CSS']
    },
    {
      title: 'ML & Robotics',
      icon: <Brain size={20} style={{ color: 'var(--secondary)' }} />,
      items: ['PyTorch', 'Imitation Learning', 'Behavioral Cloning', 'BEV Occupancy Mapping', 'Weights & Biases', 'HuggingFace']
    },
    {
      title: 'Backend & Systems',
      icon: <Database size={20} style={{ color: 'var(--accent-purple)' }} />,
      items: ['FastAPI', 'Express', 'Redis', 'PostgreSQL (PostGIS)', 'Docker', 'RESTful APIs', 'gRPC', 'Socket.io']
    },
    {
      title: 'Cloud & Infrastructure',
      icon: <Cloud size={20} style={{ color: 'var(--primary)' }} />,
      items: ['AWS (EC2, ECS, S3, RDS)', 'Prometheus', 'Grafana', 'GitHub Actions CI/CD']
    },
    {
      title: 'CS Fundamentals',
      icon: <Settings size={20} style={{ color: 'var(--secondary)' }} />,
      items: ['Data Structures & Algorithms', 'PID Control Systems', 'System Design', 'Circuit Breaking', 'Load Balancing']
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
        <Brain size={28} style={{ color: 'var(--primary)' }} /> Core Capabilities
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
