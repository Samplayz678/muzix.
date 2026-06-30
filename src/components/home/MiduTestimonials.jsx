import { motion, useReducedMotion } from 'framer-motion';
import { INVITE_URL, SUPPORT_URL } from './editorialData';
import useSimpleScrollMotion from '../../hooks/useSimpleScrollMotion';

const testimonials = [
  {
    quote:
      'Pleasure to work with from start to finish. Muzix translated messy queue requests into something intuitive — a rare balance between sound quality and simple controls.',
    name: 'Alex',
    role: 'Alpha Hub, Community Admin',
  },
  {
    quote:
      'Not just a music bot — genuinely invested in keeping the room alive. Bass boost, autoplay, and filters made our lofi stage feel intentional.',
    name: 'Sarah',
    role: 'Chill Zone, Moderator',
  },
  {
    quote:
      'Talented, responsive, and open to feedback at every step. Our server ditched every other bot once Muzix handled playback without dropping.',
    name: 'Marcus',
    role: 'Vibe City, Server Owner',
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function MiduTestimonials() {
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const stableMotion = reducedMotion || simpleScrollMotion;

  return (
    <section className="relative overflow-hidden bg-[#020202] px-5 py-24 text-white sm:px-8 md:px-10 lg:py-32">
      <div className="mx-auto max-w-[118rem]">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.55fr_0.45fr] md:items-end">
          <div>
            <p className="editorial-label mb-6 text-xs uppercase text-white/42">A partner you can trust</p>
            <h2 className="text-4xl font-black leading-[0.96] sm:text-5xl md:text-6xl">
              High standards. Reliable playback.
            </h2>
          </div>
          <p className="max-w-md text-lg font-semibold leading-8 text-white/62">
            Trusted by Discord communities who want voice channels to feel alive, polished, and easy to manage.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={stableMotion ? false : { opacity: 0, y: 22 }}
              whileInView={stableMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={stableMotion ? undefined : { once: true, margin: '-100px' }}
              transition={stableMotion ? undefined : { delay: index * 0.06, duration: 0.6, ease }}
              style={stableMotion ? { opacity: 1, y: 0 } : undefined}
              className="flex min-h-72 flex-col justify-between bg-[#020202] p-6 md:p-8"
            >
              <p className="text-lg leading-8 text-white/72">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-10">
                <h3 className="text-sm font-black uppercase">{item.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase text-white/42">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 text-sm font-black uppercase text-[#030303] transition-colors hover:bg-accent-primary hover:text-white"
          >
            Invite Muzix
          </a>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center border border-white/24 px-6 py-3 text-sm font-black uppercase text-white transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            Join support server
          </a>
        </div>
      </div>
    </section>
  );
}
