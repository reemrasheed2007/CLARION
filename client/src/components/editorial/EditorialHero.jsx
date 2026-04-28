import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TickerColumn } from './TickerColumn';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function getDateline() {
  const d = new Date();
  return d
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .toUpperCase()
    .replace(/,/g, ' ·');
}

export function EditorialHero({ topic, setTopic, onAnalyze, trending = [], error, searchRef }) {
  const localRef = useRef(null);
  const inputRef = searchRef || localRef;
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic && topic.trim()) onAnalyze(topic);
  };

  const dateline = getDateline();

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Dateline */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between gap-4 mb-3"
        >
          <span className="meta truncate">{dateline} · ISSUE 001</span>
          <span className="meta hidden sm:inline">A NEUTRAL READING ROOM, NIGHTLY</span>
        </motion.div>
        <div className="rule-red w-full mb-12 md:mb-16" />

        {/* Two-column hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14">
          {/* LEFT — Lead story */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
              <span className="kicker">Tonight's Briefing</span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="display-serif text-paper text-[52px] sm:text-[68px] lg:text-[88px] leading-[0.95] tracking-[-0.015em] mt-4"
            >
              Read what the world<br />
              is <span className="italic text-vermillion-soft">actually</span> saying.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-paper-dim/85 text-[17px] md:text-[19px] leading-[1.7] mt-8 max-w-2xl"
            >
              <span className="display-serif italic text-paper text-[34px] float-left mr-2 mt-1 leading-[0.9]">C</span>
              larion files the world's reporting on any story side by side, then lets Gemini read every outlet for you. Consensus on the left. Contradictions in the middle. Spin in red.
            </motion.p>

            {/* Search — newsroom style: thick rule, vermillion submit */}
            <motion.form
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.7 }}
              onSubmit={handleSubmit}
              className="mt-12 max-w-2xl"
            >
              <label className="kicker block mb-3">File a story →</label>
              <div
                className={`flex items-center gap-3 border-b transition-colors ${
                  focused ? 'border-vermillion' : 'border-rule'
                }`}
              >
                <span className="font-mono text-vermillion text-[14px] select-none">›</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search any story — Gaza ceasefire, AI regulation, climate summit…"
                  className="flex-1 bg-transparent outline-none py-4 text-paper placeholder-muted/70 font-sans text-[16px] md:text-[18px]"
                />
                {topic === '' && focused && <span className="blink-cursor" />}
                <button
                  type="submit"
                  disabled={!topic || !topic.trim()}
                  className="group flex items-center gap-2 bg-vermillion hover:bg-vermillion-soft disabled:bg-rule disabled:cursor-not-allowed transition-colors text-paper px-5 py-2.5 font-mono uppercase tracking-[0.18em] text-[12px] my-2"
                >
                  Analyze
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
              {error && (
                <p className="mt-3 font-mono uppercase tracking-[0.12em] text-[11px] text-vermillion">
                  Error · {error}
                </p>
              )}
            </motion.form>

            {/* Trending — labeled list */}
            {trending && trending.length > 0 && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="mt-10"
              >
                <span className="meta block mb-4">On the wire tonight</span>
                <div className="flex flex-wrap gap-x-5 gap-y-2.5 max-w-2xl">
                  {trending.slice(0, 6).map((t, i) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTopic(t);
                        onAnalyze(t);
                      }}
                      className="group flex items-baseline gap-2 text-left"
                    >
                      <span className="font-mono text-[10.5px] text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-[14px] text-paper-dim group-hover:text-vermillion transition-colors underline decoration-1 underline-offset-4 decoration-rule group-hover:decoration-vermillion">
                        {t}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Live ticker column */}
          <div className="lg:col-span-5 xl:col-span-4 lg:border-l lg:border-rule lg:pl-10">
            <TickerColumn />
          </div>
        </div>
      </div>
    </section>
  );
}
