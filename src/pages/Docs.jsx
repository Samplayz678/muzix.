import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const docsContent = [
  {
    id: 'about',
    title: 'About Muzix',
    content: (
      <>
        <p className="text-gray-300 text-lg leading-relaxed mb-6"><strong>Muzix</strong> is a next-generation, feature-rich Discord music bot engineered to deliver a seamless, immersive, and high-fidelity audio experience tailored for modern communities.</p>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">Whether you're relaxing with friends or enjoying music solo, Muzix keeps the vibe alive with uninterrupted playback and precision control. It combines advanced streaming technology, intelligent queue management, and powerful real-time controls to give you complete command over your music.</p>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">Built for performance, stability, and speed, Muzix ensures smooth, lag-free playback with crystal-clear audio across multiple platforms and sources.</p>
      </>
    )
  },
  {
    id: 'features',
    title: 'Core Features',
    content: (
      <>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">Muzix is packed with premium features designed to give your server the ultimate audio experience:</p>
        <ul className="space-y-4">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>24/7 Playback:</strong> Always online, nonstop music streaming from any source without interruptions.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>High-Quality Audio:</strong> Crystal-clear voice channel rendering powered by advanced Lavalink infrastructure.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Audio Filters:</strong> Enhance your music with real-time filters like bass boost, nightcore, vaporwave, and equalizer presets.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Custom Playlists:</strong> Create, save, and manage your own personalized server playlists directly in Discord.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Auto-Resume & Relocation:</strong> If a host node ever drops, Muzix automatically relocates to a backup node and resumes your song right where it left off.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>No-Prefix System:</strong> Premium seamless text recognition allows authorized users to request songs without typing a command prefix.</span></li>
        </ul>
      </>
    )
  },
  {
    id: 'guide',
    title: 'Introduction & Guide',
    content: (
      <>
        <h3 className="text-white text-3xl font-bold mb-6 mt-4">How to Get Started</h3>
        <ul className="space-y-4">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Invite the Bot:</strong> Use the invite button on our home page to add Muzix to your server. Make sure it has permissions to View Channels, Send Messages, Connect, and Speak.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Commands:</strong> Join a voice channel and use our slash commands (e.g., <code className="bg-white/10 px-2 py-1 rounded text-accent-primary">/play [song name]</code>) to start listening immediately.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>No-Prefix System:</strong> Certain users and servers can be granted "no-prefix" status, allowing them to type song names directly without needing a command prefix.</span></li>
        </ul>
      </>
    )
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    content: (
      <>
        <p className="text-center text-gray-400 font-medium mb-12 uppercase tracking-widest text-sm">Last updated: April 14, 2026</p>
        
        <h3 className="text-white text-3xl font-bold mb-4">1. Acceptance of Terms</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">By accessing or using Muzix ("the Bot"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Bot or invite it to your server.</p>

        <h3 className="text-white text-3xl font-bold mb-4">2. Description of Service</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">Muzix is a Discord music bot that provides high-fidelity audio streaming, playlist management, and audio effects for Discord servers. The service is provided "as is" and may be updated, modified, or discontinued at any time without prior notice to the users.</p>

        <h3 className="text-white text-3xl font-bold mb-4">3. User Responsibilities</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">Users must adhere to the following guidelines while operating Muzix:</p>
        <ul className="space-y-4 mb-10">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Comply with Discord's Terms of Service and Community Guidelines.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Not use the Bot for any illegal activities, harassment, or malicious intent.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Not attempt to exploit, hack, reverse-engineer, or misuse the Bot's infrastructure.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Not use the Bot to stream copyrighted content without proper authorization.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Respect rate limits and fair usage policies to ensure stability for all users globally.</span></li>
        </ul>

        <h3 className="text-white text-3xl font-bold mb-4">4. Premium Services</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">Certain advanced features of Muzix are offered on a subscription basis. By purchasing a premium tier:</p>
        <ul className="space-y-4 mb-10">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>You agree to pay the specified fees associated with your chosen tier.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>You understand that perks are tied to your specific Discord ID or Server ID.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span>Refunds are processed strictly at the discretion of the Muzix administration team and are generally not provided for partially used billing periods.</span></li>
        </ul>
      </>
    )
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: (
      <>
        <p className="text-center text-gray-400 font-medium mb-12 uppercase tracking-widest text-sm">Last updated: June 20, 2026</p>
        
        <h3 className="text-white text-3xl font-bold mb-4">1. Information We Collect</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">To provide a seamless experience, Muzix collects specific, non-invasive data from Discord:</p>
        <ul className="space-y-4 mb-10">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Discord IDs:</strong> Server (Guild) IDs, Voice/Text Channel IDs, and User IDs are collected to execute commands and route audio.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Premium Data:</strong> If granted premium or "no-prefix" privileges, we store your specific Discord User/Guild ID securely in our database.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Voice State Data:</strong> Temporary information regarding user presence in voice channels to manage playback and auto-disconnect features.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Message Content:</strong> The bot temporarily reads message content solely to execute text commands. We do not log or store chat history.</span></li>
        </ul>

        <h3 className="text-white text-3xl font-bold mb-4">2. How We Use Your Information</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">We strictly utilize the collected data to operate, maintain, and improve the Bot. User IDs saved for premium status are checked against incoming requests. Voice state data tracks queues and facilitates features like auto-resume and host-node relocation. Server and Channel IDs are strictly used to establish audio connections via our Lavalink nodes.</p>

        <h3 className="text-white text-3xl font-bold mb-4">3. Data Storage and Security</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">We implement industry-standard security measures to protect your data:</p>
        <ul className="space-y-4 mb-10">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Persistent Data:</strong> Information necessary for continuous features (e.g., Premium User IDs, Custom Playlists) is stored securely in encrypted databases until revoked or deletion is requested.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Temporary Data:</strong> Active music queues and voice channel states are held in volatile memory (RAM) and are permanently cleared once playback concludes or the bot disconnects.</span></li>
        </ul>

        <h3 className="text-white text-3xl font-bold mb-4">4. Web Player Privacy Policy</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">The Muzix Web Player is a browser-based music player for listening, saving favorites, creating playlists, and syncing playback across your devices. The Web Player uses Google account sign-in through NextAuth; it does not use Discord OAuth for user login.</p>
        <ul className="space-y-4 mb-10">
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Google Account Information:</strong> When you sign in with Google, we may receive your Google account ID, display name, email address, profile image, OAuth provider, and access token for account verification. We do not receive or store your Google password.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Player and Session Data:</strong> We may process playback status, current track, queue actions, device ID, device name, volume, and session activity so the Web Player can sync playback and detect when the same account is playing on another device.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Saved Library and Preferences:</strong> Favorites, playlists, playlist tracks, selected artists, listening history, volume, onboarding status, theme settings, and similar preferences may be stored to keep your Web Player experience attached to your Google account.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Browser and Security Data:</strong> We may collect limited technical data such as IP address, browser type, device information, error logs, and request timestamps to protect the service, prevent abuse, and troubleshoot issues.</span></li>
          <li className="flex gap-4 text-gray-300 text-lg"><span className="text-accent-primary font-bold">•</span> <span><strong>Cookies and Local Storage:</strong> The Web Player may use NextAuth cookies, local storage, session storage, or similar browser storage to keep you signed in, cache account data, remember preferences, and maintain session security.</span></li>
        </ul>

        <h3 className="text-white text-3xl font-bold mb-4">5. How Web Player Data Is Used</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">Web Player data is used to verify Google sign-ins, create and maintain your Muzix account record, save favorites and playlists, remember preferences, sync playback across devices, personalize music discovery, improve reliability, diagnose errors, and protect Muzix from misuse. We do not sell personal data or use Web Player data to build advertising profiles.</p>

        <h3 className="text-white text-3xl font-bold mb-4">6. Third-Party Services</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">The Web Player may rely on third-party services such as Google authentication, hosting providers, analytics, advertising services, payment processors, and music/source platforms including YouTube, Spotify, and Audius. These services may process information according to their own privacy policies. Muzix only shares the information necessary to provide the requested feature or maintain the service.</p>

        <h3 className="text-white text-3xl font-bold mb-4">7. Your Choices and Data Removal</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">You can log out of the Web Player, clear browser cookies/local storage, remove saved favorites or playlists, revoke Google account access where available, or request deletion of stored account, playlist, premium, and Web Player data through the official Muzix support server. Some security logs may be retained for a limited period where needed to protect the service or comply with legal obligations.</p>

        <h3 className="text-white text-3xl font-bold mb-4">8. Policy Changes</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">We may update this Privacy Policy as Muzix and the Web Player evolve. Continued use of Muzix or the Web Player after changes are published means you accept the updated policy.</p>
      </>
    )
  }
];

export default function Docs() {
  const [openSection, setOpenSection] = useState('about');

  return (
    <section className="relative pt-40 pb-32 min-h-screen bg-transparent overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-white"
          >
            Documentation <span className="text-gradient drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">& Legal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Everything you need to know about how Muzix works.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          {docsContent.map((section, i) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border overflow-hidden transition-all duration-500 backdrop-blur-2xl ${
                openSection === section.id 
                  ? 'bg-gradient-to-br from-white/10 to-black/60 border-accent-primary/50 shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(239,68,68,0.2)]' 
                  : 'bg-gradient-to-br from-white/5 to-black/30 border-white/15 hover:border-accent-primary/30 hover:-translate-y-1 shadow-lg cursor-pointer'
              }`}
            >
              <button 
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-8 md:p-10 text-left"
              >
                <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">{section.title}</span>
                <ChevronDown 
                  size={32} 
                  className={`text-accent-primary transition-transform duration-500 ${openSection === section.id ? 'rotate-180 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 md:px-10 pb-10">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
