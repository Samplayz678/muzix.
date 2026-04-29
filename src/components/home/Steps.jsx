import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Play, Settings } from 'lucide-react';
import { useMobile } from '../../hooks/useMobile';

const steps = [
  {
    number: "1",
    title: "Invite to Server",
    description: "Add Muzix to your Discord server in just one click with secure permissions.",
    icon: <Plus size={40} />,
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "2",
    title: "Play your Vibe",
    description: "Hop into a voice channel and use /play with your favorite tracks or playlists.",
    icon: <Play size={40} />,
    color: "from-accent-primary to-accent-secondary"
  },
  {
    number: "3",
    title: "Take Control",
    description: "Apply filters, manage the queue, and enjoy uninterrupted high-quality audio.",
    icon: <Settings size={40} />,
    color: "from-purple-500 to-purple-600"
  }
];

function StepCard({ step, index, progress }) {
  const isMobile = useMobile();
  const total = steps.length;
  const distance = useTransform(progress, (p) => index - p * (total - 1));

  const distanceRanges = [-2, -1, 0, 1, 2];
  const dir = index % 2 === 0 ? 1 : -1;
  
  const xOffset = isMobile ? 40 : 150;
  const yOffset = isMobile ? 120 : 200;
  const zOffset = isMobile ? 400 : 600;

  const z = useTransform(distance, distanceRanges, [zOffset, zOffset/2, 0, -zOffset/2, -zOffset]);
  const y = useTransform(distance, distanceRanges, [yOffset, yOffset/2, 0, -yOffset/2.5, -yOffset/1.25]);
  const x = useTransform(distance, distanceRanges, [-xOffset * dir, -(xOffset/2) * dir, 0, (xOffset/2) * dir, xOffset * dir]);
  const opacity = useTransform(distance, distanceRanges, [0, 0, 1, 0.4, 0.1]);
  const scale = useTransform(distance, distanceRanges, [1.4, 1.2, 1, 0.9, 0.8]);
  const rotateY = useTransform(distance, distanceRanges, [-15 * dir, -7.5 * dir, 0, 7.5 * dir, 15 * dir]);

  return (
    <motion.div
      style={{ z, y, x, opacity, scale, rotateY, transformOrigin: "center center" }}
      className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[90%] md:w-full max-w-xl h-fit glass-panel p-6 sm:p-10 md:p-14 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_0_40px_rgba(239,68,68,0.15)] border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl"
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}>
        <div className="absolute -top-6 -left-6 text-8xl font-black text-white/5 group-hover:text-accent-primary/10 transition-colors pointer-events-none">
          {step.number}
        </div>
        <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mb-8 text-white shadow-xl shadow-black/40`}>
          {step.icon}
        </div>
        <h3 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-md">{step.title}</h3>
        <p className="text-gray-400 leading-relaxed text-lg md:text-xl">{step.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Steps() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} id="how-it-works" className="relative h-[300vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-24 md:top-32 w-full text-center z-50">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-5xl md:text-7xl font-black">
            How it <span className="text-gradient drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">Works</span>
          </motion.h2>
        </div>
        <div className="relative w-full max-w-5xl h-[60vh] mt-20 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {steps.map((step, i) => <StepCard key={i} step={step} index={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
