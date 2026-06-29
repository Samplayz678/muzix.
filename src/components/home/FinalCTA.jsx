import { useRef } from 'react';
import { ArrowUpRight, Headphones } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ShaderGradientBackground from './ShaderGradientBackground';
import ScrollAlphabetReveal from './ScrollAlphabetReveal';
import { INVITE_URL, WEBPLAYER_URL } from './editorialData';

const ease = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 88%', 'end 46%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.32, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['72px', '0px']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.45, 1], ['blur(18px)', 'blur(0px)', 'blur(0px)']);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mb-24 overflow-hidden bg-[#050505] px-5 py-24 text-[#f4f1ea] sm:px-8 md:px-10 lg:-mb-36 lg:py-36"
    >
      <ShaderGradientBackground
        variant="cta"
        intensity="quiet"
        className="opacity-80"
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_15%,rgba(244,241,234,0.08),transparent_34%),linear-gradient(180deg,#050505_0%,rgba(5,5,5,0.62)_45%,#050505_100%)]" />

      <motion.div
        style={reducedMotion ? undefined : { opacity, y, scale, filter: blur }}
        transition={{ duration: 0.82, ease }}
        className="relative z-10 mx-auto max-w-7xl border-y border-[#f4f1ea]/15 py-14"
      >
        <div className="mb-8 flex items-center gap-4">
          <img src="/images/muzix_new.png" alt="" className="h-12 w-12 object-contain" />
          <p className="editorial-label text-xs uppercase text-accent-primary/75">F I N A L&nbsp;&nbsp; C H O R U S</p>
        </div>
        <h2 className="editorial-display max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-6xl md:text-8xl lg:text-9xl">
          Ready to make your server sound alive?
        </h2>
        <ScrollAlphabetReveal
          text="Invite Muzix and turn your Discord server into a shared music room."
          className="mt-8 max-w-3xl text-2xl leading-10 text-[#f4f1ea]/76 md:text-3xl md:leading-[3rem]"
          offset={['start 88%', 'end 48%']}
        />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Invite Muzix bot to your Discord server"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f4f1ea] bg-[#f4f1ea] px-7 py-3 text-sm font-bold uppercase text-[#050505] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
          >
            <Headphones size={18} aria-hidden="true" />
            Invite Bot
          </a>
          <a
            href={WEBPLAYER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Muzix Webplayer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f4f1ea]/35 px-7 py-3 text-sm font-bold uppercase text-[#f4f1ea] transition-colors duration-300 hover:border-accent-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
          >
            Open Webplayer
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
