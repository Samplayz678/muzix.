import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Weekly',
    desc: 'Perfect for a weekend event.',
    prices: { usd: { old: '1.99', new: '0.49' }, eur: { old: '1.89', new: '0.45' }, inr: { old: '99', new: '29' } },
    period: '/wk',
    features: ['7 Days of No-Prefix Commands', 'Server-wide Activation'],
    btnText: 'Choose Weekly',
    type: 'standard',
  },
  {
    name: 'Monthly',
    desc: 'Consistent vibes all month long.',
    prices: { usd: { old: '3.99', new: '1.49' }, eur: { old: '3.49', new: '1.29' }, inr: { old: '249', new: '89' } },
    period: '/mo',
    features: ['30 Days of No-Prefix Commands', 'Server-wide Activation', 'Discord Supporter Role'],
    btnText: 'Choose Monthly',
    badge: 'Most Popular',
    type: 'popular',
  },
  {
    name: 'Yearly',
    desc: 'Lock in seamless commands for less.',
    prices: { usd: { old: '24.99', new: '9.99' }, eur: { old: '22.99', new: '8.99' }, inr: { old: '1999', new: '699' } },
    period: '/yr',
    features: ['1 Year of No-Prefix Commands', 'Server-wide Activation', 'Discord Supporter Role'],
    btnText: 'Choose Yearly',
    type: 'standard',
  },
  {
    name: 'Lifetime',
    desc: 'Pay once. Vibe forever.',
    prices: { usd: { old: '59.99', new: '19.99' }, eur: { old: '54.99', new: '17.99' }, inr: { old: '4999', new: '1499' } },
    period: '/once',
    features: ['Permanent No-Prefix Access', 'Server-wide Activation', 'Exclusive Macabre Discord Role'],
    btnText: 'Unlock Lifetime',
    badge: 'Limited Slots',
    type: 'macabre',
  },
];

const symbols = { usd: '$', eur: '€', inr: '₹' };

export default function Premium() {
  const [currency, setCurrency] = useState('usd');

  return (
    <section className="relative pt-40 pb-32 min-h-screen bg-transparent overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/20 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight"
          >
            Drop the <span className="text-gradient drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">Prefix</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Make your server truly seamless. Command Muzix directly without ever typing a prefix again.
          </motion.p>
        </div>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-20">
          <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 p-2 rounded-full inline-flex gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {['usd', 'eur', 'inr'].map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase transition-all duration-300 ${
                  currency === c 
                    ? 'bg-white/10 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[2rem] backdrop-blur-2xl transition-transform hover:-translate-y-2 hover:scale-[1.02] duration-500 overflow-hidden group ${
                plan.type === 'popular' 
                  ? 'bg-[#191423]/80 border border-purple-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_80px_rgba(139,92,246,0.2)]' 
                  : plan.type === 'macabre'
                  ? 'bg-[#1e0f0f]/90 border border-transparent bg-clip-padding shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_80px_rgba(239,68,68,0.2)]'
                  : 'bg-[#121218]/60 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]'
              }`}
            >
              {plan.type === 'macabre' && (
                <div className="absolute -inset-[2px] -z-10 rounded-[2.2rem] opacity-70 bg-gradient-to-tr from-accent-primary via-[#800000] to-accent-primary animate-pulse" style={{ backgroundSize: '200% 200%' }}></div>
              )}

              {/* Top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

              {plan.badge && (
                <span className={`absolute top-6 right-6 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md ${
                  plan.type === 'popular' 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    : 'bg-accent-primary/20 text-red-300 border border-accent-primary/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                }`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="my-6 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <s className="text-gray-500 text-xl font-semibold decoration-2 decoration-accent-primary/80">
                    <AnimatePresence mode="wait">
                      <motion.span key={currency} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {symbols[currency]}{plan.prices[currency].old}
                      </motion.span>
                    </AnimatePresence>
                  </s>
                  <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                    plan.type === 'macabre' ? 'bg-accent-primary/20 text-accent-primary border-accent-primary/30' : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                  }`}>Sale</span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-400 text-3xl font-semibold">{symbols[currency]}</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={currency} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-6xl font-black tracking-tighter text-white">
                      {plan.prices[currency].new}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-gray-500 text-xl font-medium">{plan.period}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

              <ul className="flex flex-col gap-5 flex-grow border-t border-white/5 pt-8 mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-300 text-[0.95rem]">
                    <span className={`p-1.5 rounded-full ${
                      plan.type === 'macabre' ? 'bg-accent-primary/15 text-accent-primary' : 'bg-purple-500/15 text-purple-400'
                    }`}>
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: feat.replace(/Server-wide Activation|No-Prefix/g, '<b>$&</b>') }}></span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-lg mt-auto transition-all relative overflow-hidden ${
                plan.type === 'popular' 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-[0_10px_20px_rgba(109,40,217,0.3)] hover:shadow-[0_15px_25px_rgba(109,40,217,0.5)] border-none'
                  : plan.type === 'macabre'
                  ? 'bg-gradient-to-br from-accent-primary to-[#990000] text-white shadow-[0_10px_20px_rgba(153,0,0,0.4)] hover:shadow-[0_15px_25px_rgba(239,68,68,0.5)] border-none'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30'
              }`}>
                {plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
