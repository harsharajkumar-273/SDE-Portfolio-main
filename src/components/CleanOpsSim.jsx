import React, { useState, useEffect } from 'react';
import { Terminal, Settings, Play, CheckCircle, Award, RefreshCw } from 'lucide-react';

export default function CleanOpsSim() {
  const [model, setModel] = useState('GPT-4.1-mini');
  const [dataset, setDataset] = useState('CRM');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [stepData, setStepData] = useState([]);
  
  const resetSim = () => {
    setLogs(['[Benchmark] CleanOps environment initialized. Select agent parameters and click Run.']);
    setAccuracy(0);
    setStepData([]);
    setIsRunning(false);
  };

  useEffect(() => {
    resetSim();
  }, []);

  const addLog = (msg, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [`${msg}`, ...prev]);
        resolve();
      }, delay);
    });
  };

  const runBenchmark = async () => {
    setIsRunning(true);
    setStepData([]);
    setAccuracy(0);
    setLogs([]);

    await addLog(`[1/5] Bootstrapping OpenEnv container on dataset: ${dataset}...`, 100);
    await addLog(`[2/5] Initializing agent: ${model} with reward shaping wrapper...`, 600);
    
    // Simulate step 1
    setStepData([0.2]);
    await addLog(`[3/5] Step 1: Agent generated intent structure. Checking syntax...`, 800);
    await addLog(`[3/5] -> dense feedback: valid JSON syntax. Reward: +0.25 (partial-credit).`, 300);
    setAccuracy(25);
    
    // Simulate step 2
    setStepData((prev) => [...prev, 0.65]);
    await addLog(`[4/5] Step 2: Querying database client schemas...`, 800);
    await addLog(`[4/5] -> dense feedback: SQL query matched primary key layout. Reward: +0.65 (partial-credit).`, 300);
    setAccuracy(65);

    // Simulate step 3
    setStepData((prev) => [...prev, 0.99]);
    await addLog(`[5/5] Step 3: Performing transactional update and cross-checking oracle state...`, 900);
    await addLog(`[5/5] -> dense feedback: Oracle check passed. Reward: +0.99 (Full Credit).`, 300);
    setAccuracy(99);
    
    await addLog(`[Success] Evaluation complete. Completed task with final score of 0.99.`, 400);
    setIsRunning(false);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Terminal size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>CleanOps OpenEnv Agent Benchmark</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>Reinforcement & Reward-Shaping Evaluator</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Controls and Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AGENT MODEL</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className={`btn ${model === 'GPT-4.1-mini' ? 'btn-primary' : ''}`} onClick={() => setModel('GPT-4.1-mini')} disabled={isRunning} style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem' }}>
                GPT-4.1-mini
              </button>
              <button className={`btn ${model === 'Qwen-72B' ? 'btn-primary' : ''}`} onClick={() => setModel('Qwen-72B')} disabled={isRunning} style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem' }}>
                Qwen 72B
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BUSINESS DATASET</label>
            <select 
              value={dataset} 
              onChange={(e) => setDataset(e.target.value)} 
              disabled={isRunning}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-outfit)',
                outline: 'none'
              }}
            >
              <option value="CRM">CRM Customers Split</option>
              <option value="Billing">Billing Ledgers</option>
              <option value="Orders">Inventory Orders</option>
            </select>
          </div>

          {/* SVG Convergence Graph */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.8rem',
            height: '110px',
            position: 'relative'
          }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', position: 'absolute', top: '5px', left: '8px', fontWeight: 600 }}>DENSE REWARD CONVERGENCE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', position: 'absolute', top: '5px', right: '8px', fontFamily: 'monospace', fontWeight: 'bold' }}>
              Score: {accuracy}%
            </span>
            
            <svg width="100%" height="100%" viewBox="0 0 200 80" style={{ marginTop: '10px' }}>
              {/* Grid Lines */}
              <line x1="10" y1="10" x2="190" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="10" y1="40" x2="190" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="10" y1="70" x2="190" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Animated Path */}
              {stepData.length > 0 && (
                <path
                  d={`M 10 70 
                      ${stepData[0] ? `L 70 ${70 - stepData[0] * 60}` : ''} 
                      ${stepData[1] ? `L 130 ${70 - stepData[1] * 60}` : ''} 
                      ${stepData[2] ? `L 190 ${70 - stepData[2] * 60}` : ''}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ transition: 'd 0.5s ease-out' }}
                />
              )}

              {/* Data points */}
              {stepData.map((val, i) => (
                <circle 
                  key={i} 
                  cx={10 + (i + 1) * 60} 
                  cy={70 - val * 60} 
                  r="3.5" 
                  fill="var(--secondary)" 
                  stroke="#fff" 
                  strokeWidth="1" 
                />
              ))}
            </svg>
          </div>

        </div>

        {/* Logs Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button className="btn btn-primary" onClick={runBenchmark} disabled={isRunning} style={{ fontSize: '0.85rem' }}>
            {isRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />} Run Benchmark Evaluation
          </button>

          <div style={{
            height: '215px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '0.8rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: 'var(--secondary)',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '0.4rem'
          }}>
            {logs.map((log, i) => {
              const isSuccess = log.includes('[Success]');
              const isError = log.includes('[Error]');
              const color = isSuccess ? 'var(--accent-green)' : isError ? 'var(--accent-red)' : 'var(--text-main)';
              return (
                <div key={i} style={{ color, lineBreak: 'anywhere' }}>{log}</div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
