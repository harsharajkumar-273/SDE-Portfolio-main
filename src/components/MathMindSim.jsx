import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, BrainCircuit, RefreshCw } from 'lucide-react';

export default function MathMindSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [trainStats, setTrainStats] = useState({ loss: 1.45, reward: 0.12, klDiv: 0.08 });
  const [logs, setLogs] = useState([]);

  const reasoningSteps = [
    { text: 'Prompt: Let n^2 + 19n + 92 = k^2 for some integer k.', score: 0.98 },
    { text: 'Step 1: Multiply by 4 to complete the square: 4n^2 + 76n + 368 = 4k^2.', score: 0.95 },
    { text: 'Step 2: Rewrite as: (2n + 19)^2 - 361 + 368 = 4k^2 => (2n + 19)^2 + 7 = (2k)^2.', score: 0.99 },
    { text: 'Step 3: Rearrange terms: (2k)^2 - (2n + 19)^2 = 7.', score: 0.96 },
    { text: 'Step 4: Factor the difference of squares: (2k - 2n - 19)(2k + 2n + 19) = 7.', score: 0.97 },
    { text: 'Step 5: Since 7 is prime, factors must be {1, 7} or {-1, -7}. Solve for n => n = -6 or n = -13.', score: 0.98 }
  ];

  const resetSim = () => {
    setLogs(['[GRPO Engine] Policy model initialized. Ready. Click Train Pipeline to run reinforcement loop.']);
    setStepIdx(0);
    setTrainStats({ loss: 1.45, reward: 0.12, klDiv: 0.08 });
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
      // Step reasoning sequence
      setStepIdx(idx => {
        const next = idx + 1;
        if (next >= reasoningSteps.length) {
          // Training batch loop complete -> update statistics
          setTrainStats(prev => {
            const nextLoss = Math.max(0.12, Number((prev.loss - 0.12).toFixed(2)));
            const nextReward = Math.min(0.95, Number((prev.reward + 0.08).toFixed(2)));
            const nextKL = Math.max(0.01, Number((prev.klDiv - 0.005).toFixed(3)));
            addLog(`📈 BATCH COMPLETE: GRPO Policy update. Reward: ${nextReward}, Loss: ${nextLoss}.`);
            return { loss: nextLoss, reward: nextReward, klDiv: nextKL };
          });
          return 0;
        } else {
          const step = reasoningSteps[next];
          addLog(`🧠 PRM Verifier score: ${step.score} for: "${step.text.slice(0, 30)}..."`);
          return next;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <BrainCircuit size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>MathMind Training Pipeline</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>GRPO Policy & PRM Verifier Loop</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: RL Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr 1fr',
            gap: '0.6rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>GRPO LOSS</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--accent-red)' }}>
                {trainStats.loss}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>AVG REWARD</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--secondary)' }}>
                {trainStats.reward}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>KL DIV</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                {trainStats.klDiv}
              </span>
            </div>
          </div>

          {/* Reasoning Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ACTIVE REASONING STEP</span>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {reasoningSteps[stepIdx].text}
            </div>
          </div>

        </div>

        {/* Right Side: Control & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause Loop' : 'Train GRPO Policy'}
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
