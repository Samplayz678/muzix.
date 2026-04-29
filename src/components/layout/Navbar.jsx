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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { active } = useProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!active && (
        <div className="fixed top-0 left-0 w-full z-[90] flex justify-center pointer-events-none px-4 pt-0">
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full overflow-visible ${scrolled
              ? 'mt-6 max-w-[900px] bg-[#111111]/80 backdrop-blur-2xl ring-1 ring-white/10 rounded-full py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
              : 'mt-0 max-w-[2560px] bg-transparent py-6 rounded-none ring-0 ring-transparent'
              }`}
          >
            <div
              className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full ${scrolled ? 'px-6 md:px-8' : 'px-6 md:px-12 max-w-7xl'
                }`}
            >

              {/* Logo */}
              <Link to="/" className="text-3xl font-black tracking-tight text-white flex items-center gap-1">
                MU<span className="text-gradient">ZIX</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href || location.pathname === link.href.replace('.html', '');
                  const isHash = link.href.startsWith('#');
                  const targetPath = isHash ? `/${link.href}` : link.href.replace('.html', '');

                  const handleNavClick = (e) => {
                    if (isHash && location.pathname === '/') {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
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
                      <span className={`absolute left-0 -bottom-1 h-0.5 bg-accent-primary transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
              <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute top-full left-0 w-full mt-4 rounded-3xl bg-[#111111]/95 backdrop-blur-xl border border-white/10 shadow-2xl py-6 flex flex-col items-center gap-6 md:hidden origin-top"
                >
                  {navLinks.map((link) => {
                    const isHash = link.href.startsWith('#');
                    const targetPath = isHash ? `/${link.href}` : link.href.replace('.html', '');

                    const handleMobileNavClick = (e) => {
                      setIsOpen(false);
                      if (isHash && location.pathname === '/') {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    };

                    return (
                      <Link
                        key={link.name}
                        to={targetPath}
                        onClick={handleMobileNavClick}
                        className="text-xl font-bold text-gray-300 hover:text-white"
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
      )}
    </AnimatePresence>
  );
}
