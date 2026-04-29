import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-2xl">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          <div className="col-span-1 md:col-span-2 pr-4">
            <Link to="/" className="text-4xl font-black tracking-tight text-white flex items-center gap-1 mb-4">
              MU<span className="text-gradient">ZIX</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[300px] mb-6">
              Your ultimate Discord music companion. Elevate your community with high-fidelity streaming, seamless integration, and advanced audio controls.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> v1.0.0 Stable
              </span>
              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-500 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                Auto-Resume Enabled
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase border-l-2 border-accent-primary pl-2">Product</h4>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-gray-400 hover:text-accent-primary transition-colors">Features</a></li>
              <li><Link to="/premium" className="text-gray-400 hover:text-accent-primary transition-colors">Premium</Link></li>
              <li><a href="/#about" className="text-gray-400 hover:text-accent-primary transition-colors">About</a></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-accent-primary transition-colors">Documentation</Link></li>
              <li>
                <a href="/#stats" className="text-gray-400 hover:text-accent-primary transition-colors flex items-center gap-2">
                  Live Stats <span className="bg-accent-primary/10 text-accent-primary text-[0.65rem] px-1.5 py-0.5 rounded font-bold">NEW</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase border-l-2 border-accent-primary pl-2">Community</h4>
            <ul className="space-y-4">
              <li><a href="https://discord.com/invite/TVR4efd8ts" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-primary transition-colors">Join Discord</a></li>
              <li><a href="https://top.gg/bot/1328272164423729233/vote" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent-primary transition-colors">Vote on Top.gg</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide uppercase border-l-2 border-accent-primary pl-2">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/docs" className="text-gray-400 hover:text-accent-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-accent-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; 2026 Muzix. All rights reserved. &bull; Developed by Sam <span className="text-accent-primary">♥</span>
          </p>

          <div className="flex gap-4">
            <div className="glass-panel px-4 py-2 rounded-lg text-gray-400 text-sm flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
