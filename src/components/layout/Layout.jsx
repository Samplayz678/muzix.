import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="relative isolate min-h-screen flex flex-col bg-[#050505] text-[#f4f1ea] selection:bg-accent-primary/35 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
