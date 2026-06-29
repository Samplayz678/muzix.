import { motion } from 'framer-motion';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';
import GrainOverlay from './GrainOverlay';
import ShaderGradientBackground from './ShaderGradientBackground';

const ease = [0.22, 1, 0.36, 1];

export default function MiduAboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#020202] px-5 py-24 text-white sm:px-8 md:px-10 lg:py-32">
      <span id="story" className="absolute -top-24" aria-hidden="true" />
      <ShaderGradientBackground variant="midu" intensity="midu" className="opacity-100" />
      <GrainOverlay />

      <div className="relative z-10 mx-auto grid max-w-[118rem] gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="editorial-label mb-6 text-xs uppercase text-white/42">About Muzix</p>
          <h2 className="max-w-xl text-4xl font-black leading-[0.98] tracking-normal sm:text-5xl md:text-6xl">
            Playback built for Discord rooms that never go quiet.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.08, duration: 0.7, ease }}
        >
          <ScrollAlphabetReveal
            text="Muzix is a Discord-native music bot that treats every voice channel like a shared listening room. We focus on stable playback, readable queues, and slash commands your community already knows how to use. The result: music that does not just play — it keeps the server together."
            className="max-w-3xl text-xl font-semibold leading-9 text-white/74 md:text-2xl md:leading-10"
          />
          <a
            href="#sound-guide"
            className="mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-bold uppercase text-white transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            Explore the sound guide
          </a>
        </motion.div>
      </div>
    </section>
  );
}
