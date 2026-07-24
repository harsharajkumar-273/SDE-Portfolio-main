import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import LSMTreeSim from './components/LSMTreeSim';
import ProofdeskSim from './components/ProofdeskSim';
import GatewaySim from './components/GatewaySim';
import RadarSim from './components/RadarSim';
import PulseStreamSim from './components/PulseStreamSim';
import FernOSSim from './components/FernOSSim';
import NetflixRLSim from './components/NetflixRLSim';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const projects = [
    {
      id: 'lsmtree',
      title: 'LSM-Tree Key-Value Engine',
      label: 'High-Performance C++20 Systems',
      desc: 'An advanced C++20 storage engine implementing a Log-Structured Merge-Tree featuring zero-copy direct I/O logging via Linux io_uring and CPU cache-aligned vectorized Block Bloom filters.',
      bullets: [
        'Integrated Linux io_uring with O_DIRECT for non-blocking direct WAL logging, completely bypassing kernel page cache.',
        'Engineered concurrent lock-free SkipList MemTable backed by atomic CAS pointers and thread-safe memory Arenas.',
        'Implemented 64-byte cache-aligned block Bloom filters restricting negative search latency to at most 1 CPU cache line miss.'
      ],
      tags: ['C++20', 'io_uring', 'O_DIRECT', 'Bloom Filters', 'Lock-Free SkipList'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/lsm_tree', primary: true }
      ],
      simulator: <LSMTreeSim />,
      categories: ['systems', 'storage']
    },
    {
      id: 'proofdesk',
      title: 'Proofdesk Collaborative Web IDE',
      label: 'Full-Stack SDE & WASM Compiler',
      desc: 'A collaborative browser-based LaTeX/XML Web IDE and build sandbox for authoring, reviewing, and rendering interactive mathematical textbooks.',
      bullets: [
        'Ported PreTeXt/XML rendering to WebAssembly (Pyodide), reducing compilation feedback latency by 72% (from 1.1s down to 300ms).',
        'Deployed isolated terminal runtimes (node-pty) inside Docker containers with strict safety allocations (512MB RAM, 64 PIDs).',
        'Architected a distributed BullMQ/Redis worker task queue with in-memory fallback to guarantee 100% compiler availability.'
      ],
      tags: ['React', 'TypeScript', 'WebAssembly', 'Docker', 'Redis/BullMQ', 'WebSockets'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/proofdesk', primary: true }
      ],
      simulator: <ProofdeskSim />,
      categories: ['distributed', 'systems']
    },
    {
      id: 'apigateway',
      title: 'Production API Gateway & Circuit Breaker',
      label: 'SRE & Distributed Systems',
      desc: 'A robust Node.js edge proxy managing downstream microservices with distributed token-bucket rate limiting via Redis Sorted Sets and custom SRE Circuit Breakers.',
      bullets: [
        'Sustains over 25,000 requests/sec at P99 latency < 15ms with atomic sliding-window rate limiting in Redis zsets (< 1.5ms checks).',
        'Custom SRE Circuit Breaker state machine (CLOSED, OPEN, HALF-OPEN) preventing cascading microservice failures.',
        'Adaptive EWMA PID controller throttling auto-recovering throughput during thundering-herd traffic spikes.'
      ],
      tags: ['Node.js', 'Redis zsets', 'SRE Circuit Breaker', 'Docker', 'AWS ECS'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/API-gateway', primary: true }
      ],
      simulator: <GatewaySim />,
      categories: ['distributed', 'systems']
    },
    {
      id: 'radar',
      title: 'Repost-Radar Stream Deduplicator',
      label: 'C++20 & AVX2 SIMD Systems',
      desc: 'A hyper-optimized text deduplication engine in C++20 utilizing AVX2 SIMD vectorization primitives and zero-copy string shingling, productized as a Reddit Devvit moderation app.',
      bullets: [
        'Parallelized 128 universal hash variants across CPU registers using AVX2 SIMD intrinsics (4.2x speedup in MinHash generation).',
        'Zero-copy token shingling using std::string_view, reducing memory allocation footprints by 65%.',
        'Built a concurrent slab-allocated LSH hash index with reader-writer locks (std::shared_mutex) for high concurrency.'
      ],
      tags: ['C++20', 'AVX2 SIMD', 'MinHash / LSH', 'Devvit App'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/Repost-Radar', primary: true }
      ],
      simulator: <RadarSim />,
      categories: ['systems', 'storage']
    },
    {
      id: 'pulsestream',
      title: 'PulseStream Telemetry Ingestion',
      label: 'Distributed Data Systems',
      desc: 'A containerized event-driven metrics ingestion pipeline built on Node.js/TypeScript, Redpanda (Kafka), Redis, and PostgreSQL, benchmarked for high-concurrency streams.',
      bullets: [
        'Decoupled ingestion gate returning HTTP 202 Accepted in < 8ms, routing events via device ID partition keys.',
        'Dual-layer idempotency: atomic edge Redis SETNX locks combined with PostgreSQL ON CONFLICT constraints.',
        'High-performance batch database consumer executing chunked transactions for 1,000+ metrics per batch.'
      ],
      tags: ['TypeScript', 'Redpanda/Kafka', 'Redis Cache', 'PostgreSQL', 'Prometheus'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/PulseStream', primary: true }
      ],
      simulator: <PulseStreamSim />,
      categories: ['distributed']
    },
    {
      id: 'fernos',
      title: 'ARIA Distributed Crisis Pathfinder',
      label: 'Spatial Systems & Routing',
      desc: 'A disaster response platform modeling urban infrastructure as a spatial PostGIS graph, computing safe evacuation paths via dynamic Dijkstra pathfinding with hazard time-decay.',
      bullets: [
        'Integrated custom Dijkstra pathfinder penalizing roads based on active hazard decay rates exp(-1.5t).',
        'Processed real-time responder updates via Socket.io streams and two-way Twilio SMS state machines.',
        'Deployed containerized services on AWS ECS with Prometheus and Grafana telemetry monitors.'
      ],
      tags: ['TypeScript', 'Node.js', 'PostGIS', 'Socket.io', 'FastAPI'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/ARIA', primary: true }
      ],
      simulator: <FernOSSim />,
      categories: ['distributed', 'systems']
    },
    {
      id: 'netflixrl',
      title: 'Contextual Bandit Asynchronous Load Balancer',
      label: 'Systems & Load Balancing',
      desc: 'An AI-driven load balancer designed to mitigate thundering-herd traffic spikes by dynamically shifting node routing weights using Linear Thompson Sampling (LinTS).',
      bullets: [
        'Decoupled architecture: FastAPI data plane routing requests in < 0.1ms plus an asynchronous background control plane worker.',
        'Integrated safety guardrails setting a cluster node\'s routing weight to 0% if CPU load exceeds 85%.',
        'Evaluated latency and throughput recovery under simulated traffic bursts.'
      ],
      tags: ['FastAPI', 'Load Balancing', 'Linear Thompson Sampling', 'Python'],
      links: [
        { label: 'Source Code', href: 'https://github.com/harsharajkumar-273/netflix-rl', primary: true }
      ],
      simulator: <NetflixRLSim />,
      categories: ['distributed', 'systems']
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
        
        <Certifications />
        
        {/* Projects Section */}
        <section id="projects" className="container" style={{ marginTop: '4rem' }}>
          <h2 className="font-space" style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em'
          }}>
            Systems & SDE Flagship Projects
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            High-performance storage engines, distributed backend proxies, zero-copy SIMD deduplicators, and WebAssembly compiler sandboxes.
          </p>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'all', label: 'All Systems Projects' },
              { id: 'systems', label: 'Systems & C++' },
              { id: 'distributed', label: 'Distributed & Cloud' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="font-space"
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                    background: isActive ? 'rgba(31, 182, 166, 0.08)' : 'transparent',
                    color: isActive ? 'var(--secondary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    transition: 'all 0.25s ease-in-out'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Grid Layout */}
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
                        padding: '0.25rem 0.75rem', 
                        fontSize: '0.65rem', 
                        borderColor: 'rgba(31, 182, 166, 0.25)',
                        color: 'var(--secondary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Simulate ⚡
                    </button>
                  </div>
                  
                  <h3 className="font-space" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                    {p.title}
                  </h3>
                  
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
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
                          padding: '0.4rem 0.9rem',
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
          background: 'rgba(11, 16, 38, 0.65)',
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
            background: 'var(--bg-dark)',
            border: '1px solid var(--border)'
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
              <h3 className="font-space" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {selectedProjForModal.title}
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              {selectedProjForModal.desc}
            </p>

            <ul style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              listStyleType: 'none',
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginBottom: '2rem'
            }}>
              {selectedProjForModal.bullets.map((b, bIdx) => (
                <li key={bIdx} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.55rem',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'inline-block'
                  }} />
                  {b}
                </li>
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
        background: 'var(--bg-darker)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-space)'
      }}>
        © {new Date().getFullYear()} Harsha Raj Kumar · Nashville, TN · Built with React & Vite.
      </footer>
    </div>
  );
}
