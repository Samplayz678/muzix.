import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const words = [
  { text: 'Refined,', direction: -1 },
  { text: 'Reworked,', direction: 1 },
  { text: 'Replayed.', direction: -0.55 },
];

function MovingWord({ word, index, progress, reducedMotion }) {
  const x = useTransform(progress, [0, 1], [`${word.direction * 34}px`, `${word.direction * -34}px`]);
  const opacity = useTransform(progress, [0, 0.22, 0.78, 1], [0.42, 1, 1, 0.5]);
  const blur = useTransform(progress, [0, 0.25, 0.75, 1], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(7px)']);

  return (
    <motion.div
      style={reducedMotion ? undefined : { x, opacity, filter: blur }}
      className={`editorial-display border-t border-[#f4f1ea]/12 py-4 text-[4rem] font-black uppercase leading-[0.86] tracking-normal sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] ${
        index === 1 ? 'text-[#f4f1ea]/72' : 'text-[#f4f1ea]'
      }`}
    >
      {word.text}
    </motion.div>
  );
}

export default function RefinedTypography() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#050505] px-5 py-24 text-[#f4f1ea] sm:px-8 md:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="editorial-label mb-12 text-xs uppercase text-[#f4f1ea]/48">
          R E P L A Y&nbsp;&nbsp; S T U D I E S
        </p>

        <div className="space-y-2">
          {words.map((word, index) => (
            <MovingWord
              key={word.text}
              word={word}
              index={index}
              progress={scrollYProgress}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
