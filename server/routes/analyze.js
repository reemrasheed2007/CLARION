import express from 'express';
import { fetchArticles } from '../services/newsService.js';
import { analyzeWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide a valid topic (min 2 characters).' });
  }

  const cleanTopic = topic.trim().slice(0, 200);

  try {
    console.log(`\n📰 Fetching articles for: "${cleanTopic}"`);
    const articles = await fetchArticles(cleanTopic);

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No articles found for this topic. Try a different search term.' });
    }

    console.log(`✅ Found ${articles.length} articles. Running analysis...`);
    const analysis = await analyzeWithGemini(cleanTopic, articles);

    console.log(`🤖 Analysis complete. Bias score: ${analysis.overallBiasScore}`);

    // Strip internal hint fields before sending to client
    const cleanArticles = articles.map(({ _topic, _region, _tone, ...rest }) => rest);

    return res.json({
      topic: cleanTopic,
      articlesAnalyzed: cleanArticles.length,
      articles: cleanArticles,
      analysis,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Analysis error:', error.message);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred during analysis.'
    });
  }
});

// Trending topics endpoint (static for prototype)
router.get('/trending', (req, res) => {
  res.json({
    topics: [
      'Gaza ceasefire negotiations',
      'US China trade war tariffs',
      'Ukraine Russia war 2025',
      'AI regulation Europe',
      'Climate change COP summit',
      'Iran nuclear deal',
      'Taiwan China tensions',
      'Global inflation economy'
    ]
  });
});

export default router;
