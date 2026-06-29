import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function ScrollStackSection({
  children,
  index,
  isFirst = false,
  isLast = false,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.34, 0.68, 1],
    isFirst ? ['0vh', '0vh', '0vh', '-7vh'] : ['24vh', '0vh', '0vh', isLast ? '0vh' : '-7vh']
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.34, 0.68, 1],
    isFirst ? [1, 1, 1, 0.94] : [0.975, 1, 1, isLast ? 1 : 0.94]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.34, 0.68, 1],
    isFirst ? [1, 1, 1, 0.58] : [0.92, 1, 1, isLast ? 1 : 0.58]
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.34, 0.68, 1],
    isFirst ? ['0px', '0px', '0px', '12px'] : ['18px', '0px', '0px', isLast ? '0px' : '12px']
  );
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.34],
    isFirst
      ? ['inset(0% 0% 0% 0% round 0px)', 'inset(0% 0% 0% 0% round 0px)']
      : ['inset(9% 0% 0% 0% round 18px)', 'inset(0% 0% 0% 0% round 0px)']
  );
  const blur = useTransform(
    scrollYProgress,
    [0.68, 1],
    isLast ? ['0px', '0px'] : ['0px', '3.5px']
  );
  const blurFilter = useTransform(blur, (value) => `blur(${value})`);
  const darken = useTransform(
    scrollYProgress,
    [0.68, 1],
    isLast ? [0, 0] : [0, 0.28]
  );
  const enterGlow = useTransform(scrollYProgress, [0, 0.34, 0.68], [0.34, 0.14, 0]);
  const topEdge = useTransform(scrollYProgress, [0, 0.34, 0.68], [0.42, 0.18, 0]);

  return (
    <section
      ref={ref}
      className={`relative ${isLast ? 'h-[188vh] -mb-[94vh]' : 'h-[132vh]'} ${isFirst ? '' : '-mt-[18vh]'}`}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={
          reducedMotion
            ? { zIndex: index + 1 }
            : {
                y,
                scale,
                opacity,
                borderRadius: radius,
                clipPath,
                filter: blurFilter,
                zIndex: index + 1,
              }
        }
        className="sticky top-0 h-screen overflow-hidden bg-[#050505] shadow-[0_-36px_110px_rgba(0,0,0,0.42),0_-18px_72px_rgba(255,59,48,0.18),0_34px_100px_rgba(0,0,0,0.48)] will-change-transform"
      >
        <motion.div
          aria-hidden="true"
          style={reducedMotion ? undefined : { opacity: topEdge }}
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-[#f4f1ea]/70 shadow-[0_22px_54px_rgba(0,0,0,0.72)]"
        />
        <motion.div
          aria-hidden="true"
          style={reducedMotion ? undefined : { opacity: enterGlow }}
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28 bg-[linear-gradient(180deg,rgba(255,59,48,0.2),transparent)]"
        />
        <motion.div
          aria-hidden="true"
          style={reducedMotion ? undefined : { opacity: darken }}
          className="pointer-events-none absolute inset-0 z-40 bg-black"
        />
        <div className="relative z-10 min-h-screen [&>section]:min-h-screen">{children}</div>
      </motion.div>
    </section>
  );
}
