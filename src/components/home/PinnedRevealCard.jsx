import { ArrowUpRight, Headphones } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GrainOverlay from './GrainOverlay';
import ShaderGradientBackground from './ShaderGradientBackground';
import useSimpleScrollMotion from '../../hooks/useSimpleScrollMotion';

function RevealLetter({ char, index, total, progress, invert = false }) {
  const start = 0.08 + (index / Math.max(total, 1)) * 0.28;
  const end = Math.min(start + 0.1, 0.62);
  const opacity = useTransform(progress, [start, end], [0.46, 1]);
  const y = useTransform(progress, [start, end], ['0.42em', '0em']);

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, y }}
      className={`inline-block will-change-transform ${invert ? 'text-[#050505]' : 'text-white'}`}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

function RevealWord({ word, startIndex, total, progress, invert = false }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {Array.from(word).map((char, index) => (
        <RevealLetter
          key={`${word}-${startIndex + index}-${char}`}
          char={char}
          index={startIndex + index}
          total={total}
          progress={progress}
          invert={invert}
        />
      ))}
    </span>
  );
}

function getWordSegments(text) {
  let letterIndex = 0;
  const tokens = text.match(/\S+|\s+/g) ?? [];

  return tokens.map((token, index) => {
    if (/^\s+$/.test(token)) {
      return { key: `space-${index}`, type: 'space' };
    }

    const segment = {
      key: `${token}-${index}`,
      type: 'word',
      word: token,
      startIndex: letterIndex,
    };
    letterIndex += Array.from(token).length;

    return segment;
  });
}

