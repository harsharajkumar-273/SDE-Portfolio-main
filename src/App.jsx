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
  const [activeSection, setActiveSection] = useState('about');
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    {
      id: 'recl',
      categories: ['ai'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <ReCLMetrics />
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Flagship Research Publication</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              ReCL: Reconstructive Contrastive Learning
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A physics-informed self-supervised representation learning framework submitted to <strong>NeurIPS 2026</strong>. It resolves the invariance-reconstruction mismatch by enforcing phase-sensitive Normalized Cross-Correlation (NCC) reconstruction directly inside the InfoNCE contrastive bottleneck.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Formulated <strong>N-way Depth-Aware InfoNCE</strong> to suppress depth-attenuation shortcuts.</li>
              <li>Outperformed supervised training from scratch by <strong>0.17 NCC</strong> at a highly constrained 10% labels budget on the PICMUS in-vivo benchmark.</li>
              <li>Published open-source pre-trained model weights and HDF5 dataset archives directly to Hugging Face.</li>
            </ul>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href="https://huggingface.co/harsharajkumar273/ReCL-Ultrasound-Checkpoints" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                HF Models
              </a>
              <a href="https://github.com/harsharajkumar-273/ReCL" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                View Codebase
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'visiondrive',
      categories: ['ai'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Flagship AI Project</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              VisionDrive-RL Autonomous Control
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A multi-camera perception and continuous control pipeline. It logs high-frequency trajectory data (3 perspective views + action parameters) during manual teleoperation and feeds it into behavioral cloning and BEV-projector networks.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Trained supervised <strong>BEV spatial projectors</strong> to map perspective images to orthographic coordinates.</li>
              <li>Deployed <strong>Behavioral Cloning policy</strong> directly imitating human demonstrator control actions.</li>
              <li>Evaluated control agent robustness under sensor noise (fog, rain, night modes, lens mud).</li>
            </ul>
            <a href="https://github.com/harsharajkumar-273/Vision-Drive-RL" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
              View Source Code
            </a>
          </div>
          <VisionDriveSim />
        </div>
      )
    },
    {
      id: 'segmentation',
      categories: ['ai'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <NerveSegmentationSim />
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Computer Vision & MedTech</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              Ultrasound Nerve Segmenter
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A deep learning computer vision pipeline designed to segment the Brachial Plexus nerve bundle in ultrasound scans. Built around a U-Net architecture and equipped with a live interactive web application.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Trained fully convolutional <strong>U-Net</strong> semantic segmenter on medical scan datasets.</li>
              <li>Deployed an interactive <strong>Streamlit web application</strong> loading weights from local H5 checkpoints.</li>
              <li>Integrated side-by-side visualization overlays of binarized confidence masks on raw scans.</li>
            </ul>
            <a href="https://github.com/harsharajkumar-273/Ultrasound-Nerve-Segmentation" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
              View Source Code
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'fernos',
      categories: ['systems'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <FernOSSim />
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Distributed Systems</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              ARIA Disaster Pathfinder
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A resilient crisis command platform. It models urban infrastructure as a spatial PostGIS graph and computes safest routes to affected sectors by dynamically penalizing hazard edges based on their decay rates.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Integrated <strong>custom Dijkstra weights</strong> scaled by exponential decay offsets exp(-1.5t).</li>
              <li>Implemented real-time Socket.io responder updates triggered by background telemetry listeners.</li>
              <li>Maintained system uptime via asynchronous ML workers decoupling graph search from telemetry ingestion.</li>
            </ul>
            <a href="https://github.com/harsharajkumar-273/ARIA" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
              View Source Code
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'cleanops',
      categories: ['ai', 'systems'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Agentic AI & Evaluation</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              CleanOps OpenEnv Benchmark
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              An evaluation benchmark environment designed to score LLM agent planners on multi-step operational datasets. Features dynamic containers ensuring safe execution of sandboxed agent scripts, live-hosted as a Hugging Face Space.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Built 3 sandboxed task environments supporting CRM, billing, and inventory tasks.</li>
              <li>Formulated custom <strong>reward shaping mechanics</strong> to provide dense step-level partial credits.</li>
              <li>Created validation loops checking schema correctness against oracle states.</li>
            </ul>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href="https://huggingface.co/spaces/harsharajkumar273/cleanops-openenv" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                Launch Space
              </a>
              <a href="https://github.com/harsharajkumar-273/cleanops" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                View Source Code
              </a>
            </div>
          </div>
          <CleanOpsSim />
        </div>
      )
    },
    {
      id: 'radar',
      categories: ['systems'],
      element: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <RadarSim />
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>High-Performance Systems</div>
            <h3 className="font-space" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
              Repost-Radar Telemetry Filter
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A C++20 real-time deduplication engine optimized for cleaning continuous telemetry streams. Minimizes database storage footprints by discarding redundant frames before long-term storage or model training.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
              <li>Leveraged <strong>AVX2 SIMD hardware vectorization</strong> to parallelize signature generation.</li>
              <li>Applied <strong>Locality-Sensitive Hashing (LSH)</strong> and MinHash functions for O(1) duplicates scanning.</li>
              <li>Sustained over 240,000 requests per second under peak sensor stream ingestion.</li>
            </ul>
            <a href="https://github.com/harsharajkumar-273/Repost-Radar" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
              View Source Code
            </a>
          </div>
        </div>
      )
    }
  ];

  const filteredProjects = projects.filter(
    (p) => activeTab === 'all' || p.categories.includes(activeTab)
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main style={{ flexGrow: 1, paddingBottom: '4rem' }}>
        
        {activeSection === 'about' && (
          <Hero onNextSection={() => setActiveSection('experience')} />
        )}
        
        {activeSection === 'experience' && (
          <Experience />
        )}
        
        {activeSection === 'education' && (
          <Education />
        )}
        
        {activeSection === 'projects' && (
          <section id="projects" className="container" style={{ marginTop: '2rem' }}>
            <h2 className="font-space" style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1rem',
              textAlign: 'center',
              background: 'linear-gradient(to right, #ffffff, var(--text-muted))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Interactive Systems Simulations
            </h2>
            <p style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem auto'
            }}>
              Below are live interactive widgets demonstrating my core engineering implementations. Play with controls to trigger simulated scenarios.
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
              {filteredProjects.map((p, idx) => (
                <React.Fragment key={p.id}>
                  {p.element}
                  {idx < filteredProjects.length - 1 && (
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}
        
        {activeSection === 'publications' && (
          <Publications />
        )}
        
        {activeSection === 'skills' && (
          <Skills />
        )}
      </main>

      <footer style={{
        background: 'rgba(5, 5, 8, 0.95)',
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        zIndex: 10
      }}>
        © {new Date().getFullYear()} Harsha Raj Kumar. Nashville, TN. Built with React & Vite.
      </footer>
    </div>
  );
}
