import { useEffect, useState } from 'react';

export default function useSimpleScrollMotion() {
  const [simpleMotion, setSimpleMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const queries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(max-height: 760px)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(hover: none)'),
    ];

    const update = () => {
      setSimpleMotion(queries.some((query) => query.matches));
    };
    const addQueryListener = (query) => {
      if (query.addEventListener) {
        query.addEventListener('change', update);
        return;
      }

      query.addListener?.(update);
    };
    const removeQueryListener = (query) => {
      if (query.removeEventListener) {
        query.removeEventListener('change', update);
        return;
      }

      query.removeListener?.(update);
    };

    update();
    queries.forEach(addQueryListener);

    return () => {
      queries.forEach(removeQueryListener);
    };
  }, []);

  return simpleMotion;
}
