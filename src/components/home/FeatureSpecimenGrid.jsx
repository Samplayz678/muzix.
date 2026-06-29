import { motion } from 'framer-motion';
import { featureSpecimens } from './editorialData';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const accentMap = {
  red: 'group-hover:border-accent-primary/70 group-hover:text-accent-primary',
  black: 'group-hover:border-[#050505]/55 group-hover:text-[#050505]',
  white: 'group-hover:border-white group-hover:text-[#050505]',
};

const ease = [0.22, 1, 0.36, 1];

export default function FeatureSpecimenGrid() {
  return (
    <section
      id="features"
      className="relative flex min-h-screen items-center bg-[#f4f1ea] px-5 py-24 text-[#050505] sm:px-8 md:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div>
            <p className="editorial-label mb-7 text-xs uppercase text-[#050505]/55">Commands</p>
            <h2 className="editorial-display text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-8xl">
              Feature specimens for a live Discord room.
            </h2>
          </div>
          <ScrollAlphabetReveal
            text="Explore how Muzix helps servers elevate their voice channels with slash commands built for playback, queues, filters, and lyrics."
            className="max-w-xl text-xl leading-9 text-[#050505]/72 md:justify-self-end md:text-2xl md:leading-10"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.055 } },
          }}
          className="grid auto-rows-fr items-stretch border-l border-t border-[#050505]/18 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featureSpecimens.map((feature) => (
            <motion.article
              key={feature.command}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="group flex h-full min-h-56 flex-col justify-between border-b border-r border-[#050505]/18 bg-[#f4f1ea] p-6 transition-colors duration-300 hover:bg-white"
            >
              <div className="flex flex-col justify-between gap-10 h-full">
                <span className="editorial-label text-[0.65rem] uppercase text-[#050505]/44">
                  Discord command
                </span>
                <div>
                  <h3
                    className={`editorial-display break-words text-4xl font-black leading-none tracking-normal text-[#050505] transition-colors duration-300 sm:text-5xl ${accentMap[feature.accent]}`}
                  >
                    {feature.command}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-[#050505]/66">{feature.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