function ProgressText({ text, progress, className = '', invert = false, simple = false }) {
  const segments = getWordSegments(text);
  const totalLetters = Array.from(text.replace(/\s+/g, '')).length;

  if (simple) {
    return (
      <motion.p
        aria-label={text}
        className={className}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <p aria-label={text} className={className}>
      {segments.map((segment) => {
        if (segment.type === 'space') {
          return <span key={segment.key}> </span>;
        }

        return (
          <RevealWord
            key={segment.key}
            word={segment.word}
            startIndex={segment.startIndex}
            total={totalLetters}
            progress={progress}
            invert={invert}
          />
        );
      })}
    </p>
  );
}

function RevealGridItem({ item, index, total, progress, invert = false, simple = false }) {
  const start = 0.2 + (index / Math.max(total, 1)) * 0.22;
  const end = Math.min(start + 0.14, 0.78);
  const opacity = useTransform(progress, [start, end], [0.62, 1]);
  const y = useTransform(progress, [start, end], ['20px', '0px']);
  const scale = useTransform(progress, [start, end], [0.97, 1]);

  const motionStyle = simple ? { opacity: 1, y: 0, scale: 1 } : { opacity, y, scale };

  return (
    <motion.article
      style={motionStyle}
      className={`flex h-full min-h-32 flex-col justify-between border p-4 transition-colors duration-300 sm:min-h-36 md:min-h-[10rem] lg:p-6 ${
        invert
          ? 'border-[#050505]/20 bg-[#f4f1ea] text-[#050505] hover:bg-white'
          : 'border-white/14 bg-white/[0.035] text-white hover:border-accent-primary/70 hover:bg-accent-primary/10'
      }`}
    >
      <span className={`editorial-label text-[0.62rem] uppercase ${invert ? 'text-[#050505]/45' : 'text-white/42'}`}>
        {item.kicker || item.command || item.label}
      </span>
      <div className="mt-auto pt-5 sm:pt-6 lg:pt-8">
        <h3 className="editorial-display break-words text-xl font-black uppercase leading-none tracking-normal sm:text-2xl md:text-3xl lg:text-4xl">
          {item.title || item.command}
        </h3>
        <p className={`mt-3 hidden text-sm leading-6 sm:block md:text-base md:leading-7 lg:text-lg lg:leading-8 ${invert ? 'text-[#050505]/68' : 'text-white/68'}`}>
          {item.body || item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function PinnedRevealCard({
  id,
  eyebrow,
  title,
  body,
  items = [],
  theme = 'dark',
  actions,
  overlap = true,
  final = false,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const { scrollYProgress: pinProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const invert = theme === 'light';
  const y = useTransform(enterProgress, [0, 1], ['20vh', '0vh']);
  const scale = useTransform(enterProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(enterProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(enterProgress, [0, 1], ['40px', '0px']);
  const actionOpacity = useTransform(pinProgress, [0.38, 0.58], [0, 1]);
  const actionY = useTransform(pinProgress, [0.38, 0.58], ['28px', '0px']);
  const shadow = invert
    ? 'shadow-[0_-26px_96px_rgba(255,59,48,0.2),0_34px_120px_rgba(0,0,0,0.44)]'
    : 'shadow-[0_-26px_96px_rgba(255,59,48,0.18),0_34px_120px_rgba(0,0,0,0.62)]';
  const stableMotion = reducedMotion || simpleScrollMotion;
  const cardMotionStyle = stableMotion
    ? { y: 0, scale: 1, opacity: 1, borderRadius: 0 }
    : { y, scale, opacity, borderRadius: radius };
  const actionMotionStyle = stableMotion
    ? { opacity: 1, y: 0 }
    : { opacity: actionOpacity, y: actionY };
  const sectionHeight = stableMotion
    ? 'min-h-[132vh] [min-height:132svh]'
    : final
      ? 'min-h-[210vh] [min-height:210svh] md:min-h-[220vh]'
      : 'min-h-[230vh] [min-height:230svh] md:min-h-[240vh]';

  return (
    <section
      ref={ref}
      id={id}
      className={`pinned-reveal-section relative ${sectionHeight} ${overlap ? '-mt-[10vh] md:-mt-[16vh]' : ''}`}
    >
      <div className="pinned-reveal-sticky">
        <motion.div
          style={cardMotionStyle}
          className={`relative h-full overflow-hidden will-change-transform ${shadow} ${
            invert
              ? 'bg-[#f4f1ea] text-[#050505]'
              : 'bg-[#020202] text-white'
          }`}
        >
          {!invert && (
            <>
              <ShaderGradientBackground variant="midu" intensity="midu" className="opacity-100" />
              <GrainOverlay />
            </>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-current/25 shadow-[0_24px_54px_rgba(0,0,0,0.55)]" />
          <div className="relative z-10 mx-auto flex h-full max-w-[118rem] flex-col px-5 pb-5 pt-16 sm:px-8 sm:pt-20 md:px-12 md:pt-24 lg:px-14 lg:pb-8 lg:pt-24 xl:pt-28">
            <div className="grid shrink-0 gap-6 md:grid-cols-[0.56fr_0.44fr] md:items-start lg:gap-8">
              <div>
                <p className={`editorial-label mb-5 text-xs uppercase ${invert ? 'text-[#050505]/52' : 'text-white/48'}`}>
                  {eyebrow}
                </p>
                <h2 className="editorial-display max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-normal sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]">
                  {title}
                </h2>
              </div>

              <div className="md:pt-8 lg:pt-8">
                <ProgressText
                  text={body}
                  progress={pinProgress}
                  invert={invert}
                  simple={stableMotion}
                  className={`max-w-2xl text-lg font-semibold leading-8 md:text-xl md:leading-9 lg:text-[1.28rem] lg:leading-9 xl:text-[1.42rem] xl:leading-10 ${
                    invert ? 'text-[#050505]' : 'text-white'
                  }`}
                />

                {actions && (
                  <motion.div
                    style={actionMotionStyle}
                    className="mt-9 flex flex-col gap-3 sm:flex-row"
                  >
                    {actions.map((action) => (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-sm font-black uppercase transition-colors ${
                          action.primary
                            ? 'border-white bg-white text-[#050505] hover:bg-accent-primary hover:text-white'
                            : 'border-current/30 hover:border-accent-primary hover:text-accent-primary'
                        }`}
                      >
                        {action.primary ? <Headphones size={17} aria-hidden="true" /> : null}
                        {action.label}
                        {!action.primary ? <ArrowUpRight size={16} aria-hidden="true" /> : null}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="mt-auto grid auto-rows-fr grid-cols-2 items-stretch border-l border-t border-current/16 lg:grid-cols-4">
                {items.map((item, index) => (
                  <RevealGridItem
                    key={`${item.title || item.command}-${index}`}
                    item={item}
                    index={index}
                    total={items.length}
                    progress={pinProgress}
                    invert={invert}
                    simple={stableMotion}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
