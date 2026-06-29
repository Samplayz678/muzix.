import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Captions, Disc3, Heart, ListMusic, Music2, Radio, SlidersHorizontal, SkipBack } from 'lucide-react';
import WaveformRewind from './WaveformRewind';

const commandStack = [
  { label: '/autoplay', meta: 'silence reverses', icon: Radio },
  { label: '/playlist', meta: 'collections return', icon: Music2 },
  { label: '/lyrics', meta: 'words fold back', icon: Captions },
  { label: '/filter', meta: 'bass boost unwinds', icon: SlidersHorizontal },
  { label: '/queue', meta: 'next tracks rewind', icon: ListMusic },
  { label: '/play', meta: 'the first beat waits', icon: SkipBack },
];

const frames = [
  'Final hero peak',
  'Commands rewind',
  'Queue pulls back',
  'Filters collapse',
  'Server vibe resets',
];

function CommandRewindCard({ item, index, progress, reduced }) {
  const Icon = item.icon;
  const start = index * 0.09;
  const y = useTransform(progress, [start, 1], [-170 + index * 26, 42 + index * 11]);
  const x = useTransform(progress, [start, 1], [index % 2 === 0 ? -34 : 34, 0]);
  const opacity = useTransform(progress, [0, start, start + 0.14, 1], [0.98, 0.92, 1, 0.34]);
  const rotate = useTransform(progress, [start, 1], [index % 2 === 0 ? -7 : 7, index % 2 === 0 ? 4 : -4]);
  const scale = useTransform(progress, [start, 1], [1.04, 0.86]);

  return (
    <motion.div
      style={reduced ? undefined : { y, x, opacity, rotate, scale }}
      className="rounded-3xl border border-white/12 bg-black/42 p-4 shadow-[0_0_30px_rgba(236,72,153,0.12)] backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="font-mono text-2xl font-black text-white">{item.label}</p>
          <p className="mt-1 text-xs font-black uppercase text-white/34">{item.meta}</p>
        </div>
        <Icon className="shrink-0 text-cyan-100" size={22} />
      </div>
    </motion.div>
  );
}

function FrameCaption({ label, index, progress, reduced }) {
  const start = index * 0.18;
  const midpoint = start + 0.08;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start, midpoint, end], [0, 1, 0]);
  const y = useTransform(progress, [start, end], [26, -26]);

  return (
    <motion.p
      style={reduced ? undefined : { opacity, y }}
      className="absolute inset-x-0 top-0 text-center text-xs font-black uppercase text-cyan-100/74 md:text-sm"
    >
      {label}
    </motion.p>
  );
}

export default function RewindTimeline() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const discRotate = useTransform(scrollYProgress, [0, 1], [12, -230]);
  const discScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.82]);
  const centerY = useTransform(scrollYProgress, [0, 1], [30, -86]);
  const centerBlur = useTransform(scrollYProgress, [0, 0.74, 1], ['blur(0px)', 'blur(0px)', 'blur(6px)']);
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['92%', '12%']);
  const markerY = useTransform(scrollYProgress, [0, 1], ['8%', '88%']);

  return (
    <section ref={sectionRef} id="rewind" className="relative h-[460vh] overflow-visible">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.25fr_1fr]">
          <div className="order-2 grid gap-4 lg:order-1">
            {commandStack.map((item, index) => (
              <CommandRewindCard key={item.label} item={item} index={index} progress={scrollYProgress} reduced={reduced} />
            ))}
          </div>

          <motion.div
            style={reduced ? undefined : { y: centerY, filter: centerBlur }}
            className="order-1 relative flex min-h-[540px] flex-col items-center justify-center text-center lg:order-2"
          >
            <div className="absolute top-2 h-8 w-full">
              {frames.map((frame, index) => (
                <FrameCaption key={frame} label={frame} index={index} progress={scrollYProgress} reduced={reduced} />
              ))}
            </div>

            <motion.div
              aria-hidden="true"
              style={reduced ? undefined : { rotate: discRotate, scale: discScale }}
              className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-[conic-gradient(from_90deg,rgba(34,211,238,0.24),rgba(236,72,153,0.22),rgba(124,58,237,0.28),rgba(34,211,238,0.24))] shadow-[0_0_90px_rgba(34,211,238,0.18)] md:h-96 md:w-96"
            >
              <div className="absolute inset-[11%] rounded-full border border-black/60 bg-black/68" />
              <div className="absolute inset-[31%] rounded-full border border-white/10 bg-white/[0.045] backdrop-blur-xl" />
              <Disc3 className="relative z-10 text-white/74" size={72} />
            </motion.div>

            <h2 className="mt-10 text-4xl font-black leading-tight text-white md:text-6xl">
              Feel the queue rewind.
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/52 md:text-lg">
              Scroll through the edit as commands, playlists, favourites, filters, and lyrics move backward into the first beat.
            </p>

            <div className="mt-8 w-full max-w-xl">
              <WaveformRewind progress={scrollYProgress} compact />
            </div>
          </motion.div>

          <div className="order-3 hidden min-h-[540px] grid-cols-[34px_1fr] gap-5 lg:grid">
            <div className="relative mx-auto h-full w-px bg-white/10">
              <motion.div style={reduced ? undefined : { height: timelineHeight }} className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(0deg,#f8fafc,#22d3ee,#ec4899)]" />
              <motion.div style={reduced ? undefined : { top: markerY }} className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-white bg-black shadow-[0_0_28px_rgba(236,72,153,0.68)]" />
            </div>

            <div className="flex flex-col justify-between">
              {[
                ['01', 'High-quality playback'],
                ['02', 'Smart queue'],
                ['03', 'Playlists and favourites'],
                ['04', 'Filters and lyrics'],
                ['05', 'Autoplay control'],
              ].map(([step, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                  <p className="font-mono text-xs font-black text-pink-100/70">{step}</p>
                  <p className="mt-2 text-sm font-black uppercase text-white/72">{label}</p>
                </div>
              ))}
              <div className="rounded-3xl border border-pink-300/18 bg-pink-300/10 p-4 text-pink-50 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Heart size={18} />
                  <p className="text-sm font-black uppercase">Community music vibe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
