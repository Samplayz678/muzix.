import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

export default function CommunitySection() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const patternX = useTransform(scrollYProgress, [0, 1], ['-48px', '48px']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f4f1ea] px-5 py-24 text-[#050505] sm:px-8 md:px-10 lg:py-32">
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { x: patternX }}
        className="pointer-events-none absolute inset-x-[-4rem] top-8 whitespace-nowrap text-[4.5rem] font-black uppercase leading-none text-[#050505]/[0.045] sm:text-[7rem] md:text-[10rem]"
      >
        PLAY QUEUE FILTER LYRICS AUTOPLAY PLAY QUEUE FILTER LYRICS AUTOPLAY
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl gap-12 border-y border-[#050505]/18 py-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="editorial-label mb-8 text-xs uppercase text-[#050505]/55">C O M M U N I T Y</p>
          <h2 className="editorial-display max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-8xl">
            Built for every server.
          </h2>
        </div>

        <div className="max-w-lg lg:justify-self-end">
          <ScrollAlphabetReveal
            text="Whether it is a chill voice channel, a gaming night, a study room, or a full community event, Muzix keeps the sound moving."
            className="text-2xl leading-10 text-[#050505]/76 md:text-3xl md:leading-[3rem]"
          />
          <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase text-[#050505]/60">
            {['Chill rooms', 'Gaming nights', 'Study sessions', 'Community events'].map((item) => (
              <span key={item} className="border border-[#050505]/18 px-3 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
