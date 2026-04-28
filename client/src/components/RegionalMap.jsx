import React from 'react';

const TONE_COLORS = {
  positive: '#10b981',
  neutral: '#6366f1',
  negative: '#ef4444',
  alarmist: '#f59e0b',
  dismissive: '#94a3b8',
};

const REGION_ICONS = {
  'Western Media': '🇺🇸',
  'Eastern Media': '🌏',
  'Middle East': '🕌',
  'European': '🇪🇺',
  'Russian': '🇷🇺',
  'Chinese': '🇨🇳',
  'African': '🌍',
  'Latin American': '🌎',
};

export default function RegionalMap({ narratives }) {
  if (!narratives?.length) {
    return <p style={{ color: 'var(--text-muted)' }}>No regional data available.</p>;
  }
  return (
    <div>
      <div className="section-label">🌍 Regional Narratives</div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
        How different regions frame the same story
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
        {narratives.map((n, i) => {
          const tone = n.tone || 'neutral';
          const color = TONE_COLORS[tone] || '#6366f1';
          const icon = Object.entries(REGION_ICONS).find(([k]) => n.region?.includes(k.split(' ')[0]))?.[1] || '📰';
          return (
            <div key={i} className="glass" style={{ padding: '22px 24px', borderLeft: `3px solid ${color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{n.region}</div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.06em', color
                  }}>{tone}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>
                {n.framing}
              </p>
              {n.outlets?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {n.outlets.map(o => <span key={o} className="chip" style={{ fontSize: 11 }}>{o}</span>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
