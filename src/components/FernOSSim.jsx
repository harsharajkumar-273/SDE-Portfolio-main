import React, { useState, useEffect } from 'react';
import { Shield, Play, RotateCcw, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function FernOSSim() {
  const [grid, setGrid] = useState([]);
  const [hazards, setHazards] = useState({});
  const [path, setPath] = useState([]);
  const [logs, setLogs] = useState([]);
  const [simTime, setSimTime] = useState(0);
  const [isCrewsActive, setIsCrewsActive] = useState(false);

  // Grid constants
  const size = 10;
  const startNode = [0, 0];
  const endNode = [9, 9];

  // Initialize empty grid
  useEffect(() => {
    resetSim();
  }, []);

  const resetSim = () => {
    setHazards({});
    setPath([]);
    setLogs(['[System] ARIA initialized. Waiting for storm simulation trigger...']);
    setSimTime(0);
    setIsCrewsActive(false);
  };

  const addLog = (msg) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 14)]);
  };

  const simulateStorm = () => {
    // Generate random hazards
    const newHazards = {};
    const hazardTypes = ['Downed Wires', 'Road Debris', 'Ice Accumulation'];
    
    // Hardcode some nodes or generate random ones that block direct path
    const candidateNodes = [
      [2, 2], [2, 3], [3, 2],
      [5, 5], [5, 4], [4, 5],
      [7, 8], [8, 7], [7, 7]
    ];
    
    candidateNodes.forEach((node) => {
      if (Math.random() > 0.3) {
        const type = hazardTypes[Math.floor(Math.random() * hazardTypes.length)];
        const penalty = type === 'Downed Wires' ? 12.0 : type === 'Ice Accumulation' ? 8.0 : 5.0;
        newHazards[`${node[0]},${node[1]}`] = { type, penalty, initPenalty: penalty };
      }
    });

    setHazards(newHazards);
    addLog(`Storm impact simulation: Spawned ${Object.keys(newHazards).length} active hazards.`);
    computeDijkstra(newHazards);
  };

  const dispatchCrews = () => {
    setIsCrewsActive(true);
    addLog('Emergency response dispatches: Dispatching debris & utility crews.');
    
    // Simulate decay over time
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      setSimTime(counter);
      
      setHazards((prev) => {
        const updated = {};
        let activeCount = 0;
        
        Object.keys(prev).forEach((key) => {
          const hazard = prev[key];
          // Decay penalty exponentially: penalty * e^(-1.5t)
          const currentPenalty = hazard.initPenalty * Math.exp(-0.7 * counter);
          if (currentPenalty > 0.5) {
            updated[key] = { ...hazard, penalty: currentPenalty };
            activeCount += 1;
          }
        });
        
        // Recalculate route with new weights
        computeDijkstra(updated);
        
        if (activeCount === 0 || counter >= 5) {
          clearInterval(interval);
          setIsCrewsActive(false);
          addLog('Crisis resolution: All roadways cleared and power lines restored.');
        } else {
          addLog(`Clearing operations in progress: Decay factor t=${counter}. ${activeCount} hazards remaining.`);
        }
        
        return updated;
      });
    }, 1000);
  };

  // Simplified Dijkstra implementation for grid navigation
  const computeDijkstra = (activeHazards) => {
    // Priority queue represented as list of unvisited nodes
    const dist = {};
    const prev = {};
    const unvisited = [];
    
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const key = `${r},${c}`;
        dist[key] = Infinity;
        prev[key] = null;
        unvisited.push([r, c]);
      }
    }
    
    dist[`${startNode[0]},${startNode[1]}`] = 0;
    
    while (unvisited.length > 0) {
      // Find unvisited node with minimum distance
      unvisited.sort((a, b) => dist[`${a[0]},${a[1]}`] - dist[`${b[0]},${b[1]}`]);
      const curr = unvisited.shift();
      const currKey = `${curr[0]},${curr[1]}`;
      
      if (curr[0] === endNode[0] && curr[1] === endNode[1]) break;
      if (dist[currKey] === Infinity) break;
      
      // Get neighbors
      const neighbors = [
        [curr[0] - 1, curr[1]], // Up
        [curr[0] + 1, curr[1]], // Down
        [curr[0], curr[1] - 1], // Left
        [curr[0], curr[1] + 1]  // Right
      ].filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size);
      
      neighbors.forEach(([nr, nc]) => {
        const nKey = `${nr},${nc}`;
        const hazard = activeHazards[nKey];
        // Cost = 1.0 + hazard penalty (Dijkstra weight penalty)
        const weight = 1.0 + (hazard ? hazard.penalty : 0);
        const alt = dist[currKey] + weight;
        
        if (alt < dist[nKey]) {
          dist[nKey] = alt;
          prev[nKey] = currKey;
        }
      });
    }
    
    // Reconstruct path
    const pathNodes = [];
    let uKey = `${endNode[0]},${endNode[1]}`;
    while (uKey !== null) {
      const parts = uKey.split(',');
      pathNodes.unshift([parseInt(parts[0]), parseInt(parts[1])]);
      uKey = prev[uKey];
    }
    
    setPath(pathNodes);
  };

  const isNodeInPath = (r, c) => {
    return path.some(([pr, pc]) => pr === r && pc === c);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Shield size={20} style={{ color: 'var(--secondary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>ARIA Spatial Router</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>Crisis Dispatch & Pathfinding Simulator</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Grid Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gap: '3px',
            background: 'rgba(0,0,0,0.3)',
            padding: '8px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            width: '280px',
            height: '280px'
          }}>
            {Array.from({ length: size }).map((_, r) => (
              Array.from({ length: size }).map((_, c) => {
                const isStart = r === startNode[0] && c === startNode[1];
                const isEnd = r === endNode[0] && c === endNode[1];
                const key = `${r},${c}`;
                const hazard = hazards[key];
                const inPath = isNodeInPath(r, c);
                
                let bgColor = 'rgba(255,255,255,0.02)';
                let borderStyle = '1px solid var(--border)';
                let glow = '';
                
                if (isStart) {
                  bgColor = 'var(--secondary)';
                  glow = '0 0 10px var(--secondary)';
                } else if (isEnd) {
                  bgColor = 'var(--accent-green)';
                  glow = '0 0 10px var(--accent-green)';
                } else if (hazard) {
                  // Red for hazard
                  const alpha = Math.min(1.0, hazard.penalty / 8.0);
                  bgColor = `rgba(239, 68, 68, ${0.2 + alpha * 0.7})`;
                  borderStyle = '1px solid var(--accent-red)';
                } else if (inPath) {
                  bgColor = 'rgba(139, 92, 246, 0.4)';
                  borderStyle = '1px solid var(--primary)';
                }

                return (
                  <div key={key} style={{
                    backgroundColor: bgColor,
                    border: borderStyle,
                    borderRadius: '4px',
                    boxShadow: glow,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem'
                  }}>
                    {isStart && 'E'}
                    {isEnd && 'C'}
                    {hazard && <AlertTriangle size={10} style={{ color: '#fff' }} />}
                  </div>
                );
              })
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span><span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--secondary)', marginRight: '4px', borderRadius: '2px' }}></span>Ego</span>
            <span><span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-green)', marginRight: '4px', borderRadius: '2px' }}></span>Crisis Node</span>
            <span><span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', marginRight: '4px', borderRadius: '2px' }}></span>Path</span>
            <span><span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-red)', marginRight: '4px', borderRadius: '2px' }}></span>Hazard</span>
          </div>
        </div>

        {/* Control & Logs Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '280px' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={simulateStorm} disabled={isCrewsActive} style={{ flex: 1, fontSize: '0.8rem' }}>
              <Play size={12} /> Trigger Storm
            </button>
            <button className="btn btn-secondary" onClick={dispatchCrews} disabled={isCrewsActive || Object.keys(hazards).length === 0} style={{ flex: 1, fontSize: '0.8rem' }}>
              <Activity size={12} /> Dispatch Crews
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              <RotateCcw size={12} />
            </button>
          </div>

          <div style={{
            flexGrow: 1,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.8rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: 'var(--accent-green)',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '0.4rem'
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
