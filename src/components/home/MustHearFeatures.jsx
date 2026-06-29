import { motion } from 'framer-motion';
import { soundAttractions } from './editorialData';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const ease = [0.22, 1, 0.36, 1];

export default function MustHearFeatures() {
  return (
    <section className="relative bg-[#050505] px-5 py-24 text-[#f4f1ea] sm:px-8 md:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="editorial-label mb-7 text-xs uppercase text-[#f4f1ea]/48">
              M U S T - H E A R&nbsp;&nbsp; F E A T U R E S
            </p>
            <h2 className="editorial-display text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-8xl">
              A catalog of server sound.
            </h2>
          </div>
          <ScrollAlphabetReveal
            text="Muzix keeps the editorial surface minimal while the product message stays direct: Discord-first music controls for shared listening."
            className="max-w-xl text-xl leading-9 text-[#f4f1ea]/72 md:justify-self-end md:text-2xl md:leading-10"
          />
        </div>

        <div className="divide-y divide-[#f4f1ea]/12 border-y border-[#f4f1ea]/12">
          {soundAttractions.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-110px' }}
              transition={{ delay: index * 0.035, duration: 0.62, ease }}
              className="grid gap-6 py-9 md:grid-cols-[92px_1fr_0.9fr_120px] md:items-start"
            >
              <span className="text-sm text-[#f4f1ea]/36">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="editorial-label mb-4 text-[0.65rem] uppercase text-accent-primary/75">{feature.label}</p>
                <h3 className="editorial-display text-4xl font-black uppercase leading-none tracking-normal sm:text-5xl md:text-6xl">
                  {feature.title}
                </h3>
              </div>
              <ScrollAlphabetReveal
                text={feature.body}
                className="max-w-2xl text-lg leading-8 text-[#f4f1ea]/72 md:text-xl md:leading-9"
                offset={['start 86%', 'end 46%']}
              />
              <span className="w-fit border border-[#f4f1ea]/18 px-3 py-2 text-xs uppercase text-[#f4f1ea]/58 md:justify-self-end">
                {feature.command}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
