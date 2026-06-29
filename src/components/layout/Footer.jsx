import { ArrowUpRight, Headphones } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { INVITE_URL } from '../home/editorialData';
import GrainOverlay from '../home/GrainOverlay';
import ShaderGradientBackground from '../home/ShaderGradientBackground';

const footerColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/', target: '#home' },
      { label: 'About', to: '/', target: '#about' },
      { label: 'Sound guide', to: '/', target: '#sound-guide' },
      { label: 'Commands', to: '/', target: '#features' },
      { label: 'Premium', to: '/premium' },
      { label: 'Docs', to: '/docs' },
    ],
  },
  {
    title: 'Bot features',
    links: [
      { label: 'High-quality playback', to: '/', target: '#sound-guide' },
      { label: 'Smart queue', to: '/', target: '#overlap' },
      { label: 'Audio filters', to: '/', target: '#features' },
      { label: 'Lyrics', to: '/', target: '#features' },
      { label: 'Autoplay', to: '/', target: '#timeline' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Support Server', href: 'https://discord.com/invite/TVR4efd8ts', external: true },
      { label: 'Vote on Top.gg', href: 'https://top.gg/bot/1328272164423729233/vote', external: true },
      { label: 'Invite Bot', href: INVITE_URL, external: true },
    ],
  },
];

function scrollToTarget(target) {
  if (target === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

function FooterLink({ link, isHome, navigate }) {
  const className =
    'relative z-20 inline-flex min-h-9 items-center gap-1 py-1 text-xs font-bold uppercase leading-5 text-white/44 transition-colors hover:text-white';

  if (link.to) {
    return (
      <Link
        to={link.to}
        state={link.target ? { scrollTarget: link.target } : undefined}
        onClick={(event) => {
          if (!link.target) return;
          if (isHome) {
            event.preventDefault();
            scrollToTarget(link.target);
            return;
          }
          event.preventDefault();
          navigate(link.to, { state: { scrollTarget: link.target } });
        }}
        className={className}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noreferrer' : undefined}
      className={className}
    >
      {link.label}
      {link.external && (
        <ArrowUpRight
          size={15}
          className="opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const isHome = location.pathname === '/';
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 82%'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['14vh', '0vh']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.84, 1, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], ['34px', '0px']);

  return (
    <motion.footer
      ref={ref}
      style={reducedMotion ? undefined : { borderTopLeftRadius: radius, borderTopRightRadius: radius }}
      className={`relative z-30 min-h-[88vh] overflow-hidden bg-[#020202] px-5 text-white shadow-[0_-34px_120px_rgba(20,4,4,0.35)] sm:px-8 md:px-10 ${
        isHome ? '-mt-[42vh] pt-10 lg:pt-8' : 'mt-0 pt-14 lg:pt-16'
      }`}
    >
      <ShaderGradientBackground variant="miduFooter" intensity="footerMidu" staticOnly />
      <GrainOverlay />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] overflow-hidden"
      >
        <p className="editorial-display muzix-brand-gradient-dark translate-y-[12%] select-none text-[clamp(7rem,31vw,36rem)] font-black uppercase leading-[0.62] tracking-normal opacity-90">
          Muzix
        </p>
      </div>

      <motion.div
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[84vh] max-w-[118rem] flex-col pb-8"
      >
        <div className="relative z-20 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <p className="text-sm font-semibold text-white/52">Discord, worldwide</p>
          <div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.96] sm:text-5xl md:text-6xl">
              Music for servers that want to sound alive.
            </h2>
            <a
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase text-[#030303] transition-colors hover:bg-accent-primary hover:text-white"
            >
              <Headphones size={16} aria-hidden="true" />
              Invite Muzix
            </a>
          </div>
        </div>

        <div className="relative z-20 mt-12 grid gap-8 border-t border-white/8 pt-8 sm:grid-cols-3 lg:max-w-4xl">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="relative z-20">
              <h2 className="mb-3 text-xs font-black uppercase text-white/28">{column.title}</h2>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLink link={link} isHome={isHome} navigate={navigate} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="relative z-30 mt-auto flex flex-col gap-2 border-t border-white/8 pt-6 text-xs font-bold uppercase leading-5 text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative z-30">
            <p>2026 Muzix</p>
            <p>All rights reserved</p>
            <p>Developed by Sam</p>
          </div>
          <div className="relative z-30 flex flex-col gap-1 sm:items-end">
            <Link
              to="/docs"
              state={{ scrollTarget: '#terms' }}
              className="inline-flex min-h-9 items-center py-1 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              to="/docs"
              state={{ scrollTarget: '#privacy' }}
              className="inline-flex min-h-9 items-center py-1 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
