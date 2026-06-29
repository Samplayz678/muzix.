import { useReducedMotion } from 'framer-motion';

export default function GrainOverlay({ animated = false, className = '', fixed = false }) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 z-[1] opacity-[0.28] mix-blend-overlay [contain:strict] ${className}`}
    >
      <div
        className={`rewind-grain absolute inset-[-20%] h-[140%] w-[140%] ${shouldAnimate ? '' : 'rewind-grain-static'}`}
      />
    </div>
  );
}
