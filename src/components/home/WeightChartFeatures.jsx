import { motion, useReducedMotion } from 'framer-motion';
import { weightFeatures } from './editorialData';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';
import useSimpleScrollMotion from '../../hooks/useSimpleScrollMotion';

const ease = [0.22, 1, 0.36, 1];

export default function WeightChartFeatures() {
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const stableMotion = reducedMotion || simpleScrollMotion;

  return (
    <section id="stats" className="relative flex min-h-screen items-center overflow-hidden bg-[#020202] px-5 py-24 text-[#f4f1ea] sm:px-8 md:px-10 lg:py-32">
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-accent-primary/16 blur-[120px]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-b border-[#f4f1ea]/12 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label mb-6 text-xs uppercase text-[#f4f1ea]/48">W E I G H T&nbsp;&nbsp; C H A R T</p>
            <h2 className="editorial-display max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-normal sm:text-6xl md:text-8xl">
              The bot gets stronger where the room needs it.
            </h2>
          </div>
          <ScrollAlphabetReveal
            text="A type-specimen inspired view of Muzix strengths, from clean command flow to a full Discord music bot."
            className="max-w-md text-lg leading-8 text-[#f4f1ea]/70"
          />
        </div>

        <div className="divide-y divide-[#f4f1ea]/12 border-b border-[#f4f1ea]/12">
          {weightFeatures.map((item, index) => (
            <motion.div
              key={item.weight}
              initial={stableMotion ? false : { opacity: 0, y: 22 }}
              whileInView={stableMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={stableMotion ? undefined : { once: true, margin: '-120px' }}
              transition={stableMotion ? undefined : { delay: index * 0.035, duration: 0.55, ease }}
              style={stableMotion ? { opacity: 1, y: 0 } : undefined}
              className="grid gap-4 py-5 md:grid-cols-[160px_1fr]"
            >
              <span className="editorial-label pt-2 text-[0.65rem] uppercase text-[#f4f1ea]/45">{item.weight}</span>
              <span
                className={`editorial-display text-4xl uppercase leading-none tracking-normal sm:text-5xl md:text-7xl ${item.className}`}
              >
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
