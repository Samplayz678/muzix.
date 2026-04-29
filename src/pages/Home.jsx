import { useScroll } from 'framer-motion';
import HeroScene from '../components/3d/HeroScene';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import BentoGrid from '../components/home/BentoGrid';
import Steps from '../components/home/Steps';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import Preloader from '../components/layout/Preloader';

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Preloader />
      <div className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000">
        <HeroScene scrollProgress={scrollYProgress} />
      </div>
      <Hero />
      <BentoGrid />
      <Stats />
      <Steps />
      <Testimonials />
      <CTA />
    </>
  );
}
