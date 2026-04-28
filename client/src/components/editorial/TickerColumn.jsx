import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HEADLINES = [
  { region: 'WIRE', text: 'Western coverage diverges sharply from regional outlets on ceasefire framing.' },
  { region: 'AP · REUTERS', text: 'Eight of twelve outlets agree on basic timeline; disagree on attribution.' },
  { region: 'AL JAZEERA', text: 'Regional sources lead with civilian impact statistics omitted by US wires.' },
  { region: 'BBC', text: 'European coverage emphasizes diplomatic process over military developments.' },
  { region: 'NYT', text: 'Loaded language detected in 4 of 18 sources — flagged in tonight\'s report.' },
  { region: 'LE MONDE', text: 'French wires note "calculated ambiguity" in joint statement language.' },
  { region: 'ASAHI', text: 'Asian-Pacific outlets surface contested attribution buried by Western sources.' },
  { region: 'GUARDIAN', text: 'Editorial framing differs by 38% across left-right spectrum on same facts.' },
];

function Row({ region, text }) {
  return (
    <div className="py-4 border-b border-rule/70">
      <span className="font-mono uppercase text-[10px] tracking-[0.16em] text-vermillion mb-1.5 block">
        {region}
      </span>
      <p className="display-serif text-paper text-[16px] leading-[1.4] tracking-tight">
        {text}
      </p>
    </div>
  );
}

export function TickerColumn() {
  const [now, setNow] = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );

  useEffect(() => {
    const i = setInterval(
      () =>
        setNow(
          new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        ),
      30000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.6 }}
      className="relative h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="kicker flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-vermillion animate-pulse" />
          Live Wire
        </span>
        <span className="meta">{now} UTC</span>
      </div>
      <div className="rule-paper w-full mb-2" />

      {/* Auto-scroll vertical ticker */}
      <div className="relative overflow-hidden flex-1 min-h-[420px] max-h-[540px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        <div className="ticker-track">
          {[...HEADLINES, ...HEADLINES].map((h, i) => (
            <Row key={i} region={h.region} text={h.text} />
          ))}
        </div>
      </div>

      {/* Source count */}
      <div className="mt-4 pt-4 border-t border-rule">
        <span className="meta block mb-1">Tonight's reading list</span>
        <span className="display-serif text-paper text-[28px] tracking-tight leading-none">
          18 sources · 6 regions
        </span>
      </div>
    </motion.div>
  );
}
