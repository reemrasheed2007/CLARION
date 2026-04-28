import React, { useState } from 'react';

export default function SearchBar({ topic, setTopic, onAnalyze, compact }) {
  const [focused, setFocused] = useState(false);

  const handleKey = (e) => {
    if (e.key === 'Enter') onAnalyze(topic);
  };

  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      maxWidth: compact ? '100%' : 620, margin: '0 auto',
      flexDirection: compact ? 'row' : 'row',
    }}>
      <div style={{
        flex: 1, position: 'relative',
        borderRadius: 14,
        boxShadow: focused ? '0 0 0 2px #6366f1, 0 0 40px rgba(99,102,241,0.2)' : '0 0 0 1px rgba(255,255,255,0.1)',
        transition: 'box-shadow 0.2s ease',
      }}>
        <span style={{
          position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
          fontSize: 18, pointerEvents: 'none', opacity: 0.5,
        }}>🔍</span>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter any news topic (e.g. Gaza ceasefire)…"
          style={{
            width: '100%',
            padding: compact ? '14px 18px 14px 50px' : '18px 18px 18px 52px',
            borderRadius: 14, border: 'none', outline: 'none',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--text-primary)',
            fontSize: compact ? 14 : 16,
            fontFamily: 'inherit',
          }}
        />
      </div>
      <button
        onClick={() => onAnalyze(topic)}
        disabled={!topic.trim()}
        style={{
          padding: compact ? '14px 22px' : '18px 28px',
          borderRadius: 14, border: 'none', cursor: 'pointer',
          background: topic.trim() ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.06)',
          color: topic.trim() ? 'white' : 'var(--text-muted)',
          fontWeight: 600, fontSize: compact ? 14 : 15,
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          boxShadow: topic.trim() ? '0 4px 20px rgba(99,102,241,0.4)' : 'none',
        }}
        onMouseEnter={e => { if (topic.trim()) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        Analyze ⚡
      </button>
    </div>
  );
}
