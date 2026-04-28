import { motion } from 'framer-motion';
import { Globe, Sparkles, AlertTriangle, Scale } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

const CARDS = [
  {
    num: '01',
    section: 'World Desk',
    icon: Globe,
    title: 'Global Source Aggregation',
    body: 'Live coverage from every continent — Western, Eastern, regional, independent — filed to one desk.',
  },
  {
    num: '02',
    section: 'AI Desk',
    icon: Sparkles,
    title: 'Gemini-Powered Synthesis',
    body: 'A neutral sub-editor for the 21st century: reads every source, files the consensus, footnotes the contradiction.',
  },
  {
    num: '03',
    section: 'Watch Desk',
    icon: AlertTriangle,
    title: 'Bias & Narrative Signals',
    body: 'Loaded language, omissions, framing tells — flagged with severity so you read how a story is being told, not just what.',
  },
  {
    num: '04',
    section: 'Fact Desk',
    icon: Scale,
    title: 'Consensus & Contested',
    body: 'Verified facts separated from contested claims, labelled and sourced, ranked by cross-outlet agreement.',
  },
];

export function CapabilitiesBoard() {
  return (
    <section id="capabilities" className="relative w-full py-32 md:py-40 px-6 md:px-10 border-t border-rule">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="flex items-baseline justify-between mb-3 gap-4">
          <span className="kicker">Tonight's Capabilities</span>
          <span className="meta">FOUR DESKS · ONE PAPER</span>
        </motion.div>
        <div className="rule-red w-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.num}
              {...fadeUp}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ink p-8 md:p-12 hover:bg-charcoal transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <c.icon className="w-4 h-4 text-vermillion" strokeWidth={2} />
                  <span className="kicker">{c.section}</span>
                </div>
                <span className="display-serif italic text-paper/15 text-[64px] leading-none">
                  {c.num}
                </span>
              </div>

              <h3 className="display-serif text-paper text-[30px] md:text-[40px] leading-[1.05] tracking-tight mb-5">
                {c.title}
              </h3>

              <p className="font-sans font-light text-paper-dim/85 text-[15.5px] leading-[1.65] max-w-md">
                {c.body}
              </p>

              <div className="mt-8 flex items-center gap-2">
                <span className="meta">Continued on the desk</span>
                <span className="text-vermillion text-[14px] inline-block transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
