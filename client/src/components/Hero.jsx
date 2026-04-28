import React, { useRef, useEffect } from 'react';
import SearchBar from './SearchBar';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  dur: Math.random() * 6 + 4,
}));

export default function Hero({ topic, setTopic, onAnalyze, trending, error }) {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 60px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.id % 3 === 0 ? '#6366f1' : p.id % 3 === 1 ? '#8b5cf6' : '#06b6d4',
            opacity: 0.4,
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* Glow orb */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 780 }}>
        {/* Badge */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <span className="badge badge-info" style={{ fontSize: 12, padding: '6px 16px' }}>
            🤖 Powered by Gemini AI + NewsAPI
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 'clamp(42px,7vw,80px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: 24,
        }}>
          See the Story{' '}
          <span className="gradient-text">Behind the Story</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px,2vw,20px)',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          Aggregate global news coverage, detect bias signals, and let Gemini AI
          surface what's <em>actually</em> happening — across every narrative.
        </p>

        {/* Search */}
        <SearchBar topic={topic} setTopic={setTopic} onAnalyze={onAnalyze} />
        {error && (
          <p style={{ marginTop: 16, color: '#ef4444', fontSize: 14 }}>⚠ {error}</p>
        )}

        {/* Trending chips */}
        {trending.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Trending Topics
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {trending.slice(0, 6).map(t => (
                <button key={t} onClick={() => { setTopic(t); onAnalyze(t); }}
                  style={{
                    padding: '7px 16px', borderRadius: 100, fontSize: 13,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = '#6366f1'; e.target.style.color = '#f1f5f9'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'var(--text-secondary)'; }}
                >{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feature pills */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center'
      }}>
        {['🌍 Global Coverage','🎯 Bias Detection','🤖 AI Synthesis','📊 Narrative Map'].map(f => (
          <div key={f} className="glass" style={{ padding: '8px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>
            {f}
          </div>
        ))}
      </div>
    </section>
  );
}
