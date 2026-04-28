import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

export function PullQuote() {
  return (
    <section
      id="briefing"
      className="relative w-full py-32 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp}>
          <span className="kicker block mb-6">Editor's Note</span>
        </motion.div>

        <motion.blockquote
          {...fadeUp}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="display-serif italic text-paper text-[40px] sm:text-[56px] md:text-[72px] leading-[1.05] tracking-[-0.018em]"
        >
          <span className="text-vermillion select-none">&ldquo;</span>
          One event. A hundred narratives. The only difference between informed and misled is the number of papers you opened this morning.<span className="text-vermillion select-none">&rdquo;</span>
        </motion.blockquote>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="w-10 rule-red" />
          <span className="meta">The Clarion Editorial Desk · 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
