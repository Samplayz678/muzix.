import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'lucide-react';

export default function CTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });

  const z = useTransform(scrollYProgress, [0, 1], [-600, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        <motion.div
          style={{ z, y, rotateX, opacity, scale, transformOrigin: "center center" }}
          className="container mx-auto px-6 md:px-12 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            className="glass-panel p-8 md:p-16 lg:p-24 rounded-[3.5rem] bg-gradient-to-br from-accent-primary/20 via-transparent to-transparent relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)]"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/20 blur-[100px] -z-10 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] -z-10 mix-blend-screen"></div>
            
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-10 leading-tight">
              Ready to <span className="text-gradient drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">Elevate</span> <br /> your server?
            </h2>
            
            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
              Join over 90+ servers and start your journey with the world's most advanced Discord music system.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black text-lg md:text-xl rounded-2xl shadow-xl shadow-white/10 w-full sm:w-auto"
              >
                <Link size={24} />
                <span>Invite Muzix Now</span>
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://discord.com/invite/TVR4efd8ts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 md:px-12 md:py-5 bg-white/5 border border-white/10 text-white font-black text-lg md:text-xl rounded-2xl hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <span>Support Server</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
