import { ANALYSES, buildGenericAnalysis } from '../data/analyses.js';

// ──────────────────────────────────────────────────────────────────────────
// PROTOTYPE MODE: returns a pre-built analysis from server/data/analyses.js
// (or a generic one for unknown topics) instead of calling Gemini.
// No GEMINI_API_KEY required.
//
// Signature: analyzeWithGemini(topic, articles)
// (changed from the original `prompt`-only signature; the route passes both)
// ──────────────────────────────────────────────────────────────────────────

export async function analyzeWithGemini(topic, articles) {
  // Simulate processing latency so the typewriter/loading UI feels real
  await new Promise((r) => setTimeout(r, 1100));

  // Determine the dominant topic among the matched articles
  const topicCounts = {};
  for (const a of articles) {
    if (a._topic) topicCounts[a._topic] = (topicCounts[a._topic] || 0) + 1;
  }
  const dominantTopic = Object.keys(topicCounts).sort(
    (a, b) => topicCounts[b] - topicCounts[a]
  )[0];

  if (dominantTopic && ANALYSES[dominantTopic]) {
    return ANALYSES[dominantTopic];
  }
  return buildGenericAnalysis(topic, articles);
}
