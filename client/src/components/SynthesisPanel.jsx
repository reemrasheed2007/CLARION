import React, { useState, useEffect, useRef } from 'react';
import BiasSignalCard from './BiasSignalCard';
import RegionalMap from './RegionalMap';

const TABS = ['Summary', 'Facts', 'Contested', 'Regions', 'Bias'];

function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed(''); idx.current = 0;
    const t = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1)); idx.current++;
      } else clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [text]);
  return <span>{displayed}<span className="blink-cursor" /></span>;
}

function ScoreMeter({ score }) {
  const color = score < 35 ? '#4a8b6f' : score < 60 ? '#c08a2b' : '#c1352f';
  const label = score < 35 ? 'Low Bias' : score < 60 ? 'Moderate Bias' : 'High Bias';
  return (
    <div style={{
      background: 'rgba(243,238,229,0.03)',
      border: '1px solid rgba(243,238,229,0.08)',
      padding: '20px 24px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--app-font-mono)', fontSize: 10,
        color: 'var(--text-muted)', marginBottom: 8,
        textTransform: 'uppercase', letterSpacing: '0.14em',
      }}>Overall Bias Score</div>
      <div style={{
        fontFamily: 'var(--app-font-serif)', fontSize: 64,
        fontWeight: 900, color, lineHeight: 1,
      }}>{score}</div>
      <div style={{ fontFamily: 'var(--app-font-mono)', fontSize: 11, color, marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ height: 2, background: 'rgba(243,238,229,0.08)', marginTop: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score}%`, background: color, transition: 'width 1s ease' }} />
      </div>
    </div>
  );
}

function KickerLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--app-font-mono)', fontSize: 10,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'var(--color-vermillion, #c1352f)',
      marginBottom: 10,
    }}>{children}</div>
  );
}

export default function SynthesisPanel({ result }) {
  const [activeTab, setActiveTab] = useState('Summary');
  const { analysis, topic, articlesAnalyzed } = result;

  return (
    <div style={{ marginBottom: 56 }}>

      {/* Red top rule */}
      <div style={{ height: 1, background: 'var(--color-vermillion, #c1352f)', marginBottom: 28 }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <KickerLabel>Intelligence Report</KickerLabel>
          <h2 style={{
            fontFamily: 'var(--app-font-serif)',
            fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900,
            letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--color-vermillion, #c1352f)',
          }}>
            "{topic}"
          </h2>
          <p style={{
            fontFamily: 'var(--app-font-mono)', fontSize: 11,
            color: 'var(--text-muted)', marginTop: 12,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {articlesAnalyzed} articles analyzed · {analysis.biasSignals?.length || 0} bias signals · {analysis.contestedClaims?.length || 0} contested claims
          </p>
        </div>
        <div style={{ minWidth: 200 }}>
          <ScoreMeter score={analysis.overallBiasScore} />
        </div>
      </div>

      {/* Keywords */}
      {analysis.topKeywords?.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {analysis.topKeywords.map(k => (
            <span key={k} style={{
              fontFamily: 'var(--app-font-mono)', fontSize: 10.5,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 12px',
              border: '1px solid rgba(193,53,47,0.3)',
              color: 'var(--color-vermillion, #c1352f)',
              background: 'rgba(193,53,47,0.06)',
            }}>{k}</span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(243,238,229,0.08)', marginBottom: 24 }} />

      {/* Tabs — editorial pill strip */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 28,
        borderBottom: '1px solid rgba(243,238,229,0.08)',
      }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '10px 22px',
              border: 'none', background: 'transparent',
              fontFamily: 'var(--app-font-mono)', fontSize: 11,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
              color: activeTab === t ? 'var(--color-paper, #f3eee5)' : 'var(--text-muted)',
              background: activeTab === t ? 'var(--color-vermillion, #c1352f)' : 'transparent',
              borderBottom: activeTab === t ? 'none' : '1px solid transparent',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Tab content */}
      <div
        key={activeTab}
        style={{
          background: 'rgba(243,238,229,0.02)',
          border: '1px solid rgba(243,238,229,0.07)',
          padding: '32px 36px',
          animation: 'fadeInUp 0.3s ease',
        }}
      >

        {activeTab === 'Summary' && (
          <div>
            <KickerLabel>◈ Neutral AI Summary</KickerLabel>
            <p style={{
              fontFamily: 'var(--app-font-serif)', fontSize: 'clamp(16px,2vw,20px)',
              lineHeight: 1.8, color: 'var(--color-paper, #f3eee5)', maxWidth: 780,
              fontWeight: 300,
            }}>
              <TypewriterText text={analysis.neutralSummary} />
            </p>
            {analysis.recommendedSources?.length > 0 && (
              <div style={{
                marginTop: 28, padding: '18px 22px',
                background: 'rgba(74,139,111,0.07)',
                borderLeft: '2px solid #4a8b6f',
              }}>
                <div style={{
                  fontFamily: 'var(--app-font-mono)', fontSize: 10, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: '#4a8b6f', marginBottom: 10,
                }}>✓ Most Balanced Sources</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {analysis.recommendedSources.map(s => (
                    <span key={s} style={{
                      fontFamily: 'var(--app-font-mono)', fontSize: 10.5,
                      padding: '3px 10px', border: '1px solid rgba(74,139,111,0.3)',
                      color: '#4a8b6f', letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Facts' && (
          <div>
            <KickerLabel>✓ Consensus Facts</KickerLabel>
            <p style={{ fontFamily: 'var(--app-font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Points of agreement across most global sources
            </p>
            {analysis.consensusFacts?.length > 0 ? (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {analysis.consensusFacts.map((f, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 18, alignItems: 'flex-start',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(243,238,229,0.06)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--app-font-mono)', fontSize: 10,
                      color: 'var(--color-vermillion, #c1352f)', minWidth: 28,
                      paddingTop: 4, letterSpacing: '0.08em',
                    }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--app-font-serif)', fontSize: 16, lineHeight: 1.65, fontWeight: 300 }}>{f}</span>
                  </li>
                ))}
              </ul>
            ) : <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--app-font-mono)', fontSize: 12 }}>No clear consensus found.</p>}
          </div>
        )}

        {activeTab === 'Contested' && (
          <div>
            <KickerLabel>⚔ Contested Claims</KickerLabel>
            <p style={{ fontFamily: 'var(--app-font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Claims disputed between different media outlets
            </p>
            {analysis.contestedClaims?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {analysis.contestedClaims.map((c, i) => (
                  <div key={i} style={{
                    padding: '22px 24px',
                    background: 'rgba(192,138,43,0.05)',
                    borderLeft: '2px solid #c08a2b',
                  }}>
                    <p style={{ fontFamily: 'var(--app-font-serif)', fontSize: 17, fontWeight: 600, marginBottom: 16, lineHeight: 1.5 }}>{c.claim}</p>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                      {c.supportedBy?.length > 0 && (
                        <div>
                          <div style={{ fontFamily: 'var(--app-font-mono)', fontSize: 10, color: '#4a8b6f', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Supported by</div>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {c.supportedBy.map(s => <span key={s} style={{ fontFamily: 'var(--app-font-mono)', fontSize: 10, padding: '3px 8px', border: '1px solid rgba(74,139,111,0.3)', color: '#4a8b6f' }}>{s}</span>)}
                          </div>
                        </div>
                      )}
                      {c.disputedBy?.length > 0 && (
                        <div>
                          <div style={{ fontFamily: 'var(--app-font-mono)', fontSize: 10, color: 'var(--color-vermillion, #c1352f)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Disputed by</div>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {c.disputedBy.map(s => <span key={s} style={{ fontFamily: 'var(--app-font-mono)', fontSize: 10, padding: '3px 8px', border: '1px solid rgba(193,53,47,0.3)', color: 'var(--color-vermillion, #c1352f)' }}>{s}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                    {c.context && <p style={{ marginTop: 14, fontFamily: 'var(--app-font-serif)', fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic' }}>{c.context}</p>}
                  </div>
                ))}
              </div>
            ) : <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--app-font-mono)', fontSize: 12 }}>No contested claims detected.</p>}
          </div>
        )}

        {activeTab === 'Regions' && <RegionalMap narratives={analysis.regionalNarratives} />}

        {activeTab === 'Bias' && (
          <div>
            <KickerLabel>◎ Bias Signals</KickerLabel>
            <p style={{ fontFamily: 'var(--app-font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Editorial bias detected per outlet</p>
            {analysis.biasSignals?.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
                {analysis.biasSignals.map((b, i) => <BiasSignalCard key={i} bias={b} />)}
              </div>
            ) : <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--app-font-mono)', fontSize: 12 }}>No significant bias signals detected.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
