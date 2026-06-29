import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AudioWaveform, Captions, Gauge, Heart, ListMusic, Music2, Radio, SlidersHorizontal } from 'lucide-react';

const features = [
  { title: 'High-quality playback', detail: 'Clean Discord voice audio with fast response and stable streams.', icon: AudioWaveform, accent: 'cyan' },
  { title: 'Smart queue', detail: 'Queue, skip, loop, shuffle, and keep the server moving without chaos.', icon: ListMusic, accent: 'pink' },
  { title: 'Playlists', detail: 'Save server-ready collections and bring them back when the vibe returns.', icon: Music2, accent: 'violet' },
  { title: 'Favourites', detail: 'Keep the tracks your community always asks for within reach.', icon: Heart, accent: 'pink' },
  { title: 'Audio filters', detail: 'Bass boost, nightcore, vaporwave, and more for edit-worthy moments.', icon: SlidersHorizontal, accent: 'cyan' },
  { title: 'Lyrics', detail: 'Bring words into the moment when the whole voice channel knows the hook.', icon: Captions, accent: 'white' },
  { title: 'Autoplay', detail: 'Let Muzix keep discovering the next track when nobody wants silence.', icon: Radio, accent: 'violet' },
  { title: 'Server controls', detail: 'Smooth commands built for moderators, DJs, and late-night sessions.', icon: Gauge, accent: 'cyan' },
];

const accentClasses = {
  cyan: 'border-cyan-300/20 shadow-cyan-400/10 text-cyan-100',
  pink: 'border-pink-300/20 shadow-pink-400/10 text-pink-100',
  violet: 'border-violet-300/20 shadow-violet-400/10 text-violet-100',
  white: 'border-white/16 shadow-white/10 text-white',
};

function FeatureCard({ feature, index, progress, reduced }) {
  const Icon = feature.icon;
  const start = index * 0.055;
  const end = Math.min(1, start + 0.58);
  const y = useTransform(progress, [start, end], [-130 - index * 5, 18]);
  const opacity = useTransform(progress, [start, start + 0.08, end], [0, 1, 0.88]);
  const scale = useTransform(progress, [start, end], [1.12, 0.98]);
  const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -8 : 8, 0]);

  return (
    <motion.article
      style={reduced ? undefined : { y, opacity, scale, rotate }}
      className={`group relative overflow-hidden rounded-3xl border bg-black/34 p-5 shadow-2xl backdrop-blur-2xl transition-colors hover:bg-white/[0.055] md:p-6 ${accentClasses[feature.accent]}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)]" />
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-xs font-black uppercase text-white/32">0{index + 1} rewind</span>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045]">
          <Icon size={22} />
        </div>
      </div>
      <h3 className="text-xl font-black text-white md:text-2xl">{feature.title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-white/52">{feature.detail}</p>
    </motion.article>
  );
}

export default function DiscordFeatureCards() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -90]);
  const statsY = useTransform(scrollYProgress, [0, 1], [110, -80]);

  return (
    <section ref={sectionRef} id="features" className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div style={reduced ? undefined : { y: titleY }} className="max-w-3xl">
          <p className="text-sm font-black uppercase text-cyan-100/72">Discord music experience</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
            Make your server sound alive.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/56 md:text-lg">
            A cinematic bot feature montage built around the things Discord communities actually use: playback, queues, playlists, favourites, filters, lyrics, autoplay, and server control.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} progress={scrollYProgress} reduced={reduced} />
          ))}
        </div>

        <motion.div
          id="stats"
          style={reduced ? undefined : { y: statsY }}
          className="mt-16 grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:grid-cols-3"
        >
          {[
            ['90+', 'servers tuned'],
            ['40k+', 'community listeners'],
            ['99.9%', 'uptime target'],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-black text-white md:text-5xl">{value}</p>
              <p className="mt-2 text-xs font-black uppercase text-white/36">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
