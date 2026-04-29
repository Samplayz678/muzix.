import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-accent-primary/30 selection:text-white overflow-x-hidden">
      {/* Background Aurora */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
