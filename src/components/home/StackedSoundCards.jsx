import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';

const stackCards = [
  {
    label: '01 / Queue',
    title: 'Smart queue',
    body: 'Build the next run of songs with quick ordering, readable controls, and a queue that feels shared by the whole voice channel.',
    command: '/queue',
    tone: 'bg-[#f4f1ea] text-[#050505] border-[#050505]/22',
  },
  {
    label: '02 / Filters',
    title: 'Audio filters',
    body: 'Switch the mood with bass boost, nightcore, vaporwave, and equalizer settings without pulling the room away from Discord.',
    command: '/filter',
    tone: 'bg-[#101014] text-[#f4f1ea] border-[#f4f1ea]/18',
  },
  {
    label: '03 / Lyrics',
    title: 'Lyrics in the room',
    body: 'Bring the line everyone is waiting for directly into the conversation so the chorus stays part of the server moment.',
    command: '/lyrics',
    tone: 'bg-[#ffffff] text-[#050505] border-[#050505]/22',
  },
  {
    label: '04 / Autoplay',
    title: 'Keep it moving',
    body: 'When the planned queue ends, Muzix carries the session forward so the channel never drops into silence too early.',
    command: '/autoplay',
    tone: 'bg-[#f24d44] text-[#111111] border-[#111111]/28',
  },
];

function StackCard({ card, index, progress, reducedMotion }) {
  const y = useTransform(progress, [0, 1], [`${index * 26}px`, `${index * -16}px`]);
  const rotate = useTransform(progress, [0, 1], [`${index % 2 === 0 ? -1.8 : 1.8}deg`, `${index % 2 === 0 ? 0.8 : -0.8}deg`]);
  const scale = useTransform(progress, [0, 1], [1 - index * 0.018, 1 - index * 0.006]);

  return (
    <motion.article
      style={reducedMotion ? { zIndex: index + 1 } : { y, rotate, scale, zIndex: index + 1 }}
      className={`sticky top-28 -mt-8 min-h-[24rem] border p-6 shadow-[0_28px_70px_rgba(0,0,0,0.22)] first:mt-0 sm:p-8 md:-mt-14 lg:min-h-[28rem] ${card.tone}`}
    >
      <div className="flex h-full flex-col justify-between gap-16">
        <div className="flex items-center justify-between gap-4 border-b border-current/20 pb-4">
          <span className="editorial-label text-[0.65rem] uppercase opacity-62">{card.label}</span>
          <span className="border border-current/25 px-3 py-2 text-xs font-bold uppercase">{card.command}</span>
        </div>
        <div>
          <h3 className="editorial-display text-5xl font-black uppercase leading-[0.88] tracking-normal sm:text-6xl md:text-7xl">
            {card.title}
          </h3>
          <ScrollAlphabetReveal
            text={card.body}
            className="mt-7 max-w-2xl text-xl leading-9 opacity-80 md:text-2xl md:leading-10"
            offset={['start 82%', 'end 42%']}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function StackedSoundCards() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={ref}
      id="overlap"
      className="relative z-20 -mt-16 overflow-visible bg-[#050505] px-5 pb-24 pt-32 text-[#f4f1ea] sm:px-8 md:px-10 lg:-mt-24 lg:pb-32 lg:pt-40"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <p className="editorial-label mb-8 text-xs uppercase text-[#f4f1ea]/48">S T A C K E D&nbsp;&nbsp; S O U N D</p>
          <h2 className="editorial-display text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl md:text-8xl">
            Cards that slide into the mix.
          </h2>
          <ScrollAlphabetReveal
            text="Each Muzix feature overlaps the previous one, like a queue building on top of the last track."
            className="mt-8 max-w-lg text-xl leading-9 text-[#f4f1ea]/76 md:text-2xl md:leading-10"
          />
        </div>

        <div className="pb-16 pt-4">
          {stackCards.map((card, index) => (
            <StackCard
              key={card.title}
              card={card}
              index={index}
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
