import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Bot, Disc3, ExternalLink, Headphones, ListMusic, Music2, Play, SkipBack, Sparkles } from 'lucide-react';
import WaveformRewind from './WaveformRewind';

const inviteUrl = 'https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands';
const supportUrl = 'https://discord.com/invite/TVR4efd8ts';
const webplayerUrl = 'https://muzix-webplayer.com/';

const commandCards = [
  { command: '/play', detail: 'start the room', icon: Play, className: 'left-[4%] top-[23%] rotate-[-5deg]' },
  { command: '/queue', detail: 'feel the next drop', icon: ListMusic, className: 'right-[5%] top-[25%] rotate-[6deg]' },
  { command: '/lyrics', detail: 'sing with the server', icon: Music2, className: 'left-[9%] bottom-[22%] rotate-[5deg]' },
  { command: '/filter', detail: 'bass boost rewind', icon: Sparkles, className: 'right-[9%] bottom-[24%] rotate-[-6deg]' },
];

function HeroCommandCard({ card, index, progress, reduced }) {
  const Icon = card.icon;
  const y = useTransform(progress, [0, 1], [0, -95 - index * 16]);
  const x = useTransform(progress, [0, 1], [0, index % 2 === 0 ? -42 : 42]);
  const opacity = useTransform(progress, [0, 0.75, 1], [0.95, 0.62, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.82]);
  const rotate = useTransform(progress, [0, 1], [0, index % 2 === 0 ? -10 : 10]);

  return (
    <motion.div
      style={reduced ? undefined : { y, x, opacity, scale, rotate }}
      className={`absolute hidden w-56 rounded-3xl border border-white/12 bg-black/42 p-4 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-2xl lg:block ${card.className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase text-cyan-100">Discord</span>
        <Icon className="text-pink-200" size={18} />
      </div>
      <p className="font-mono text-2xl font-black text-white">{card.command}</p>
      <p className="mt-1 text-sm font-semibold text-white/48">{card.detail}</p>
    </motion.div>
  );
}

export default function ScrollEditHero() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.88, 0.1]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const timelineWidth = useTransform(scrollYProgress, [0, 1], ['100%', '8%']);

  return (
    <section ref={sectionRef} id="home" className="relative -mt-24 min-h-[185vh] overflow-hidden pt-24">
      <span id="about" className="absolute top-24" />
      <div className="sticky top-0 box-border flex h-screen items-center justify-center px-5 pb-4 pt-24">
        <motion.div
          style={reduced ? undefined : { y: heroY, scale: heroScale, opacity: heroOpacity, filter: heroBlur }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        >
          <motion.div
            style={reduced ? undefined : { rotate: logoRotate }}
            className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/12 bg-white/[0.045] p-3 shadow-[0_0_70px_rgba(236,72,153,0.28)] backdrop-blur-2xl md:h-24 md:w-24"
          >
            <img src="/images/logo.png" alt="Muzix" className="h-full w-full object-contain" />
          </motion.div>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-xs font-black uppercase text-white/72">
            <span className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 backdrop-blur-xl">Premium Discord Music Bot</span>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100 backdrop-blur-xl">Reverse Edit Mode</span>
          </div>

          <h1 className="kinetic-outline text-5xl font-black leading-none text-white md:text-7xl lg:text-7xl">
            MUZIX
          </h1>
          <p className="mt-4 text-lg font-black uppercase text-white/88 md:text-2xl">
            Play. Vibe. Rewind.
          </p>
          <p className="mt-4 max-w-3xl text-2xl font-black leading-tight text-white md:text-3xl lg:text-4xl">
            Muzix turns your Discord server into a live music room.
          </p>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/58 md:text-lg md:leading-8">
            High-quality playback, smart queues, playlists, filters, lyrics, autoplay, and smooth music controls for every server.
          </p>

          <div className="mt-6 flex w-full max-w-3xl flex-col justify-center gap-4 sm:flex-row">
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Invite Muzix to your Discord server"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase text-black shadow-[0_0_34px_rgba(255,255,255,0.22)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Bot size={20} />
              Invite Muzix
            </a>
            <a
              href={webplayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Muzix Webplayer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-200/24 bg-cyan-200/10 px-6 py-4 text-sm font-black uppercase text-white shadow-[0_0_32px_rgba(34,211,238,0.18)] backdrop-blur-xl transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              <ExternalLink size={19} />
              Open Webplayer
            </a>
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Muzix support server"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.045] px-6 py-4 text-sm font-black uppercase text-white/82 backdrop-blur-xl transition-transform hover:scale-[1.02] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Headphones size={19} />
              Support Server
            </a>
          </div>

          <div className="mt-8 w-full max-w-3xl">
            <WaveformRewind progress={scrollYProgress} />
            <div className="mx-auto mt-4 h-px w-full overflow-hidden rounded-full bg-white/10">
              <motion.div style={reduced ? undefined : { width: timelineWidth }} className="h-full bg-[linear-gradient(90deg,#f8fafc,#22d3ee,#ec4899)]" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black uppercase text-white/38">
              <SkipBack size={14} />
              Scroll to rewind the edit
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={reduced ? undefined : { rotate: logoRotate }}
          className="absolute bottom-[9%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-white/10 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.16),rgba(34,211,238,0.22),rgba(236,72,153,0.2),rgba(255,255,255,0.16))] opacity-20 blur-[1px] md:h-96 md:w-96"
        >
          <div className="absolute inset-[18%] rounded-full border border-black/50 bg-black/58" />
          <Disc3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/24" size={64} />
        </motion.div>

        {commandCards.map((card, index) => (
          <HeroCommandCard key={card.command} card={card} index={index} progress={scrollYProgress} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
