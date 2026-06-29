import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex",
    role: "Admin, Alpha Hub",
    text: "Muzix completely changed the vibe of our community. The audio quality is unmatched and it literally never goes offline. Best bot we've used.",
    rating: 5,
    bgColor: "from-blue-500 to-blue-600"
  },
  {
    name: "Sarah",
    role: "Mod, Chill Zone",
    text: "The premium features are insanely good. Bass boost and 24/7 mode make it perfect for our lofi stage channels.",
    rating: 5,
    bgColor: "from-accent-primary to-accent-secondary"
  },
  {
    name: "Marcus",
    role: "Owner, Vibe City",
    text: "Zero lag, instant playback, and the UI is gorgeous. We ditched all other music bots for Muzix.",
    rating: 5,
    bgColor: "from-gray-700 to-gray-800"
  }
];

function TestimonialCard({ testimonial, index, progress }) {
  const total = testimonials.length;
  const distance = useTransform(progress, (p) => index - p * (total - 1));

  const distanceRanges = [-2, -1, 0, 1, 2];
  const dir = index % 2 === 0 ? 1 : -1;
  
  const z = useTransform(distance, distanceRanges, [600, 300, 0, -300, -600]);
  const y = useTransform(distance, distanceRanges, [200, 100, 0, -80, -160]);
  const x = useTransform(distance, distanceRanges, [-150 * dir, -75 * dir, 0, 75 * dir, 150 * dir]);
  const opacity = useTransform(distance, distanceRanges, [0, 0, 1, 0.4, 0.1]);
  const scale = useTransform(distance, distanceRanges, [1.4, 1.2, 1, 0.9, 0.8]);
  const rotateY = useTransform(distance, distanceRanges, [-15 * dir, -7.5 * dir, 0, 7.5 * dir, 15 * dir]);

  return (
    <motion.div
      style={{ z, y, x, opacity, scale, rotateY, transformOrigin: "center center" }}
      className="absolute top-0 bottom-0 left-0 right-0 m-auto w-full max-w-2xl h-fit glass-panel p-6 sm:p-10 md:p-14 rounded-[2.5rem] flex flex-col justify-between group shadow-[0_0_40px_rgba(239,68,68,0.15)] border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl"
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}>
        <div className="flex gap-1 mb-8 text-accent-primary drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={24} fill="currentColor" />
          ))}
        </div>
        
        <p className="text-gray-300 text-2xl leading-relaxed mb-10 italic font-medium">
          "{testimonial.text}"
        </p>
        
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${testimonial.bgColor || 'from-accent-primary to-accent-secondary'} flex items-center justify-center font-bold text-white text-xl shadow-lg`}>
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-24 md:top-32 w-full text-center z-50">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} className="inline-block px-4 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary font-bold text-sm uppercase tracking-widest mb-6">
            Wall of Love
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-5xl md:text-7xl font-black">
            Trusted by <span className="text-gradient drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">thousands</span>
          </motion.h2>
        </div>
        <div className="relative w-full max-w-5xl h-[60vh] mt-20 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {testimonials.map((testimonial, i) => <TestimonialCard key={i} testimonial={testimonial} index={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
