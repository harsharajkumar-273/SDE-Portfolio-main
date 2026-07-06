import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import FernOSSim from './components/FernOSSim';
import CleanOpsSim from './components/CleanOpsSim';
import VisionDriveSim from './components/VisionDriveSim';
import RadarSim from './components/RadarSim';
import ReCLMetrics from './components/ReCLMetrics';
import NerveSegmentationSim from './components/NerveSegmentationSim';
import Education from './components/Education';
import Publications from './components/Publications';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const projects = [
    {
      id: 'recl',
      title: 'ReCL: Reconstructive Contrastive Learning',
      label: 'Flagship Research',
      desc: 'A physics-informed self-supervised representation learning framework submitted to NeurIPS 2026. Enforces phase-sensitive Normalized Cross-Correlation (NCC) reconstruction directly inside the InfoNCE contrastive bottleneck.',
      bullets: [
        'Formulated N-way Depth-Aware InfoNCE to suppress depth-attenuation shortcuts.',
        'Outperformed supervised training from scratch by 0.17 NCC at a highly constrained 10% labels budget.',
        'Published open-source pre-trained model weights and HDF5 dataset archives to Hugging Face.'
      ],
      tags: ['PyTorch', 'Contrastive', 'Medical AI'],
      links: [
        { label: 'HF Models', href: 'https://huggingface.co/harsharajkumar273/ReCL-Ultrasound-Checkpoints', primary: true },
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/ReCL', primary: false }
      ],
      simulator: <ReCLMetrics />,
      categories: ['ai']
    },
    {
      id: 'visiondrive',
      title: 'VisionDrive-RL Autonomous Control',
      label: 'Flagship AI Project',
      desc: 'A multi-camera perception and continuous control pipeline. Logs high-frequency trajectory data (3 perspective views + action parameters) during teleoperation for behavioral cloning and BEV-projectors.',
      bullets: [
        'Trained supervised BEV spatial projectors mapping perspective views to orthographic coords.',
        'Deployed Behavioral Cloning policy imitating human control trajectories.',
        'Evaluated agent policy robustness under adversarial rain, fog, and night sensor modes.'
      ],
      tags: ['RL Control', 'BEV Projection', 'Robotics'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/Vision-Drive-RL', primary: true }
      ],
      simulator: <VisionDriveSim />,
      categories: ['ai']
    },
    {
      id: 'segmentation',
      title: 'Ultrasound Nerve Segmenter',
      label: 'Computer Vision & MedTech',
      desc: 'A deep learning computer vision pipeline designed to segment the Brachial Plexus nerve bundle in ultrasound scans, built around a fully convolutional U-Net architecture.',
      bullets: [
        'Trained U-Net semantic segmenter on high-frequency clinical scan datasets.',
        'Deployed an interactive web application loading weights from local H5 checkpoints.',
        'Integrated dynamic overlay visualization of binarized confidence masks on raw neck scans.'
      ],
      tags: ['U-Net', 'Segmentation', 'Streamlit'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/Ultrasound-Nerve-Segmentation', primary: true }
      ],
      simulator: <NerveSegmentationSim />,
      categories: ['ai']
    },
    {
      id: 'fernos',
      title: 'ARIA Disaster Pathfinder',
      label: 'Distributed Systems',
      desc: 'A resilient crisis command platform. Models urban infrastructure as a spatial PostGIS graph and computes safest paths to affected sectors by penalizing hazard decay rates.',
      bullets: [
        'Integrated custom Dijkstra weights scaled by exponential decay offsets exp(-1.5t).',
        'Implemented real-time Socket.io responder updates triggered by telemetry listeners.',
        'Maintained graph uptime via asynchronous ML workers decoupling graph search from telemetry ingestion.'
      ],
      tags: ['TypeScript', 'PostGIS', 'Socket.io'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/ARIA', primary: true }
      ],
      simulator: <FernOSSim />,
      categories: ['systems']
    },
    {
      id: 'cleanops',
      title: 'CleanOps OpenEnv Benchmark',
      label: 'Agentic AI & Eval',
      desc: 'An evaluation benchmark environment designed to score LLM agent planners on multi-step operational datasets. Features dynamic Docker containers ensuring safe, sandboxed script runs.',
      bullets: [
        'Built sandboxed environments supporting CRM, billing, and inventory tasks.',
        'Formulated custom reward shaping mechanics providing dense step-level partial credits.',
        'Created validation loops checking schema correctness against oracle states.'
      ],
      tags: ['LLM Planners', 'Docker Sandbox', 'Eval Sandbox'],
      links: [
        { label: 'Launch Space', href: 'https://huggingface.co/spaces/harsharajkumar273/cleanops-openenv', primary: true },
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/cleanops', primary: false }
      ],
      simulator: <CleanOpsSim />,
      categories: ['ai', 'systems']
    },
    {
      id: 'radar',
      title: 'Repost-Radar Telemetry Filter',
      label: 'High-Performance Systems',
      desc: 'A C++20 real-time deduplication engine optimized for cleaning continuous telemetry streams. Minimizes database storage footprints by discarding redundant frames before model training.',
      bullets: [
        'Leveraged AVX2 SIMD hardware vectorization to parallelize signature generation.',
        'Applied Locality-Sensitive Hashing (LSH) and MinHash functions for O(1) duplicates scanning.',
        'Sustained over 240k requests per second under peak sensor stream ingestion.'
      ],
      tags: ['C++20', 'AVX2 SIMD', 'LSH MinHash'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/Repost-Radar', primary: true }
      ],
      simulator: <RadarSim />,
      categories: ['systems']
    }
  ];

  const filteredProjects = projects.filter(
    (p) => activeTab === 'all' || p.categories.includes(activeTab)
  );

  const selectedProjForModal = projects.find(p => p.id === activeModalProject);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingBottom: '6rem' }}>
        <Hero />
        
        <Experience />
        
        <Education />
        
        {/* Projects Section */}
        <section id="projects" className="container" style={{ marginTop: '4rem' }}>
          <h2 className="font-space" style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(to right, #ffffff, var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            GitHub Projects & Simulators
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto'
          }}>
            A showcase of core engineering implementations. Select a domain to filter, and launch dynamic interactive simulators.
          </p>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {['all', 'ai', 'systems'].map((tab) => {
              const label = tab === 'all' ? 'All Projects' : tab === 'ai' ? 'AI & Robotics' : 'Systems & Infrastructure';
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="font-space"
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--secondary)' : 'var(--border)',
                    background: isActive ? 'rgba(104, 211, 145, 0.08)' : 'transparent',
                    color: isActive ? 'var(--secondary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Grid Layout (like the Vercel portfolio) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {filteredProjects.map((p) => (
              <div 
                key={p.id} 
                className="glass-card" 
                style={{ 
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.2rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      fontFamily: 'var(--font-mono)', 
                      color: 'var(--primary)', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {p.label}
                    </span>
                    <button 
                      onClick={() => setActiveModalProject(p.id)}
                      className="btn"
                      style={{ 
                        padding: '0.2rem 0.6rem', 
                        fontSize: '0.65rem', 
                        borderColor: 'rgba(104, 211, 145, 0.3)',
                        color: 'var(--secondary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Simulate ⚡
                    </button>
                  </div>
                  
                  <h3 className="font-space" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>
                    {p.title}
                  </h3>
                  
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag tag-blue" style={{ fontSize: '0.58rem', padding: '0.22rem 0.55rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {p.links.map((link, lIdx) => (
                      <a 
                        key={lIdx}
                        href={link.href}
                        target="_blank" 
                        rel="noreferrer" 
                        className={link.primary ? 'btn btn-primary' : 'btn'}
                        style={{ 
                          textDecoration: 'none', 
                          display: 'inline-flex', 
                          fontSize: '0.7rem', 
                          padding: '0.35rem 0.8rem',
                          flexGrow: 1
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <Publications />
        
        <Skills />
      </main>

      {/* Glassmorphic Modal Overlay for Simulators */}
      {selectedProjForModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 5, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{
            maxWidth: '850px',
            width: '100%',
            padding: '2.5rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-dark)'
          }}>
            <button 
              onClick={() => setActiveModalProject(null)}
              className="btn" 
              style={{ 
                position: 'absolute', 
                top: '1rem', 
                right: '1rem', 
                padding: '0.4rem 0.8rem', 
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Close ✕
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--primary)', 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {selectedProjForModal.label} Sandbox
              </span>
              <h3 className="font-space" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {selectedProjForModal.title}
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              {selectedProjForModal.desc}
            </p>

            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '2rem' }}>
              {selectedProjForModal.bullets.map((b, bIdx) => (
                <li key={bIdx}>{b}</li>
              ))}
            </ul>
            
            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--border)' 
            }}>
              {selectedProjForModal.simulator}
            </div>
          </div>
        </div>
      )}

      <footer style={{
        background: 'rgba(5, 5, 8, 0.95)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        © {new Date().getFullYear()} Harsha Raj Kumar · Nashville, TN · Built with React & Vite.
      </footer>
    </div>
  );
}
