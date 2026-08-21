import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    let hideTimer;

    // Prevent scrolling while preloader is visible
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const tick = window.setInterval(() => {
      value = Math.min(100, value + 1);
      setProgress(value);

      if (value >= 100) {
        window.clearInterval(tick);

        hideTimer = window.setTimeout(() => {
          setShow(false);
          document.body.style.overflow = previousOverflow;
        }, 320);
      }
    }, 22);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(hideTimer);

      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!show) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: 'easeInOut',
          }}
          className="fixed inset-0 z-[999999] overflow-hidden bg-[#050505] text-[#f4f1ea]"
        >
          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_62%_at_50%_100%,rgba(255,59,48,0.62),rgba(78,4,7,0.5)_34%,transparent_66%),linear-gradient(180deg,#020202_0%,#050000_58%,#1b0304_100%)]" />

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_74%_42%_at_52%_100%,rgba(255,209,200,0.46),transparent_58%)] mix-blend-screen" />

          {/* LARGE BACKGROUND MUZIX */}
          <div className="absolute inset-x-0 bottom-[-7vw] z-0 select-none overflow-hidden text-center md:bottom-[-9vw]">
            <span className="editorial-display text-[30vw] font-black uppercase leading-none text-white/[0.09]">
              Muzix
            </span>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8 md:px-10">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-white/12 pb-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/muzix_new.png"
                  alt=""
                  className="h-9 w-9 object-contain"
                />

                <span className="editorial-display text-2xl font-black uppercase leading-none text-white">
                  Muzix
                </span>
              </div>

              <span className="editorial-label text-[0.65rem] font-bold uppercase text-white/54">
                Loading route
              </span>
            </div>

            {/* MAIN */}
            <div className="mx-auto flex w-full max-w-[118rem] flex-1 flex-col justify-center pb-[20vh] pt-12 sm:pb-[22vh] md:pb-[24vh]">
              <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
                <div>
                  <p className="editorial-label mb-5 text-xs uppercase text-white/54">
                    D I S C O R D&nbsp;&nbsp; M U S I C&nbsp;&nbsp; B O T
                  </p>

                  <h2 className="editorial-display max-w-5xl text-6xl font-black uppercase leading-[0.86] text-white sm:text-7xl md:text-8xl lg:text-[8rem]">
                    Sound is loading.
                  </h2>
                </div>

                {/* PROGRESS */}
                <div className="lg:justify-self-end">
                  <div className="editorial-display text-[5.5rem] font-black uppercase leading-none text-white sm:text-[7rem] md:text-[9rem]">
                    {String(progress).padStart(3, '0')}
                  </div>

                  <div className="mt-5 h-2 w-full overflow-hidden bg-white/12 lg:w-[26rem]">
                    <motion.div
                      className="h-full bg-[#ff3b30]"
                      initial={{ width: '0%' }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        duration: 0.16,
                        ease: 'easeOut',
                      }}
                    />
                  </div>

                  <p className="mt-4 text-base font-semibold text-white/64">
                    Preparing the Muzix interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
