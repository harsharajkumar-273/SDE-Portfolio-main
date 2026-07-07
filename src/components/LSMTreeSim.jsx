import React, { useState, useEffect } from 'react';
import { Play, Pause, Database, ShieldCheck } from 'lucide-react';

export default function LSMTreeSim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [memTableSize, setMemTableSize] = useState(0);
  const [sstablesCount, setSstablesCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const resetSim = () => {
    setLogs(['[LSM-Engine] WAL is active. Database engine ready. Click Write Stream to test.']);
    setMemTableSize(0);
    setSstablesCount(0);
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
      const isWrite = Math.random() > 0.3; // 70% chance of writes

      if (isWrite) {
        // Mock a write
        const key = `user_${Math.floor(Math.random() * 1000)}`;
        const sizeIncrement = Math.floor(Math.random() * 12) + 8; // MemTable percentage size
        
        setMemTableSize(prev => {
          const next = prev + sizeIncrement;
          if (next >= 100) {
            // Trigger Flush to SSTable
            setSstablesCount(s => {
              const nextSST = s + 1;
              if (nextSST >= 4) {
                // Compaction triggers at 4 SSTables
                addLog(`⚡ COMBACTION: Merging 4 SSTables -> Compacting & removing tombstones in size-tiered merge.`);
                return 1;
              } else {
                addLog(`💾 FLUSH: MemTable full. Writing ${key} -> SSTable_${nextSST}.bin. WAL cleared.`);
                return nextSST;
              }
            });
            return 0;
          } else {
            addLog(`📝 WAL Write: io_uring direct I/O WAL appended in 0.07ms. SkipList CAS inserted key "${key}".`);
            return next;
          }
        });
      } else {
        // Mock a read
        const key = `user_${Math.floor(Math.random() * 1200)}`;
        const filterHit = Math.random() > 0.7; // 30% chance key exists
        
        if (filterHit) {
          addLog(`🔍 GET Hit: Key "${key}" found. Vector Bloom Filter verified index in 12ns.`);
        } else {
          addLog(`🚫 GET Miss: Key "${key}" blocked. Bloom Filter bits mismatch. Disk lookup bypassed.`);
        }
      }
    }, 850);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border)' }}>
      <div className="widget-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Database size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>LSM-Tree Key-Value Engine</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem', fontWeight: 600 }}>C++ io_uring WAL & SkipList simulator</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Memory Structures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* MemTable Capacity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>MEMTABLE CAPACITY</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{memTableSize}% Full</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(15,23,42,0.06)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ width: `${memTableSize}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s ease' }} />
            </div>
          </div>

          {/* Active Tables Count */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.6rem',
            background: 'rgba(15,23,42,0.04)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ACTIVE SSTABLES</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                {sstablesCount} / 4
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>I/O ENGINE</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                <ShieldCheck size={14} /> io_uring
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Control & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.85rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Stop Engine' : 'Write Ingest Stream'}
            </button>
            <button className="btn" onClick={resetSim} style={{ padding: '0.6rem' }}>
              Reset
            </button>
          </div>

          {/* Logs Terminal */}
          <div style={{
            background: '#09090b',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: '#121214',
              padding: '0.4rem 0.6rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>lsm_engine.log</span>
              <span style={{ 
                fontSize: '0.6rem', 
                fontFamily: 'var(--font-mono)', 
                color: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                  display: 'inline-block',
                  animation: isPlaying ? 'pulse 2s infinite' : 'none'
                }} />
                {isPlaying ? 'RUNNING' : 'IDLE'}
              </span>
            </div>
            <div style={{
              height: '95px',
              padding: '0.6rem 0.8rem',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#94a3b8',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              background: '#09090b'
            }}>
              {logs.map((log, i) => (
                <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
