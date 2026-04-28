import React, { useState } from 'react';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

function ArticleCard({ article, index }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={article.url} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'rgba(243,238,229,0.04)' : 'rgba(243,238,229,0.02)',
          border: `1px solid ${hovered ? 'rgba(193,53,47,0.3)' : 'rgba(243,238,229,0.07)'}`,
          overflow: 'hidden', height: '100%',
          transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-2px)' : 'none',
          animation: `fadeInUp 0.4s ease ${index * 0.05}s both`,
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        {article.urlToImage && !imgErr ? (
          <div style={{ height: 140, overflow: 'hidden', background: 'rgba(243,238,229,0.03)' }}>
            <img
              src={article.urlToImage} alt={article.title}
              onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }}
            />
          </div>
        ) : (
          <div style={{
            height: 60,
            background: 'repeating-linear-gradient(45deg, rgba(193,53,47,0.04) 0px, rgba(193,53,47,0.04) 1px, transparent 1px, transparent 8px)',
          }} />
        )}

        <div style={{ padding: '14px 18px 18px' }}>
          {/* Source + time row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{
              fontFamily: 'var(--app-font-mono)', fontSize: 9.5,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--color-vermillion, #c1352f)',
              borderBottom: '1px solid var(--color-vermillion, #c1352f)',
              paddingBottom: 1,
            }}>{article.source}</span>
            <span style={{ fontFamily: 'var(--app-font-mono)', fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              {timeAgo(article.publishedAt)}
            </span>
          </div>

          {/* Headline */}
          <h3 style={{
            fontFamily: 'var(--app-font-serif)',
            fontSize: 15, fontWeight: 400, lineHeight: 1.5,
            color: hovered ? 'var(--color-paper, #f3eee5)' : 'var(--text-primary)',
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
            transition: 'color 0.2s',
          }}>
            {article.title}
          </h3>

          {article.description && (
            <p style={{
              fontFamily: 'var(--app-font-sans)', fontSize: 12,
              color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.55,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {article.description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default function ArticleGrid({ articles }) {
  if (!articles?.length) return null;
  return (
    <div style={{ marginTop: 16, paddingTop: 40 }}>
      {/* Section header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ height: 1, background: 'var(--color-vermillion, #c1352f)', marginBottom: 16 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{
              fontFamily: 'var(--app-font-mono)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-vermillion, #c1352f)', marginBottom: 4,
            }}>Tonight's Reading List</div>
            <span style={{
              fontFamily: 'var(--app-font-serif)', fontSize: 22, fontWeight: 900,
              letterSpacing: '-0.02em',
            }}>{articles.length} sources</span>
            <span style={{ fontFamily: 'var(--app-font-mono)', fontSize: 11, color: 'var(--text-muted)', marginLeft: 12, letterSpacing: '0.08em' }}>from global outlets</span>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(243,238,229,0.08)', marginTop: 16 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 12 }}>
        {articles.map((a, i) => <ArticleCard key={i} article={a} index={i} />)}
      </div>

      {/* Sources marquee footer */}
      <div style={{
        marginTop: 40, borderTop: '1px solid rgba(243,238,229,0.08)',
        paddingTop: 16, overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'var(--app-font-mono)', fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10,
        }}>Today's Bureau</div>
        <div style={{ display: 'flex', gap: 28, overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: 28, whiteSpace: 'nowrap' }}>
            {[...new Set(articles.map(a => a.source).filter(Boolean)), ...new Set(articles.map(a => a.source).filter(Boolean))].map((s, i) => (
              <span key={i} style={{
                fontFamily: 'var(--app-font-serif)', fontSize: 14, fontWeight: 700,
                color: 'rgba(243,238,229,0.25)', letterSpacing: '-0.01em',
              }}>· {s.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

