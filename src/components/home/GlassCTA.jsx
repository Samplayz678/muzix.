import { motion, useReducedMotion } from 'framer-motion';
import { Bot, ExternalLink, Headphones, SkipBack } from 'lucide-react';

const inviteUrl = 'https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands';
const supportUrl = 'https://discord.com/invite/TVR4efd8ts';
const webplayerUrl = 'https://muzix-webplayer.com/';

export default function GlassCTA() {
  const reduced = useReducedMotion();

  return (
    <section id="final-cta" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -80, scale: 1.08, filter: 'blur(10px)' }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/12 bg-black/44 px-5 py-10 text-center shadow-[0_0_90px_rgba(124,58,237,0.18)] backdrop-blur-2xl md:px-12 md:py-14"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)]" />
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.055] text-cyan-100">
          <SkipBack size={28} />
        </div>
        <p className="text-xs font-black uppercase text-cyan-100/70">rewound to the first beat</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
          Ready to make your server sound alive?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/56 md:text-lg">
          Invite Muzix and give your Discord community high-quality playback, smart queues, playlists, favourites, filters, lyrics, and autoplay.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Invite Muzix bot"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black uppercase text-black shadow-[0_0_34px_rgba(255,255,255,0.22)] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Bot size={20} />
            Invite Bot
          </a>
          <a
            href={webplayerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Muzix Webplayer"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-200/24 bg-cyan-200/10 px-7 py-4 text-sm font-black uppercase text-white shadow-[0_0_32px_rgba(34,211,238,0.18)] backdrop-blur-xl transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          >
            <ExternalLink size={19} />
            Open Webplayer
          </a>
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Muzix support server"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.045] px-7 py-4 text-sm font-black uppercase text-white/82 backdrop-blur-xl transition-transform hover:scale-[1.02] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Headphones size={19} />
            Support Server
          </a>
        </div>
      </motion.div>
    </section>
  );
}
