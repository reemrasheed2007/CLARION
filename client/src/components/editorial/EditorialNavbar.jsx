import { useEffect, useState } from 'react';

export function EditorialNavbar({ onTryClarion }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTry = () => {
    if (onTryClarion) return onTryClarion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-ink/85 backdrop-blur-md transition-shadow duration-500 ${
        scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <div className="flex items-baseline gap-3">
          <span className="display-serif font-extrabold text-[26px] tracking-tight leading-none bg-vermillion text-paper px-2.5 py-1">Clarion</span>
          <span className="meta hidden sm:inline-block">Vol. 1 · Issue 001</span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: 'Briefing', href: '#briefing' },
            { label: 'Method', href: '#method' },
            { label: 'Capabilities', href: '#capabilities' },
            { label: 'Sources', href: '#sources' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="meta hover:text-paper transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={handleTry}
          className="group flex items-center gap-2 bg-vermillion hover:bg-vermillion-soft transition-colors text-paper text-[12px] font-mono uppercase tracking-[0.16em] px-4 py-2"
        >
          File a Story
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
      <div className="rule-red w-full" />
    </header>
  );
}
