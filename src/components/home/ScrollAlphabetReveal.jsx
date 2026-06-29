import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import useSimpleScrollMotion from '../../hooks/useSimpleScrollMotion';

function AnimatedLetter({ char, index, total, progress }) {
  const rangeStart = total <= 1 ? 0 : (index / total) * 0.82;
  const rangeEnd = Math.min(rangeStart + 0.12, 1);
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.08, 1]);
  const y = useTransform(progress, [rangeStart, rangeEnd], ['0.75em', '0em']);
  const blur = useTransform(progress, [rangeStart, rangeEnd], ['blur(8px)', 'blur(0px)']);

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, y, filter: blur }}
      className="inline-block will-change-transform"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

function AnimatedWord({ word, startIndex, total, progress }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {Array.from(word).map((char, index) => (
        <AnimatedLetter
          key={`${word}-${startIndex + index}-${char}`}
          char={char}
          index={startIndex + index}
          total={total}
          progress={progress}
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

export default function ScrollAlphabetReveal({
  text,
  className = '',
  offset = ['start 84%', 'end 36%'],
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const segments = getWordSegments(text);
  const totalLetters = Array.from(text.replace(/\s+/g, '')).length;

  if (reducedMotion || simpleScrollMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} aria-label={text} className={className}>
      {segments.map((segment) => {
        if (segment.type === 'space') {
          return <span key={segment.key}> </span>;
        }

        return (
          <AnimatedWord
            key={segment.key}
            word={segment.word}
            startIndex={segment.startIndex}
            total={totalLetters}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}
