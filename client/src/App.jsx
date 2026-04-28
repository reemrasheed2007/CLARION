import { useState, useEffect } from 'react';
import EditorialLanding from './components/editorial/EditorialLanding';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import LoadingPulse from './components/LoadingPulse';
import SynthesisPanel from './components/SynthesisPanel';
import ArticleGrid from './components/ArticleGrid';
import { analyzeNews, getTrending } from './api/clarionApi';
import './index.css';

export default function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending()
      .then((r) => setTrending(r.data.topics))
      .catch(() => {});
  }, []);

  const handleAnalyze = async (searchTopic) => {
    const t = searchTopic || topic;
    if (!t.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await analyzeNews(t);
      setResult(data);
      setTopic(t);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Landing — cinematic editorial newsroom layout
  if (!result && !loading) {
    return (
      <EditorialLanding
        topic={topic}
        setTopic={setTopic}
        onAnalyze={handleAnalyze}
        trending={trending}
        error={error}
      />
    );
  }

  // Loading
  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <LoadingPulse topic={topic} />
      </div>
    );
  }

  // Results — preserve existing analysis layout
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <SearchBar topic={topic} setTopic={setTopic} onAnalyze={handleAnalyze} compact />
        </div>
        {error && (
          <div
            className="glass"
            style={{
              padding: 16,
              marginBottom: 24,
              border: '1px solid rgba(193,53,47,0.3)',
              color: '#c1352f',
            }}
          >
            ⚠ {error}
          </div>
        )}
        <SynthesisPanel result={result} />
        <ArticleGrid articles={result.articles} />
      </main>
    </div>
  );
}
