import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Fetching articles from global sources…',
  'Reading Western media framing…',
  'Scanning Eastern perspectives…',
  'Detecting narrative differences…',
  'Running Gemini AI bias analysis…',
  'Mapping regional narratives…',
  'Synthesizing neutral summary…',
  'Almost done…',
];

export default function LoadingPulse({ topic }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40,
    }}>
      {/* Neural pulse rings */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 48 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(99,102,241,0.5)',
            animation: `pulse-ring 2.4s ease-out ${i * 0.8}s infinite`,
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: '20%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#6366f1,#06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
          boxShadow: '0 0 30px rgba(99,102,241,0.6)',
        }}>⚡</div>
      </div>

      <h2 style={{
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: 28, fontWeight: 700, marginBottom: 12, textAlign: 'center'
      }}>
        Analyzing: <span className="gradient-text">"{topic}"</span>
      </h2>

      <p style={{
        color: 'var(--text-secondary)', fontSize: 15,
        minHeight: 24, textAlign: 'center', transition: 'opacity 0.3s',
      }}>
        {MESSAGES[msgIdx]}
      </p>

      {/* Shimmer bar */}
      <div style={{ marginTop: 40, width: 340, maxWidth: '90vw' }}>
        <div className="progress-bar">
          <div style={{
            height: '100%', borderRadius: 3,
            background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 1.5s linear infinite, shimmer 1s linear infinite',
            width: '100%',
          }} />
        </div>
      </div>

      <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-muted)' }}>
        Gemini is reading {Math.floor(Math.random() * 8 + 12)} articles right now…
      </p>
    </div>
  );
}
