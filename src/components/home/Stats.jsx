import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Server, Users, Zap, ShieldCheck } from 'lucide-react';
import { useMobile } from '../../hooks/useMobile';

const stats = [
  {
    icon: <Server size={40} />,
    value: "90+",
    label: "Servers",
    description: "Powering music across growing communities"
  },
  {
    icon: <Users size={40} />,
    value: "40k+",
    label: "Users",
    description: "Vibing with our bot daily without interruptions"
  },
  {
    icon: <Zap size={40} />,
    value: "~12ms",
    label: "Latency",
    description: "Lightning fast response times and zero lag"
  },
  {
    icon: <ShieldCheck size={40} />,
    value: "99.9%",
    label: "Uptime",
    description: "Rock-solid stability with auto-resume and node relocation"
  }
];

function StatCard({ stat, index, progress }) {
  const isMobile = useMobile();
  const total = stats.length;
  const distance = useTransform(progress, (p) => index - p * (total - 1));

  const distanceRanges = [-2, -1, 0, 1, 2, 3];
  const dir = index % 2 === 0 ? 1 : -1;
  
  const xOffset = isMobile ? 40 : 150;
  const yOffset = isMobile ? 120 : 200;
  const zOffset = isMobile ? 400 : 600;

  const z = useTransform(distance, distanceRanges, [zOffset, zOffset/2, 0, -zOffset/2, -zOffset, -zOffset*1.5]);
  const y = useTransform(distance, distanceRanges, [yOffset, yOffset/2, 0, -yOffset/2.5, -yOffset/1.25, -yOffset*1.2]);
  const x = useTransform(distance, distanceRanges, [-xOffset * dir, -(xOffset/2) * dir, 0, (xOffset/2) * dir, xOffset * dir, xOffset*1.5 * dir]);
  const opacity = useTransform(distance, distanceRanges, [0, 0, 1, 0.4, 0.1, 0]);
  const scale = useTransform(distance, distanceRanges, [1.4, 1.2, 1, 0.9, 0.8, 0.7]);
  const rotateY = useTransform(distance, distanceRanges, [-15 * dir, -7.5 * dir, 0, 7.5 * dir, 15 * dir, 22.5 * dir]);

  return (
    <motion.div
      style={{ z, y, x, opacity, scale, rotateY, transformOrigin: "center center" }}
      className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[90%] md:w-full max-w-md h-fit glass-panel p-6 sm:p-10 md:p-14 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_0_40px_rgba(239,68,68,0.15)] border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl text-center"
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}>
        <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-accent-primary group-hover:bg-accent-primary/20 transition-all duration-500 shadow-xl shadow-accent-primary/20">
          {stat.icon}
        </div>
        <h3 className="text-5xl md:text-6xl font-black mb-4">{stat.value}</h3>
        <h4 className="text-2xl font-bold mb-4">{stat.label}</h4>
        <p className="text-gray-400 text-lg leading-relaxed">{stat.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Stats() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} id="stats" className="relative h-[400vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-24 md:top-32 w-full text-center z-50">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Live <span className="text-gradient drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">Stats</span>
          </motion.h2>
        </div>
        <div className="relative w-full max-w-5xl h-[60vh] mt-20 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {stats.map((stat, i) => <StatCard key={i} stat={stat} index={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
