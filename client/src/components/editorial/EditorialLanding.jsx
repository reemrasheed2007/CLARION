import { useRef } from 'react';
import { EditorialNavbar } from './EditorialNavbar';
import { EditorialHero } from './EditorialHero';
import { SourcesMarquee } from './SourcesMarquee';
import { PullQuote } from './PullQuote';
import { MethodSection } from './MethodSection';
import { CapabilitiesBoard } from './CapabilitiesBoard';
import { EditorialCTA } from './EditorialCTA';
import { EditorialFooter } from './EditorialFooter';

export default function EditorialLanding({ topic, setTopic, onAnalyze, trending, error }) {
  const searchRef = useRef(null);

  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => searchRef.current?.focus(), 600);
  };

  return (
    <div className="bg-ink text-paper min-h-screen">
      <EditorialNavbar onTryClarion={focusSearch} />
      <main>
        <EditorialHero
          topic={topic}
          setTopic={setTopic}
          onAnalyze={onAnalyze}
          trending={trending}
          error={error}
          searchRef={searchRef}
        />
        <SourcesMarquee />
        <PullQuote />
        <MethodSection />
        <CapabilitiesBoard />
        <EditorialCTA onAnalyze={focusSearch} />
      </main>
      <EditorialFooter />
    </div>
  );
}
