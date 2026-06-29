import { ArrowDown, Headphones } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { INVITE_URL, SUPPORT_URL } from './editorialData';
import ShaderGradientBackground from './ShaderGradientBackground';

export default function MiduStyleHero() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const lettersY = useTransform(scrollYProgress, [0, 1], ['0vh', '-8vh']);
  const fade = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0.35]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate -mt-24 h-screen min-h-[720px] overflow-hidden bg-[#030303] px-5 pb-0 pt-32 text-white sm:px-8 md:px-10 md:pt-36"
    >
      <ShaderGradientBackground
        variant="heroRedShader"
        intensity="heroRedShader"
        fallback={false}
        priority
        className="opacity-100"
        canvasClassName="hero-water-shader-canvas mix-blend-screen"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[118rem] flex-col pb-[25vh] sm:pb-[26vh] md:pb-[28vh] lg:pb-[30vh]">
        <div className="grid gap-8 pt-6 text-sm font-semibold text-white/68 md:grid-cols-3">
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors hover:text-white"
          >
            <img src="/images/muzix_new.png" alt="" className="h-8 w-8 object-contain" />
            <span>Get support</span>
          </a>
          <span className="hidden md:block">Global Discord music bot</span>
          <a
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden w-fit items-center gap-2 justify-self-end rounded-full bg-white px-5 py-3 font-black text-black transition-colors hover:bg-accent-primary hover:text-white md:inline-flex"
          >
            <Headphones size={16} aria-hidden="true" />
            Invite bot
          </a>
        </div>

        <div className="grid flex-1 items-start gap-10 py-10 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:py-14 lg:pt-20 xl:pt-24">
          <div className="max-w-[16rem] self-start text-sm font-semibold md:pt-12 lg:pt-16">
            <p className="text-white/70">Discord, worldwide</p>
            <p className="text-white/90 mt-3 text-base font-bold leading-7">
              Queue, filters, lyrics, autoplay
            </p>
            <p className="text-white/70 mt-3">High-quality playback</p>
          </div>

          <div className="w-full max-w-[44rem] justify-self-start md:justify-self-end xl:mr-[2vw]">
            <h1 className="text-white text-4xl font-black leading-[0.96] tracking-normal sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              Music for servers that want to sound alive.
            </h1>
            <p className="text-white/85 mt-6 max-w-[40rem] text-lg font-semibold leading-8 md:text-xl md:leading-9">
              We craft playback that turns voice channels into rooms people trust - clear sound, smart queues, and controls that stay in Discord.
            </p>
            <div className="mt-8 flex justify-start md:justify-end">
              <span className="text-white/70 inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
                Scroll to explore <ArrowDown size={15} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        style={reducedMotion ? undefined : { y: lettersY, opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-[2vh] z-[6] select-none overflow-hidden px-5 sm:px-8 md:px-10"
      >
        <svg className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </svg>
        <div className="relative mx-auto max-w-[118rem]">
          <p
            aria-hidden="true"
            data-text="Muzix"
            className="hero-wordmark-letter wavy-watermark editorial-display relative whitespace-nowrap font-black uppercase leading-[0.66] tracking-normal"
          >
            Muzix
          </p>
        </div>
      </motion.div>
    </section>
  );
}
