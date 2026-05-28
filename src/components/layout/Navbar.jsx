import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '@react-three/drei';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Stats', href: '#stats' },
  { name: 'Premium', href: '/premium' },
  { name: 'Docs', href: '/docs' },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { active } = useProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[90] flex justify-center pointer-events-none px-4">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: active ? -60 : 0,
          opacity: active ? 0 : 1,
        }}
        transition={{ duration: 0.7, ease }}
        className="pointer-events-auto w-full overflow-visible"
      >
        <div className="w-full flex justify-center">
          <motion.div
            animate={{
              width: scrolled ? '900px' : '100%',
              marginTop: scrolled ? '24px' : '0px',
              borderRadius: scrolled ? '9999px' : '0px',
              paddingTop: scrolled ? '12px' : '24px',
              paddingBottom: scrolled ? '12px' : '24px',
              backgroundColor: scrolled ? 'rgba(17,17,17,0.8)' : 'rgba(0,0,0,0)',
              boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5)' : '0 0px 0px rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.5, ease }}
            style={{ backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)', maxWidth: '100%' }}
            className="ring-1 ring-white/[0.07]"
          >
          <div
            className="mx-auto flex items-center justify-between px-6 md:px-10 max-w-7xl"
          >
            {/* Logo */}
            <Link to="/" className="text-3xl font-black tracking-tight text-white flex items-center gap-1">
              MU<span className="text-gradient">ZIX</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const isHash = link.href.startsWith('#');
                const targetPath = isHash ? `/${link.href}` : link.href;

                const handleNavClick = (e) => {
                  if (isHash && location.pathname === '/') {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                };

                return (
                  <Link
                    key={link.name}
                    to={targetPath}
                    onClick={handleNavClick}
                    className={`text-[1.1rem] font-semibold transition-colors relative group ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent-primary transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/30 hover:bg-red-500 hover:shadow-accent-primary/50 transition-all duration-300 transform hover:scale-105"
              >
                Invite Bot
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          </motion.div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
              className="mx-4 mt-2 rounded-3xl bg-[#111111]/95 backdrop-blur-xl border border-white/10 shadow-2xl py-6 flex flex-col items-center gap-6 md:hidden origin-top"
            >
              {navLinks.map((link) => {
                const isHash = link.href.startsWith('#');
                const targetPath = isHash ? `/${link.href}` : link.href;

                return (
                  <Link
                    key={link.name}
                    to={targetPath}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (isHash && location.pathname === '/') {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xl font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-8 py-3 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/30"
              >
                Invite Bot
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
