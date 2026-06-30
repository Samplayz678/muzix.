import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Headphones } from 'lucide-react';
import ShaderGradientBackground from '../components/home/ShaderGradientBackground';
import useSimpleScrollMotion from '../hooks/useSimpleScrollMotion';

const pricingPlans = [
  {
    name: 'Weekly',
    desc: 'Perfect for a weekend event.',
    prices: { usd: { old: '1.99', new: '0.49' }, eur: { old: '1.89', new: '0.45' }, inr: { old: '99', new: '29' } },
    period: '/wk',
    features: ['7 Days of No-Prefix Commands', 'Server-wide Activation'],
    btnText: 'Choose Weekly',
  },
  {
    name: 'Monthly',
    desc: 'Consistent vibes all month long.',
    prices: { usd: { old: '3.99', new: '1.49' }, eur: { old: '3.49', new: '1.29' }, inr: { old: '249', new: '89' } },
    period: '/mo',
    features: ['30 Days of No-Prefix Commands', 'Server-wide Activation', 'Discord Supporter Role'],
    btnText: 'Choose Monthly',
    badge: 'Most Popular',
    featured: true,
  },
  {
    name: 'Yearly',
    desc: 'Lock in seamless commands for less.',
    prices: { usd: { old: '24.99', new: '9.99' }, eur: { old: '22.99', new: '8.99' }, inr: { old: '1999', new: '699' } },
    period: '/yr',
    features: ['1 Year of No-Prefix Commands', 'Server-wide Activation', 'Discord Supporter Role'],
    btnText: 'Choose Yearly',
  },
  {
    name: 'Lifetime',
    desc: 'Pay once. Vibe forever.',
    prices: { usd: { old: '59.99', new: '19.99' }, eur: { old: '54.99', new: '17.99' }, inr: { old: '4999', new: '1499' } },
    period: '/once',
    features: ['Permanent No-Prefix Access', 'Server-wide Activation', 'Exclusive Macabre Discord Role'],
    btnText: 'Unlock Lifetime',
    badge: 'Limited Slots',
  },
];

const symbols = { usd: '$', eur: 'EUR ', inr: 'INR ' };

export default function Premium() {
  const [currency, setCurrency] = useState('usd');
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const stableMotion = reducedMotion || simpleScrollMotion;

  return (
    <section className="relative -mt-24 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-36 text-[#f4f1ea] sm:px-8 md:px-10 md:pt-40">
      <ShaderGradientBackground
        variant="midu"
        intensity="midu"
        className="opacity-75"
        canvasClassName="mix-blend-screen"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 border-y border-[#f4f1ea]/15 py-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <img src="/images/muzix_new.png" alt="" className="h-12 w-12 object-contain" />
              <p className="editorial-label text-xs uppercase text-accent-primary/78">P R E M I U M&nbsp;&nbsp; A C C E S S</p>
            </div>
            <h1 className="editorial-display text-6xl font-black uppercase leading-[0.86] tracking-normal sm:text-7xl md:text-9xl">
              Premium sound access.
            </h1>
          </div>

          <p className="max-w-2xl text-2xl font-semibold leading-10 text-[#f4f1ea]/76 md:text-3xl md:leading-[3rem] lg:justify-self-end">
            Drop the prefix and make Muzix feel faster in every server. Premium keeps commands seamless for events, voice rooms, and everyday listening.
          </p>
        </div>

        <div className="my-12 flex flex-wrap items-center gap-2 border-b border-[#f4f1ea]/12 pb-8">
          {['usd', 'eur', 'inr'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`min-h-11 border px-6 py-2 text-sm font-black uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary ${
                currency === code
                  ? 'border-accent-primary bg-accent-primary text-white'
                  : 'border-[#f4f1ea]/18 text-[#f4f1ea]/62 hover:border-[#f4f1ea] hover:text-white'
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={stableMotion ? false : { opacity: 0, y: 28 }}
              animate={stableMotion ? undefined : { opacity: 1, y: 0 }}
              transition={stableMotion ? undefined : { delay: index * 0.06 }}
              style={stableMotion ? { opacity: 1, y: 0 } : undefined}
              className={`relative flex min-h-[34rem] flex-1 flex-col border p-7 transition-transform duration-300 hover:-translate-y-2 lg:p-9 xl:p-10 ${
                plan.featured
                  ? 'z-20 border-accent-primary bg-[linear-gradient(145deg,#ff3b30_0%,#120303_58%,#050505_100%)] text-white shadow-[0_32px_90px_rgba(255,59,48,0.22)]'
                  : 'z-10 border-[#f4f1ea]/16 bg-[#0d0d0d] text-[#f4f1ea]'
              }`}
            >
              {plan.badge && (
                <span className="mb-6 w-fit border border-current/25 px-3 py-2 text-xs font-black uppercase opacity-80">
                  {plan.badge}
                </span>
              )}

              <div className="mb-8">
                <h2 className="editorial-display text-5xl font-black uppercase leading-none tracking-normal">{plan.name}</h2>
                <p className="mt-4 text-lg leading-8 opacity-68">{plan.desc}</p>
              </div>

              <div className="border-y border-current/16 py-6">
                <div className="flex items-center gap-3">
                  <s className="text-xl font-semibold opacity-42">
                    <AnimatePresence mode="wait">
                      <motion.span key={`old-${currency}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {symbols[currency]}{plan.prices[currency].old}
                      </motion.span>
                    </AnimatePresence>
                  </s>
                  <span className="border border-current/25 px-2 py-1 text-xs font-black uppercase">Sale</span>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <span className="pb-2 text-2xl font-bold opacity-62">{symbols[currency]}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`new-${currency}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="editorial-display text-7xl font-black leading-none tracking-normal"
                    >
                      {plan.prices[currency].new}
                    </motion.span>
                  </AnimatePresence>
                  <span className="pb-2 text-xl font-semibold opacity-56">{plan.period}</span>
                </div>
              </div>

              <ul className="my-8 flex flex-col gap-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-lg leading-7 opacity-78">
                    <Check size={18} className="mt-1 shrink-0 text-accent-primary" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 border border-current bg-white px-5 py-3 text-sm font-black uppercase text-[#050505] transition-colors hover:bg-accent-primary hover:text-white">
                <Headphones size={17} aria-hidden="true" />
                {plan.btnText}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
