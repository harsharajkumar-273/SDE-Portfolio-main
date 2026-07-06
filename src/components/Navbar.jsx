import React from 'react';

export default function Navbar() {
  const linkStyle = {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.7rem',
    fontWeight: 500,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    transition: 'color 0.2s',
    paddingBottom: '4px',
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = '#fff';
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = 'var(--text-muted)';
  };

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
      <a href="#about" style={{
        fontFamily: 'var(--font-space)',
        fontWeight: 800,
        fontSize: '1.1rem',
        color: 'white',
        letterSpacing: '-.03em',
        textDecoration: 'none',
      }}>
        H<span style={{ color: 'var(--primary)' }}>.</span>RK
      </a>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="#about" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</a>
        <a href="#experience" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Experience</a>
        <a href="#education" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Education</a>
        <a href="#projects" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Projects</a>
        <a href="#publications" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Publications</a>
        <a href="#skills" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Skills</a>
      </div>
    </nav>
  );
}
