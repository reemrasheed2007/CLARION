import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

const STEPS = [
  {
    num: 'I',
    label: 'File',
    title: 'You file the story.',
    body: 'Type any topic — a leader\'s name, an event, a policy. Clarion treats it like an assignment desk would: scoped, dated, sourced.',
  },
  {
    num: 'II',
    label: 'Wire',
    title: 'We pull the wires.',
    body: 'Live coverage from outlets across continents — Reuters, BBC, Al Jazeera, Le Monde, Asahi, NYT, regional independents — landing on a single desk.',
  },
  {
    num: 'III',
    label: 'Read',
    title: 'Gemini reads every line.',
    body: 'Our model parses each piece for consensus, contradiction, omission, and editorial spin — then writes you a sub-editor\'s neutral brief.',
  },
  {
    num: 'IV',
    label: 'Decide',
    title: 'You read the room.',
    body: 'Side-by-side framings. Loaded language flagged. Sourced facts ranked. The story behind the story, never the other way around.',
  },
];

export function MethodSection() {
  return (
    <section id="method" className="relative w-full py-32 md:py-40 px-6 md:px-10 border-t border-rule">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-3">
          <span className="kicker">The Method</span>
        </motion.div>
        <div className="rule-red w-full mb-10 md:mb-16 max-w-[420px]" />

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="display-serif text-paper text-[44px] md:text-[68px] leading-[1.02] tracking-[-0.015em] mb-16 md:mb-24 max-w-4xl"
        >
          A nightly desk built<br />
          for <span className="italic">a fragmented</span> world.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.num}
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-start"
            >
              <div className="display-serif italic text-vermillion text-[88px] md:text-[112px] leading-[0.85] tracking-tight">
                {s.num}
              </div>
              <div className="border-t border-rule pt-4">
                <span className="kicker mb-3 block">{s.label}</span>
                <h3 className="display-serif text-paper text-[26px] md:text-[32px] leading-[1.15] tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="font-sans font-light text-paper-dim/85 text-[15.5px] md:text-[16.5px] leading-[1.65]">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
