import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Preloader() {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // If progress reaches 100 or is no longer active, fade out the loader.
    if (!active && progress === 100) {
      setTimeout(() => setShow(false), 500); // Give it a slight delay to feel smooth
    }
  }, [active, progress]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] backdrop-blur-3xl"
        >
          <div className="flex flex-col items-center">
            {/* Logo Container */}
            <div className="relative mb-8 flex items-center justify-center w-24 h-24">
              <img 
                src="/images/muzix_new.png" 
                alt="Muzix" 
                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              />
            </div>

            {/* Brand Text */}
            <div className="text-white text-3xl font-bold tracking-widest uppercase mb-6" style={{ letterSpacing: '8px' }}>
              Muzix
            </div>

            {/* Original CSS Spinner matching index.html */}
            <div className="w-12 h-12 border-[3px] border-white/10 border-t-accent-primary rounded-full animate-spin mb-4"></div>

            {/* Status Text */}
            <div className="text-gray-400 font-medium tracking-[0.3em] uppercase text-sm animate-pulse">
              Loading
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
