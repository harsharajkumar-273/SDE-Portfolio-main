import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import FernOSSim from './components/FernOSSim';
import CleanOpsSim from './components/CleanOpsSim';
import VisionDriveSim from './components/VisionDriveSim';
import RadarSim from './components/RadarSim';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingBottom: '6rem' }}>
        <Hero />
        
        <Experience />
        
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
            Interactive Systems Simulations
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Below are live interactive widgets demonstrating my core engineering implementations. Play with controls to trigger simulated scenarios.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}>
            
            {/* VisionDrive-RL Row */}
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
                <a href="https://github.com/harsharajkumar-273/vision-drive-rl" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                  View Source Code
                </a>
              </div>
              <VisionDriveSim />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

            {/* FernOS Row */}
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

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

            {/* CleanOps Row */}
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
                  <a href="https://github.com/harsharajkumar-273/cleanops-openenv" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', fontSize: '0.8rem' }}>
                    View Source Code
                  </a>
                </div>
              </div>
              <CleanOpsSim />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />

            {/* Repost-Radar Row */}
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

          </div>
        </section>
        
        <Skills />
      </main>

      <footer style={{
        background: 'rgba(7, 8, 11, 0.9)',
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        © {new Date().getFullYear()} Harsha Raj Kumar. Built with React, Vite, and Lucide Icons.
      </footer>
    </div>
  );
}
