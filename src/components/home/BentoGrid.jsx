import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Music2, Play, ListMusic, Sliders, Layers } from 'lucide-react';
import { useMobile } from '../../hooks/useMobile';

const features = [
  {
    title: "The Music Engine.",
    description: "Muzix delivers a complete Discord music experience with seamless playback, powerful controls, and smart features designed to keep your server alive with nonstop vibes.",
    icon: <Music2 className="text-accent-primary" size={40} />,
  },
  {
    title: "24/7 Playback",
    description: "Always online, nonstop music streaming from any source without interruptions.",
    icon: <Play className="text-accent-primary" size={40} />,
  },
  {
    title: "Custom Playlists",
    description: "Create, manage, and sync your favorite playlists instantly.",
    icon: <ListMusic className="text-accent-primary" size={40} />,
  },
  {
    title: "Audio Filters",
    description: "Enhance your music with bass boost, nightcore, 3D, and 10+ other real-time audio filters.",
    icon: <Sliders className="text-accent-primary" size={40} />,
  },
  {
    title: "Core Features",
    description: "Everything you need for the perfect music experience. High Quality Audio, Fast Streaming, and Rock-Solid Stability.",
    icon: <Layers className="text-accent-primary" size={40} />,
  }
];

function ShowcaseCard({ feature, index, progress }) {
  const isMobile = useMobile();
  const total = features.length;
  
  // Calculate distance from center (0 is center, >0 is behind, <0 is in front)
  const distance = useTransform(progress, (p) => index - p * (total - 1));

  // The distance ranges from roughly -4 to 4. We map this to 3D properties.
  const distanceRanges = [-2, -1, 0, 1, 2, 3, 4];
  const dir = index % 2 === 0 ? 1 : -1;
  
  const xOffset = isMobile ? 40 : 150;
  const yOffset = isMobile ? 120 : 200;
  const zOffset = isMobile ? 400 : 600;

  // Animate: translateZ, translateY, opacity, scale, rotateY, translateX
  const z = useTransform(distance, distanceRanges, [zOffset, zOffset/2, 0, -zOffset/2, -zOffset, -zOffset*1.5, -zOffset*2]);
  const y = useTransform(distance, distanceRanges, [yOffset, yOffset/2, 0, -yOffset/2.5, -yOffset/1.25, -yOffset*1.2, -yOffset*1.6]);
  const x = useTransform(distance, distanceRanges, [-xOffset * dir, -(xOffset/2) * dir, 0, (xOffset/2) * dir, xOffset * dir, xOffset*1.5 * dir, xOffset*2 * dir]);
  const opacity = useTransform(distance, distanceRanges, [0, 0, 1, 0.4, 0.1, 0, 0]);
  const scale = useTransform(distance, distanceRanges, [1.4, 1.2, 1, 0.9, 0.8, 0.7, 0.6]);
  const rotateY = useTransform(distance, distanceRanges, [-15 * dir, -7.5 * dir, 0, 7.5 * dir, 15 * dir, 22.5 * dir, 30 * dir]);

  return (
    <motion.div
      style={{
        z,
        y,
        x,
        opacity,
        scale,
        rotateY,
        transformOrigin: "center center",
      }}
      className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[90%] md:w-full max-w-2xl h-fit glass-panel p-6 sm:p-10 md:p-14 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_0_40px_rgba(239,68,68,0.15)] border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl"
    >
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        className="mb-2"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-3xl flex items-center justify-center mb-8 text-accent-primary group-hover:bg-accent-primary/20 transition-all duration-500 shadow-xl shadow-accent-primary/20">
          {feature.icon}
        </div>
        <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-md">{feature.title}</h3>
        <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const containerRef = useRef(null);

  // We set a tall height for the container to allow scrolling.
  // 400vh gives us plenty of scroll space for 5 items.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  // Direct 1:1 scroll mapping eliminates spring calculations and lag
  return (
    <section ref={containerRef} id="features" className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky container that stays in view while we scroll through the 400vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* Background glow for the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

        <div className="absolute top-24 md:top-32 w-full text-center z-50">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black"
          >
            Bot <span className="text-gradient drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">Features</span>
          </motion.h2>
        </div>

        {/* Perspective Stage */}
        <div 
          className="relative w-full max-w-5xl h-[60vh] mt-20 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {features.map((feature, i) => (
            <ShowcaseCard key={i} feature={feature} index={i} progress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  );
}
