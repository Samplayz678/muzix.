import { motion } from 'framer-motion';
import { soundTags } from './editorialData';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const ease = [0.22, 1, 0.36, 1];

export default function OfficialSoundGuide() {
  return (
    <section
      id="sound-guide"
      className="relative bg-[#f4f1ea] px-5 py-24 text-[#050505] sm:px-8 md:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-y border-[#050505]/18 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="editorial-label mb-8 text-xs uppercase text-[#050505]/55">
              O F F I C I A L&nbsp;&nbsp; S O U N D&nbsp;&nbsp; G U I D E
            </p>
            <h2 className="editorial-display max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-8xl">
              Everything your server needs to sound alive.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ delay: 0.08, duration: 0.8, ease }}
            className="lg:max-w-md lg:justify-self-end"
          >
            <ScrollAlphabetReveal
              text="Muzix brings high-quality playback, smart queues, playlists, filters, lyrics, and autoplay into one clean Discord music bot."
              className="text-2xl leading-9 text-[#050505]/76 md:text-3xl md:leading-10"
            />
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-[#050505]/18 bg-[#050505]/18 text-xs uppercase text-[#050505]/66 sm:grid-cols-4 lg:grid-cols-2">
              {soundTags.map((tag) => (
                <span key={tag} className="bg-[#f4f1ea] px-4 py-3">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
