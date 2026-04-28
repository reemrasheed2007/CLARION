import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

export function EditorialCTA({ onAnalyze }) {
  const goToSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onAnalyze) onAnalyze();
  };

  return (
    <section className="relative w-full py-32 md:py-40 px-6 md:px-10 border-t border-rule">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp}
          className="border border-rule bg-charcoal/50 backdrop-blur-sm p-10 md:p-16 relative"
        >
          {/* Press-pass corner brackets */}
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-vermillion" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-vermillion" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-vermillion" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-vermillion" />

          <div className="flex items-baseline justify-between gap-4 mb-3">
            <span className="kicker">Press Pass</span>
            <span className="meta">No. 001 · 2026</span>
          </div>
          <div className="rule-red w-full mb-10" />

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="display-serif text-paper text-[48px] md:text-[80px] leading-[0.98] tracking-[-0.02em] mb-8"
          >
            Your clearer<br />
            view <span className="italic text-vermillion-soft">starts here.</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-sans font-light text-paper-dim/85 text-[17px] md:text-[19px] leading-[1.65] max-w-xl mb-12"
          >
            File any topic at the desk above and watch the world's reporting unfold — sourced, decoded, side by side.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <button
              onClick={goToSearch}
              className="group flex items-center gap-2 bg-vermillion hover:bg-vermillion-soft transition-colors text-paper px-7 py-4 font-mono uppercase tracking-[0.18em] text-[12px]"
            >
              File a Story
              <span className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
            </button>

            <button
              onClick={() => document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 border border-rule hover:border-paper transition-colors text-paper px-7 py-4 font-mono uppercase tracking-[0.18em] text-[12px]"
            >
              Read the Method
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
