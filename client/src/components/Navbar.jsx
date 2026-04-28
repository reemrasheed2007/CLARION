import { useEffect, useState } from 'react';

export default function Navbar({ onNewSearch }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(14,13,12,0.92)',
      backdropFilter: 'blur(12px)',
      boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.55)' : 'none',
      transition: 'box-shadow 0.4s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{
            fontFamily: 'var(--app-font-serif)',
            fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1,
            background: 'var(--color-vermillion, #c1352f)',
            color: 'var(--color-paper, #f3eee5)',
            padding: '3px 10px',
          }}>Clarion</span>
          <span style={{
            fontFamily: 'var(--app-font-mono)',
            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--color-muted, #7a716a)',
          }}>Intelligence Report</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {['Briefing', 'Method', 'Capabilities', 'Sources'].map(l => (
            <span key={l} style={{
              fontFamily: 'var(--app-font-mono)',
              fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >{l}</span>
          ))}
        </nav>

        <button
          onClick={onNewSearch}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--color-vermillion, #c1352f)',
            color: 'var(--color-paper, #f3eee5)',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--app-font-mono)',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '9px 16px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d96a64'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-vermillion, #c1352f)'}
        >
          File a Story →
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--color-vermillion, #c1352f)', width: '100%' }} />
    </header>
  );
}