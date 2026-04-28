const SOURCES = [
  'REUTERS', 'BBC', 'AL JAZEERA', 'THE NEW YORK TIMES', 'LE MONDE', 'ASAHI SHIMBUN',
  'THE GUARDIAN', 'ASSOCIATED PRESS', 'BLOOMBERG', 'DEUTSCHE WELLE', 'XINHUA',
  'EL PAÍS', 'TIMES OF INDIA', 'HAARETZ', 'FINANCIAL TIMES',
];

export function SourcesMarquee() {
  return (
    <section
      id="sources"
      aria-label="Today's sources"
      className="relative w-full py-10 border-y border-rule overflow-hidden bg-charcoal/40"
    >
      <span className="absolute left-6 top-1/2 -translate-y-1/2 z-10 meta hidden md:block bg-ink px-3">
        Today's Bureau
      </span>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex whitespace-nowrap will-change-transform">
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-6 display-serif text-paper-dim text-[24px] md:text-[28px] tracking-tight"
            >
              {s}
              <span className="text-vermillion text-[20px] leading-none select-none">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
