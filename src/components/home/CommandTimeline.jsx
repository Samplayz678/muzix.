import { motion } from 'framer-motion';
import { commandTimeline } from './editorialData';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const ease = [0.22, 1, 0.36, 1];

export default function CommandTimeline() {
  return (
    <section id="timeline" className="relative bg-[#f4f1ea] px-5 py-24 text-[#050505] sm:px-8 md:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-t border-[#050505]/18 pt-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="editorial-label mb-7 text-xs uppercase text-[#050505]/55">E V O L U T I O N</p>
            <h2 className="editorial-display text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-7xl">
              Command evolution.
            </h2>
          </div>

          <div className="border-l border-[#050505]/18">
            {commandTimeline.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px', amount: 0.5 }}
                transition={{ delay: index * 0.05, duration: 0.65, ease }}
                className="relative grid gap-4 border-b border-[#050505]/18 py-8 pl-8 md:grid-cols-[0.32fr_0.3fr_1fr] md:items-start"
              >
                <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-[#050505]" aria-hidden="true" />
                <span className="editorial-label text-[0.65rem] uppercase text-[#050505]/45">{item.label}</span>
                <strong className="editorial-display text-3xl font-black uppercase leading-none tracking-normal md:text-4xl">
                  {item.command}
                </strong>
                <ScrollAlphabetReveal
                  text={item.description}
                  className="max-w-2xl text-lg leading-8 text-[#050505]/72 md:text-xl md:leading-9"
                  offset={['start 86%', 'end 48%']}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
