import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 100,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '1.1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <a href="#about" style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        color: 'var(--text-main)',
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>harsha@vandy:</span>
        <span style={{ color: 'var(--primary)' }}>~$</span>
        <span className="cursor-blink" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>_</span>
      </a>
      
      <div className="nav-links-container" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="#about" className="nav-link">About</a>
        <a href="#experience" className="nav-link">Experience</a>
        <a href="#education" className="nav-link">Education</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#certifications" className="nav-link">Certifications</a>
        <a href="#publications" className="nav-link">Publications</a>
        <a href="#skills" className="nav-link">Skills</a>
        
        {/* Modern Light/Dark Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}
