import { ALL_ARTICLES } from '../data/articles.js';

// ──────────────────────────────────────────────────────────────────────────
// PROTOTYPE MODE: serves articles from the local hardcoded corpus
// (server/data/articles.js) instead of calling NewsAPI. No keys required.
// To switch back to live NewsAPI, restore the previous axios implementation.
// ──────────────────────────────────────────────────────────────────────────

export async function fetchArticles(topic) {
  // Simulate a brief network delay so the loading pulse remains visible
  await new Promise((r) => setTimeout(r, 350));

  const q = (topic || '').toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);

  // Score each article on alias hits + token hits across title/description/aliases
  const scored = ALL_ARTICLES.map((a) => {
    const hay = `${a.title} ${a.description} ${a.aliases.join(' ')}`.toLowerCase();
    let score = 0;
    for (const al of a.aliases) {
      if (q.includes(al)) score += 8;
      if (al.includes(q) && q.length >= 3) score += 4;
    }
    for (const t of tokens) {
      if (hay.includes(t)) score += 1;
    }
    return { a, score };
  })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score);

  let chosen = scored.slice(0, 18).map((x) => x.a);

  // If nothing matches, return a curated cross-topic sample so the prototype
  // still demonstrates the analysis flow
  if (chosen.length === 0) {
    chosen = [...ALL_ARTICLES].sort(() => Math.random() - 0.5).slice(0, 18);
  }

  return chosen.map((a) => ({
    title: a.title,
    description: a.description,
    source: a.source,
    url: a.url,
    urlToImage: a.urlToImage,
    publishedAt: a.publishedAt,
    author: a.author,
    // Internal hints used downstream by analyzeWithGemini
    _topic: a.topic,
    _region: a.region,
    _tone: a.tone,
  }));
}
