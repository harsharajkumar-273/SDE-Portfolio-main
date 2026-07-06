import React from 'react';

export default function Navbar() {
  const linkStyle = {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.7rem',
    fontWeight: 600,
    fontFamily: 'var(--font-space)', // Sora display font
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    transition: 'color 0.25s ease',
    paddingBottom: '4px',
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = 'var(--primary)'; // GSSoC Teal hover
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
      background: 'rgba(11, 16, 38, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '1.25rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <a href="#about" style={{
        fontFamily: 'var(--font-space)',
        fontWeight: 900,
        fontSize: '1.25rem',
        letterSpacing: '-.05em',
        textDecoration: 'none',
        background: 'linear-gradient(135deg, #ffffff 0%, var(--primary) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        H.RK
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
