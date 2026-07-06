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
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProjectSim = (id) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const projects = [
    {
      id: 'recl',
      title: 'ReCL: Reconstructive Contrastive Learning',
      label: 'Flagship Research Publication',
      desc: 'A physics-informed self-supervised representation learning framework submitted to NeurIPS 2026. It resolves the invariance-reconstruction mismatch by enforcing phase-sensitive Normalized Cross-Correlation (NCC) reconstruction directly inside the InfoNCE contrastive bottleneck.',
      bullets: [
        'Formulated N-way Depth-Aware InfoNCE to suppress depth-attenuation shortcuts.',
        'Outperformed supervised training from scratch by 0.17 NCC at a highly constrained 10% labels budget on the PICMUS in-vivo benchmark.',
        'Published open-source pre-trained model weights and HDF5 dataset archives directly to Hugging Face.'
      ],
      tags: ['PyTorch', 'Contrastive Learning', 'Medical Imaging', 'InfoNCE'],
      links: [
        { label: 'HF Models', href: 'https://huggingface.co/harsharajkumar273/ReCL-Ultrasound-Checkpoints', primary: true },
        { label: 'View Codebase', href: 'https://github.com/harsharajkumar-273/ReCL', primary: false }
      ],
      simulator: <ReCLMetrics />,
      categories: ['ai']
    },
    {
      id: 'visiondrive',
      title: 'VisionDrive-RL Autonomous Control',
      label: 'Flagship AI Project',
      desc: 'A multi-camera perception and continuous control pipeline. It logs high-frequency trajectory data (3 perspective views + action parameters) during manual teleoperation and feeds it into behavioral cloning and BEV-projector networks.',
      bullets: [
        'Trained supervised BEV spatial projectors to map perspective images to orthographic coordinates.',
        'Deployed Behavioral Cloning policy directly imitating human demonstrator control actions.',
        'Evaluated control agent robustness under sensor noise (fog, rain, night modes, lens mud).'
      ],
      tags: ['Behavioral Cloning', 'Projector Networks', 'Teleoperation', 'Robotics'],
      links: [
        { label: 'View Source Code', href: 'https://github.com/harsharajkumar-273/Vision-Drive-RL', primary: true }
      ],
      simulator: <VisionDriveSim />,
      categories: ['ai']
    },
    {
      id: 'segmentation',
      title: 'Ultrasound Nerve Segmenter',
      label: 'Computer Vision & MedTech',
      desc: 'A deep learning computer vision pipeline designed to segment the Brachial Plexus nerve bundle in ultrasound scans. Built around a U-Net architecture and equipped with a live interactive web application.',
      bullets: [
        'Trained fully convolutional U-Net semantic segmenter on medical scan datasets.',
        'Deployed an interactive Streamlit web application loading weights from local H5 checkpoints.',
        'Integrated side-by-side visualization overlays of binarized confidence masks on raw scans.'
      ],
      tags: ['U-Net', 'Semantic Segmentation', 'Streamlit', 'Medical AI'],
      links: [
        { label: 'View Source Code', href: 'https://github.com/harsharajkumar-273/Ultrasound-Nerve-Segmentation', primary: true }
      ],
      simulator: <NerveSegmentationSim />,
      categories: ['ai']
    },
    {
      id: 'fernos',
      title: 'ARIA Disaster Pathfinder',
      label: 'Distributed Systems',
      desc: 'A resilient crisis command platform. It models urban infrastructure as a spatial PostGIS graph and computes safest routes to affected sectors by dynamically penalizing hazard edges based on their decay rates.',
      bullets: [
        'Integrated custom Dijkstra weights scaled by exponential decay offsets exp(-1.5t).',
        'Implemented real-time Socket.io responder updates triggered by background telemetry listeners.',
        'Maintained system uptime via asynchronous ML workers decoupling graph search from telemetry ingestion.'
      ],
      tags: ['TypeScript', 'PostGIS', 'Socket.io', 'Dijkstra Decay'],
      links: [
        { label: 'View Source Code', href: 'https://github.com/harsharajkumar-273/ARIA', primary: true }
      ],
      simulator: <FernOSSim />,
      categories: ['systems']
    },
    {
      id: 'cleanops',
      title: 'CleanOps OpenEnv Benchmark',
      label: 'Agentic AI & Evaluation',
      desc: 'An evaluation benchmark environment designed to score LLM agent planners on multi-step operational datasets. Features dynamic containers ensuring safe execution of sandboxed agent scripts, live-hosted as a Hugging Face Space.',
      bullets: [
        'Built 3 sandboxed task environments supporting CRM, billing, and inventory tasks.',
        'Formulated custom reward shaping mechanics to provide dense step-level partial credits.',
        'Created validation loops checking schema correctness against oracle states.'
      ],
      tags: ['LLM Planners', 'Docker Sandbox', 'Reward Shaping', 'FastAPI'],
      links: [
        { label: 'Launch Space', href: 'https://huggingface.co/spaces/harsharajkumar273/cleanops-openenv', primary: true },
        { label: 'View Source Code', href: 'https://github.com/harsharajkumar-273/cleanops', primary: false }
      ],
      simulator: <CleanOpsSim />,
      categories: ['ai', 'systems']
    },
    {
      id: 'radar',
      title: 'Repost-Radar Telemetry Filter',
      label: 'High-Performance Systems',
      desc: 'A C++20 real-time deduplication engine optimized for cleaning continuous telemetry streams. Minimizes database storage footprints by discarding redundant frames before long-term storage or model training.',
      bullets: [
        'Leveraged AVX2 SIMD hardware vectorization to parallelize signature generation.',
        'Applied Locality-Sensitive Hashing (LSH) and MinHash functions for O(1) duplicates scanning.',
        'Sustained over 240,000 requests per second under peak sensor stream ingestion.'
      ],
      tags: ['C++20', 'AVX2 SIMD', 'LSH MinHash', 'Telemetry Filtration'],
      links: [
        { label: 'View Source Code', href: 'https://github.com/harsharajkumar-273/Repost-Radar', primary: true }
      ],
      simulator: <RadarSim />,
      categories: ['systems']
    }
  ];

  const filteredProjects = projects.filter(
    (p) => activeTab === 'all' || p.categories.includes(activeTab)
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingBottom: '6rem' }}>
        <Hero />
        
        <Experience />
        
        <Education />
        
        {/* Interactive Simulators Section */}
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
            Featured Projects & Simulators
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto'
          }}>
            Explore codebases and launch real-time interactive widgets demonstrating my core engineering implementations.
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

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}>
            {filteredProjects.map((p, idx) => {
              const isExpanded = expandedProjects[p.id];
              return (
                <React.Fragment key={p.id}>
                  <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>
                          {p.label}
                        </div>
                        <h3 className="font-space" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff' }}>
                          {p.title}
                        </h3>
                      </div>
                      <button 
                        onClick={() => toggleProjectSim(p.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.42rem 1rem', fontSize: '0.75rem', display: 'inline-flex' }}
                      >
                        {isExpanded ? 'Hide Simulator ✕' : 'Launch Simulator ⚡'}
                      </button>
                    </div>
                    
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                      {p.desc}
                    </p>
                    
                    <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {p.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                        {p.tags.map((tag) => (
                          <span key={tag} className="tag tag-blue" style={{ fontSize: '0.62rem', padding: '0.28rem 0.65rem' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        {p.links.map((link, lIdx) => (
                          <a 
                            key={lIdx}
                            href={link.href}
                            target="_blank" 
                            rel="noreferrer" 
                            className={link.primary ? 'btn btn-primary' : 'btn'}
                            style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    {/* Collapsible Simulator Widget */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '2rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--border)',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        {p.simulator}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>
        
        <Publications />
        
        <Skills />
      </main>

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
