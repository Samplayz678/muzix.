import { motion } from 'framer-motion';
import { Link } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">

      {/* Empty spacer for the global 3D background */}
      <div className="absolute inset-0 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center pointer-events-none">

        {/* Left Copy Container */}
        <div className="w-full md:w-3/5 lg:w-1/2 pt-12 md:pt-0 pointer-events-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {/* Trust Badge */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-accent-secondary border-2 border-black z-30"></div>
                <div className="w-6 h-6 rounded-full bg-accent-primary border-2 border-black z-20"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-black z-10"></div>
              </div>
              <span className="text-sm text-gray-400 font-semibold">
                Used by <strong className="text-white">90+</strong> servers
              </span>
            </div>

            <div className="px-5 py-2 border border-accent-primary/30 rounded-full bg-accent-primary/5 text-accent-primary font-extrabold tracking-wider text-sm uppercase">
              Premium Discord Music Bot
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,8rem)] md:text-[clamp(4.5rem,10vw,10rem)] font-black leading-[0.85] tracking-tighter mb-8 drop-shadow-[0_4px_40px_rgba(239,68,68,0.5)]"
          >
            <span className="text-white">MU</span>
            <span className="text-gradient">ZIX</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-bold mb-6 text-white h-12"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb3b3] to-white">
              Discord Music, Elevated.
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
          >
            Muzix turns your Discord server into an immersive listening room with smooth playback, smart queues, custom playlists, and real-time audio control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <Link size={20} />
              <span>Invite Me</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://discord.com/invite/TVR4efd8ts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              <span>Support Server</span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
