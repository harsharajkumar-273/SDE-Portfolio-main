import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function NetflixRLSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trafficVolume, setTrafficVolume] = useState(60); // In RPS (Range 10 - 250)
  const [explorationParam, setExplorationParam] = useState(0.3); // v^2 exploration
  const [logs, setLogs] = useState([]);
  
  // Backends state
  const [servers, setServers] = useState([
    { id: 'A', name: 'Server A (Core)', capacity: 150, baseLat: 10, cpu: 15, latency: 11, weight: 85, active: true },
    { id: 'B', name: 'Server B (Worker)', capacity: 80, baseLat: 40, cpu: 8, latency: 42, weight: 12, active: true },
    { id: 'C', name: 'Server C (Legacy)', capacity: 20, baseLat: 80, cpu: 2, latency: 81, weight: 3, active: true }
  ]);
  const [slaBreaches, setSlaBreaches] = useState(0);
  const [actionMasked, setActionMasked] = useState(false);

  const resetSim = () => {
    setLogs(['[Control Plane] Linear Thompson Sampling balancer active. Ready.']);
    setServers([
      { id: 'A', name: 'Server A (Core)', capacity: 150, baseLat: 10, cpu: 15, latency: 11, weight: 85, active: true },
      { id: 'B', name: 'Server B (Worker)', capacity: 80, baseLat: 40, cpu: 8, latency: 42, weight: 12, active: true },
      { id: 'C', name: 'Server C (Legacy)', capacity: 20, baseLat: 80, cpu: 2, latency: 81, weight: 3, active: true }
    ]);
    setSlaBreaches(0);
    setActionMasked(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    resetSim();
  }, []);

  const addLog = (msg) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 8)]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Calculate CPU loads based on trafficVolume and weights
      const nextServers = servers.map(server => {
        const allocatedRPS = (trafficVolume * server.weight) / 100;
        let cpuLoad = Math.round((allocatedRPS / server.capacity) * 100);
        if (cpuLoad > 100) cpuLoad = 100;

        // Latency scales non-linearly with CPU load (queueing theory)
        let lat = server.baseLat;
        if (cpuLoad > 60) lat += Math.round(lat * Math.pow((cpuLoad - 60) / 20, 2));
        if (lat > 350) lat = 350;

        return {
          ...server,
          cpu: Math.max(2, cpuLoad),
          latency: Math.max(server.baseLat, lat)
        };
      });

      // Check if Server A exceeds CPU threshold (85%) -> Action Masking triggers
      const serverA = nextServers.find(s => s.id === 'A');
      let isMasked = false;
      let weightA = 80;
      let weightB = 16;
      let weightC = 4;

      if (serverA.cpu >= 85) {
        isMasked = true;
        weightA = 0; // Server A weight goes to zero
        weightB = 80;
        weightC = 20;
      } else {
        // High traffic shifts weights dynamically using Thompson Sampling
        if (trafficVolume > 120) {
          const ratio = (trafficVolume - 120) / 130; // 0 to 1
          weightA = Math.max(20, Math.round(80 - ratio * 45));
          weightB = Math.round(16 + ratio * 30);
          weightC = Math.round(4 + ratio * 15);
        }
      }

      // Re-distribute weights
      const totalWeight = weightA + weightB + weightC;
      nextServers[0].weight = Math.round((weightA / totalWeight) * 100);
      nextServers[1].weight = Math.round((weightB / totalWeight) * 100);
      nextServers[2].weight = Math.round((weightC / totalWeight) * 100);

      // Check for SLA breaches (> 200ms)
      let breachesThisTick = 0;
      nextServers.forEach(s => {
        if (s.latency > 200 && s.weight > 0) {
          breachesThisTick += Math.round((trafficVolume * s.weight) / 100);
        }
      });

      if (breachesThisTick > 0) {
        setSlaBreaches(prev => prev + breachesThisTick);
      }

      setActionMasked(isMasked);
      setServers(nextServers);

      // Ingest logs based on status
      if (isMasked) {
        addLog(`🚨 GUARDRAIL: Server A CPU at ${serverA.cpu}%! Masking applied: weight set to 0%.`);
      } else if (trafficVolume > 150) {
        addLog(`📈 Spike detected (${trafficVolume} RPS). Thompson Sampling shifting weights to Server B.`);
      } else {
        addLog(`✅ Stable state. LinTS converged. Avg. SLA latency: ${Math.round(nextServers[0].latency * 0.8 + nextServers[1].latency * 0.2)}ms.`);
      }

    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, trafficVolume, servers]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Activity size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Asynchronous RL Load Balancer</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>Linear Thompson Sampling Simulator</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Server Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>INCOMING TRAFFIC (RPS)</span>
              <span style={{ fontWeight: 'bold', color: trafficVolume > 160 ? 'var(--accent-red)' : '#fff' }}>
                {trafficVolume} Requests/sec
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="250" 
              value={trafficVolume} 
              onChange={(e) => setTrafficVolume(Number(e.target.value))}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Servers Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.2rem' }}>
            {servers.map((s) => {
              const isOverloaded = s.cpu >= 85;
              const hasBreachedSLA = s.latency > 200;
              return (
                <div key={s.id} style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  border: isOverloaded ? '1px solid var(--accent-red)' : '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{s.name}</span>
                    <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      <span>CPU: <strong style={{ color: s.cpu > 80 ? 'var(--accent-red)' : '#fff' }}>{s.cpu}%</strong></span>
                      <span>Latency: <strong style={{ color: hasBreachedSLA ? 'var(--accent-red)' : '#fff' }}>{s.latency}ms</strong></span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--secondary)' }}>{s.weight}%</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>WEIGHT</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Control & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.6rem 0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL SLA BREACHES (&gt;200ms)</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: slaBreaches > 0 ? 'var(--accent-red)' : 'var(--secondary)', fontFamily: 'monospace' }}>
                {slaBreaches} reqs
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
              {actionMasked ? (
                <span style={{ color: 'var(--accent-red)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertTriangle size={14} /> Action Masking Active
                </span>
              ) : (
                <span style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <ShieldCheck size={14} /> Guardrails Healthy
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause Balancer' : 'Simulate Spike Influx'}
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              Reset
            </button>
          </div>

          {/* Logs Terminal */}
          <div style={{
            height: '115px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.6rem 0.8rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem'
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
