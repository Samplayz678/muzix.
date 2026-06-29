import { useEffect, useState } from 'react';

export default function useSimpleScrollMotion() {
  const [simpleMotion, setSimpleMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const queries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(pointer: coarse)'),
    ];

    const update = () => {
      setSimpleMotion(queries.some((query) => query.matches));
    };

    update();
    queries.forEach((query) => query.addEventListener('change', update));

    return () => {
      queries.forEach((query) => query.removeEventListener('change', update));
    };
  }, []);

  return simpleMotion;
}
