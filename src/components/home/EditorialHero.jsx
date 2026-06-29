import { useRef } from 'react';
import { ArrowUpRight, Headphones, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ShaderGradientBackground from './ShaderGradientBackground';
import { INVITE_URL, SUPPORT_URL, WEBPLAYER_URL } from './editorialData';

const ease = [0.22, 1, 0.36, 1];

export default function EditorialHero() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0px', '-72px']);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const eyebrowX = useTransform(scrollYProgress, [0, 1], ['0px', '-42px']);
  const detailX = useTransform(scrollYProgress, [0, 1], ['0px', '56px']);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative -mt-24 min-h-screen overflow-hidden bg-[#050505] px-5 pb-16 pt-32 text-[#f4f1ea] sm:px-8 md:px-10 md:pt-36"
    >
      <ShaderGradientBackground
        variant="hero"
        intensity="soft"
        className="opacity-90"
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(5,5,5,0.16),rgba(5,5,5,0.82)_88%,#050505_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-[linear-gradient(0deg,#050505,transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-between">
        <motion.div
          style={prefersReducedMotion ? undefined : { x: eyebrowX }}
          className="flex flex-col gap-4 border-b border-[#f4f1ea]/15 pb-6 text-xs uppercase text-[#f4f1ea]/70 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="inline-flex items-center gap-3">
            <img src="/images/muzix_new.png" alt="" className="h-9 w-9 object-contain" />
            <span className="editorial-label">D I S C O R D&nbsp;&nbsp; M U S I C&nbsp;&nbsp; S Y S T E M</span>
          </span>
          <span className="text-[#f4f1ea]/55">High-quality playback for shared voice rooms</span>
        </motion.div>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div>
            <motion.h1
              style={prefersReducedMotion ? undefined : { y: titleY, scale: titleScale }}
              initial={{ opacity: 0, filter: 'blur(18px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease }}
              className="editorial-display text-[4.5rem] font-black uppercase leading-[0.78] tracking-normal text-[#f4f1ea] sm:text-[7rem] md:text-[9rem] lg:text-[12rem]"
            >
              Muzix
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8, ease }}
              className="mt-8 max-w-3xl"
            >
              <p className="editorial-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl">
                Discord music, refined.
              </p>
              <p className="mt-4 text-xl leading-relaxed text-[#f4f1ea]/72 md:text-2xl">
                Play. Queue. Filter. Rewind. Your server&apos;s sound system, built for community listening.
              </p>
            </motion.div>
          </div>

          <motion.aside
            style={prefersReducedMotion ? undefined : { x: detailX }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease }}
            className="border-l border-[#f4f1ea]/15 pl-0 lg:pl-8"
          >
            <div className="border-y border-[#f4f1ea]/15 py-7">
              <p className="editorial-label mb-4 text-xs uppercase text-accent-primary/80">L I V E&nbsp;&nbsp; R O O M</p>
              <p className="max-w-md text-lg leading-8 text-[#f4f1ea]/76 md:text-xl md:leading-9">
                Muzix brings high-quality playback, smart queues, playlists, filters, lyrics, autoplay, and smooth controls directly into Discord.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invite Muzix to your Discord server"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f4f1ea] bg-[#f4f1ea] px-6 py-3 text-sm font-bold uppercase text-[#050505] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                <Headphones size={18} aria-hidden="true" />
                Invite Muzix
              </a>
              <a
                href={WEBPLAYER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Muzix Webplayer"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f4f1ea]/35 bg-transparent px-6 py-3 text-sm font-bold uppercase text-[#f4f1ea] transition-colors duration-300 hover:border-accent-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                Open Webplayer
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm uppercase text-[#f4f1ea]/58 transition-colors hover:text-[#f4f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Support Server
            </a>
          </motion.aside>
        </div>

        <div className="grid gap-3 border-t border-[#f4f1ea]/15 pt-5 text-xs uppercase text-[#f4f1ea]/50 sm:grid-cols-3">
          <span>Playback / Queue / Filters</span>
          <span className="sm:text-center">Playlists / Favourites / Lyrics</span>
          <span className="sm:text-right">Autoplay / Server Controls</span>
        </div>
      </div>
    </section>
  );
}
