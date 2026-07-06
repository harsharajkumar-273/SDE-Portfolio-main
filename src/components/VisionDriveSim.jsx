import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, AlertOctagon, Zap, ShieldAlert, Cpu } from 'lucide-react';

export default function VisionDriveSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [agentType, setAgentType] = useState('RL_GT_BEV'); // ORACLE, RL_GT_BEV, BC_IMITATION
  const [hazard, setHazard] = useState('None'); // None, Fog, Rain, Mud, Night
  
  // Telemetry states
  const [speed, setSpeed] = useState(0);
  const [steer, setSteer] = useState(0);
  const [laneOffset, setLaneOffset] = useState(0.0);
  const [reward, setReward] = useState(0.0);

  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Animation constants
  const roadY = useRef(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let frame = 0;
    
    const draw = () => {
      frame += 1;
      
      // Clear canvas
      ctx.fillStyle = '#0a0b10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate curving offset
      const curve = Math.sin(frame * 0.02) * 45;
      
      // Draw road background
      ctx.fillStyle = '#1b1d26';
      ctx.beginPath();
      ctx.moveTo(80 + curve, 0);
      ctx.lineTo(170 + curve, 0);
      ctx.lineTo(210, canvas.height);
      ctx.lineTo(40, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Draw lane dividers
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 15]);
      ctx.lineDashOffset = -frame * 3;
      
      // Center line
      ctx.beginPath();
      ctx.moveTo(125 + curve, 0);
      ctx.lineTo(125, canvas.height);
      ctx.stroke();

      ctx.setLineDash([]);
      
      // Compute agent behaviors & deviations based on hazard
      let noise = 0;
      if (hazard === 'Fog') noise = 0.8;
      else if (hazard === 'Rain') noise = 0.5;
      else if (hazard === 'Mud') noise = 1.8;
      else if (hazard === 'Night') noise = 1.0;

      let maxOffset = 0.15;
      if (agentType === 'BC_IMITATION') {
        maxOffset = 0.4 + noise * 0.5; // BC degrades under noise
      } else if (agentType === 'RL_GT_BEV') {
        maxOffset = 0.2 + noise * 0.2; // RL is more robust
      } else if (agentType === 'ORACLE') {
        maxOffset = 0.05; // Heuristic Oracle has 0 noise impact
      }

      // Sine wave simulation for steering and offset
      const currentOffset = Math.sin(frame * 0.08) * maxOffset;
      const targetSteer = Math.cos(frame * 0.02) * 15 + currentOffset * 25;
      
      setSpeed(agentType === 'ORACLE' ? 15.0 : agentType === 'RL_GT_BEV' ? 14.2 : 11.8);
      setSteer(targetSteer);
      setLaneOffset(currentOffset);
      setReward(1.0 - Math.abs(currentOffset) * 2.0 - (hazard !== 'None' ? 0.3 : 0));
      
      // Draw ego vehicle (blue bounding box) near bottom center
      const carX = 125 + currentOffset * 60;
      const carY = canvas.height - 40;
      
      ctx.fillStyle = '#8b5cf6'; // Violet ego
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.fillRect(carX - 8, carY - 15, 16, 30);
      ctx.shadowBlur = 0; // reset shadow

      // Taillights
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(carX - 7, carY + 12, 3, 2);
      ctx.fillRect(carX + 4, carY + 12, 3, 2);

      // Render environmental noise overlay on Canvas
      if (hazard === 'Fog') {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (hazard === 'Rain') {
        // Draw small streaks representing rain
        ctx.strokeStyle = 'rgba(173, 216, 230, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const rx = (frame * 12 + i * 40) % canvas.width;
          const ry = (frame * 25 + i * 35) % canvas.height;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 3, ry + 12);
          ctx.stroke();
        }
      } else if (hazard === 'Mud') {
        ctx.fillStyle = 'rgba(110, 80, 50, 0.7)';
        ctx.beginPath();
        ctx.arc(100, 110, 22, 0, Math.PI * 2);
        ctx.arc(150, 80, 15, 0, Math.PI * 2);
        ctx.fill();
      } else if (hazard === 'Night') {
        // Darken screen except headlight cone
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        
        ctx.save();
        ctx.beginPath();
        // Headlight cone triangle
        ctx.moveTo(carX, carY - 15);
        ctx.lineTo(carX - 50, 0);
        ctx.lineTo(carX + 50, 0);
        ctx.closePath();
        ctx.clip();
        
        // Draw road and car under headlight clip
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, agentType, hazard]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="widget-header">
        <Cpu size={20} style={{ color: 'var(--secondary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>VisionDrive-RL Telemetry visualizer</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem' }}>Autonomous Vehicle Control Console</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Controls & Gauges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AGENT TYPE</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className={`btn ${agentType === 'ORACLE' ? 'btn-secondary' : ''}`} onClick={() => setAgentType('ORACLE')} style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}>
                Heuristic Oracle
              </button>
              <button className={`btn ${agentType === 'RL_GT_BEV' ? 'btn-secondary' : ''}`} onClick={() => setAgentType('RL_GT_BEV')} style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}>
                RL (PPO BEV)
              </button>
              <button className={`btn ${agentType === 'BC_IMITATION' ? 'btn-secondary' : ''}`} onClick={() => setAgentType('BC_IMITATION')} style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}>
                Imitation (BC)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ENVIRONMENTAL HAZARDS</label>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {['None', 'Fog', 'Rain', 'Mud', 'Night'].map((h) => (
                <button 
                  key={h} 
                  className={`btn ${hazard === h ? 'btn-primary' : ''}`} 
                  onClick={() => setHazard(h)}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Numbers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.8rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SPEED</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                {isPlaying ? speed.toFixed(1) : '0.0'} m/s
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STEER ANGLE</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                {isPlaying ? steer.toFixed(1) : '0.0'}°
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LANE DEV.</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace', color: laneOffset > 0.4 ? 'var(--accent-red)' : 'var(--text-main)' }}>
                {isPlaying ? laneOffset.toFixed(2) : '0.00'} m
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>STEP REWARD</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace', color: reward < 0.5 ? 'var(--accent-orange)' : 'var(--text-main)' }}>
                {isPlaying ? reward.toFixed(2) : '0.00'}
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Canvas Simulation Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={handlePlayPause} style={{ width: '100%', fontSize: '0.85rem' }}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'Pause Simulation' : 'Start Simulation'}
          </button>
          
          <div style={{
            position: 'relative',
            width: '250px',
            height: '220px',
            background: '#0a0b10',
            border: '2px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            boxShadow: '0 0 25px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <canvas ref={canvasRef} width="250" height="220" style={{ width: '100%', height: '100%' }} />
            
            {!isPlaying && (
              <span style={{ position: 'absolute', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                Click Start Simulation to run PPO planner
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
