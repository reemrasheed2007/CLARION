import React from 'react';

const SEVERITY_CONFIG = {
  low:    { color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  label: 'Low',    pct: 25 },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)',  label: 'Medium', pct: 60 },
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',   label: 'High',   pct: 90 },
};

export default function BiasSignalCard({ bias }) {
  const cfg = SEVERITY_CONFIG[bias.severity] || SEVERITY_CONFIG.medium;
  return (
    <div className="glass" style={{
      padding: '20px 22px',
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{bias.outlet}</span>
        <span className={`badge badge-${bias.severity}`}>{cfg.label} Bias</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
        {bias.signal}
      </p>
      {bias.example && (
        <blockquote style={{
          fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic',
          borderLeft: `2px solid ${cfg.color}`, paddingLeft: 10, marginBottom: 14
        }}>
          "{bias.example}"
        </blockquote>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${cfg.pct}%`, background: cfg.color }} />
      </div>
    </div>
  );
}
