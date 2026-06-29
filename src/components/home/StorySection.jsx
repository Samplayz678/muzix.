import { motion } from 'framer-motion';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const ease = [0.22, 1, 0.36, 1];

export default function StorySection() {
  return (
    <section id="about" className="relative bg-[#050505] px-5 py-24 text-[#f4f1ea] sm:px-8 md:px-10 lg:py-32">
      <span id="story" className="absolute -top-24" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-[#f4f1ea]/12 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="editorial-label mb-8 text-xs uppercase text-[#f4f1ea]/48">S T O R Y</p>
          <div className="grid grid-cols-2 gap-px border border-[#f4f1ea]/12 bg-[#f4f1ea]/12 text-xs uppercase text-[#f4f1ea]/62">
            {['Voice rooms', 'Slash commands', 'Shared queues', 'Live controls'].map((item) => (
              <span key={item} className="bg-[#050505] p-4">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.08, duration: 0.8, ease }}
        >
          <h2 className="editorial-display text-5xl font-black uppercase leading-[0.94] tracking-normal sm:text-6xl md:text-8xl">
            From command to chorus.
          </h2>
          <ScrollAlphabetReveal
            text="Muzix turns simple Discord commands into a shared listening experience. Play tracks, build queues, save favourites, apply filters, read lyrics, and keep the vibe moving without leaving your server."
            className="mt-8 max-w-3xl text-2xl leading-10 text-[#f4f1ea]/76 md:text-3xl md:leading-[3rem]"
          />
        </motion.div>
      </div>
    </section>
  );
}
