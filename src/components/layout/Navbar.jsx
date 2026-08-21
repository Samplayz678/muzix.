import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { INVITE_URL } from '../home/editorialData';

const navLinks = [
  { name: 'Home', to: '/', target: '#home' },
  { name: 'Sound', to: '/', target: '#sound-guide' },
  { name: 'Story', to: '/', target: '#story' },
  { name: 'Features', to: '/', target: '#features' },
  { name: 'Premium', to: '/premium' },
  { name: 'Docs', to: '/docs' },
];

const ease = [0.22, 1, 0.36, 1];

function scrollToTarget(target) {
  if (target === '#home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const element = document.querySelector(target);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const location = useLocation();

  /*
   * Wait until client mount before creating the portal.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Detect page scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
   * Close mobile navbar whenever route changes.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /*
   * Prevent page scrolling while mobile menu is open.
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSectionClick = (event, target) => {
    setIsOpen(false);

    if (!target) return;

    /*
     * Already on homepage:
     * prevent React Router navigation and scroll directly.
     */
    if (location.pathname === '/') {
      event.preventDefault();

      scrollToTarget(target);
    }
  };

  if (!mounted) {
    return null;
  }

  const navbar = (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[99999] w-full px-4">
      <motion.header
        initial={{
          y: -32,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="pointer-events-auto mx-auto max-w-7xl"
      >
        <div
          className={`mt-4 border px-4 py-3 transition-all duration-300 md:px-5 ${
            scrolled
              ? 'border-[#f4f1ea]/14 bg-[#050505]/82 shadow-2xl shadow-black/40 backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <Link
              to="/"
              className="editorial-display inline-flex items-center gap-2 text-2xl font-black uppercase leading-none tracking-normal text-[#f4f1ea] transition-colors hover:text-white"
              onClick={(event) => {
                setIsOpen(false);

                if (location.pathname === '/') {
                  event.preventDefault();

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <img
                src="/images/muzix_new.png"
                alt="Muzix"
                className="h-8 w-8 object-contain"
              />

              Muzix
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => {
                const isRouteActive =
                  !link.target && location.pathname === link.to;

                const isHomeActive =
                  link.target === '#home' &&
                  location.pathname === '/';

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    state={
                      link.target
                        ? {
                            scrollTarget: link.target,
                          }
                        : undefined
                    }
                    onClick={(event) =>
                      handleSectionClick(event, link.target)
                    }
                    className={`text-xs font-semibold uppercase transition-colors ${
                      isRouteActive || isHomeActive
                        ? 'text-[#f4f1ea]'
                        : 'text-[#f4f1ea]/58 hover:text-[#f4f1ea]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#f4f1ea]/35 px-4 py-2 text-xs font-bold uppercase text-[#f4f1ea] transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                Invite Bot

                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={
                isOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={isOpen}
              onClick={() => {
                setIsOpen((open) => !open);
              }}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#f4f1ea]/20 text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] md:hidden"
            >
              {isOpen ? (
                <X
                  size={22}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={22}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.22,
                ease,
              }}
              className="mt-2 border border-[#f4f1ea]/14 bg-[#050505]/94 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    state={
                      link.target
                        ? {
                            scrollTarget: link.target,
                          }
                        : undefined
                    }
                    onClick={(event) =>
                      handleSectionClick(event, link.target)
                    }
                    className="border-b border-[#f4f1ea]/10 py-4 text-sm font-bold uppercase text-[#f4f1ea]/72 transition-colors hover:text-[#f4f1ea]"
                  >
                    {link.name}
                  </Link>
                ))}

                <a
                  href={INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border border-[#f4f1ea] bg-[#f4f1ea] px-5 py-3 text-sm font-bold uppercase text-[#050505]"
                >
                  Invite Bot

                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );

  /*
   * IMPORTANT:
   * Render directly inside document.body.
   *
   * This prevents transformed/animated parents from
   * interfering with position: fixed.
   */
  return createPortal(navbar, document.body);
}
