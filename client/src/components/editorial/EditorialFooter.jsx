export function EditorialFooter() {
  return (
    <footer className="relative w-full border-t border-rule bg-ink/95">
      {/* Masthead */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div>
            <div className="display-serif text-paper text-[48px] md:text-[64px] leading-none tracking-tight mb-3">
              Clarion
            </div>
            <span className="meta block">A neutral reading room for the global press · Vol. 1, Issue 001</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6">
            {[
              { label: 'Desks', items: ['World', 'AI', 'Watch', 'Facts'] },
              { label: 'Method', items: ['How we read', 'How we score', 'Sources'] },
              { label: 'House', items: ['Privacy', 'Terms', 'Contact'] },
            ].map((col) => (
              <div key={col.label}>
                <span className="kicker block mb-3">{col.label}</span>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="font-sans text-[14px] text-paper-dim hover:text-vermillion transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule-paper w-full mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="meta">© 2026 Clarion · Printed nightly · All rights reserved.</span>
          <span className="meta flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-vermillion animate-pulse" />
            Wire active
          </span>
        </div>
      </div>
    </footer>
  );
}
