import React from 'react';

export default function Navbar({ activeSection, setActiveSection }) {
  const linkStyle = {
    color: 'var(--text-muted)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.7rem',
    fontWeight: 500,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    transition: 'color 0.2s',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent'
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 100,
      background: 'rgba(5, 5, 8, 0.75)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '1.25rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <button 
        onClick={() => setActiveSection('about')}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-space)',
          fontWeight: 800,
          fontSize: '1.1rem',
          color: 'white',
          letterSpacing: '-.03em',
        }}
      >
        H<span style={{ color: 'var(--primary)' }}>.</span>RK
      </button>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-muted)'; }}
              style={{
                ...linkStyle,
                color: isActive ? '#fff' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              }}
            >
              {sec.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
