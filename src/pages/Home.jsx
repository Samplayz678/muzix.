import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MiduStyleHero from '../components/home/MiduStyleHero';
import { INVITE_URL, WEBPLAYER_URL, featureSpecimens, soundTags } from '../components/home/editorialData';

const FeatureSpecimenGrid = lazy(() => import('../components/home/FeatureSpecimenGrid'));
const WeightChartFeatures = lazy(() => import('../components/home/WeightChartFeatures'));
const MiduAboutSection = lazy(() => import('../components/home/MiduAboutSection'));
const MiduTestimonials = lazy(() => import('../components/home/MiduTestimonials'));
const MiduToolsMarquee = lazy(() => import('../components/home/MiduToolsMarquee'));
const PinnedRevealCard = lazy(() => import('../components/home/PinnedRevealCard'));

const soundItems = soundTags.slice(0, 4).map((tag) => ({
  kicker: 'Music bot',
  title: tag,
  body: tag === 'Smart queue'
    ? 'Keep every request ordered and readable while the room stays locked into the session.'
    : tag === 'Audio filters'
      ? 'Shape the room with bass, nightcore, vaporwave, and equalizer moods.'
      : tag === 'Lyrics'
        ? 'Bring the words into Discord so the chorus stays part of the conversation.'
        : 'Built for shared listening in Discord voice channels.',
}));

const commandItems = featureSpecimens.slice(0, 4).map((feature) => ({
  kicker: 'Discord command',
  title: feature.command,
  body: feature.description,
}));

function SectionPlaceholder({ id, minHeight }) {
  return (
    <div
      id={id}
      className="relative overflow-hidden bg-[#050505]"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

function DeferredSection({ children, id, minHeight = '100vh' }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return undefined;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '1200px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  if (shouldRender) {
    return (
      <Suspense fallback={<SectionPlaceholder id={id} minHeight={minHeight} />}>
        {children}
      </Suspense>
    );
  }

  return (
    <div ref={ref}>
      <SectionPlaceholder id={id} minHeight={minHeight} />
    </div>
  );
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTarget || location.hash;
    if (!target) return;

    const frame = window.requestAnimationFrame(() => {
      if (target === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }

      if (location.hash) {
        window.history.replaceState(window.history.state, '', location.pathname);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.state]);

  return (
    <>
      <div className="relative">
        <MiduStyleHero />
        <DeferredSection id="story" minHeight="90vh">
          <MiduAboutSection />
        </DeferredSection>
        <DeferredSection id="sound-guide" minHeight="224vh">
          <PinnedRevealCard
            id="sound-guide"
            eyebrow="Our highlights"
            title="Recent features we're proud of."
            body="We build for Discord communities, gaming servers, and late-night voice rooms that need music to feel polished, stable, and easy to control."
            items={soundItems}
            theme="dark"
          />
        </DeferredSection>
        <DeferredSection minHeight="32vh">
          <MiduToolsMarquee />
        </DeferredSection>
        <DeferredSection id="features" minHeight="100vh">
          <FeatureSpecimenGrid />
        </DeferredSection>
        <DeferredSection id="overlap" minHeight="224vh">
          <PinnedRevealCard
            id="overlap"
            eyebrow="Pinned commands"
            title="Commands reveal while the card stays fixed."
            body="Scroll through the panel and the commands come into view one by one, like a server queue building on top of the current track."
            items={commandItems}
            theme="light"
          />
        </DeferredSection>
        <DeferredSection id="stats" minHeight="100vh">
          <WeightChartFeatures />
        </DeferredSection>
        <DeferredSection minHeight="95vh">
          <MiduTestimonials />
        </DeferredSection>
        <DeferredSection id="timeline" minHeight="210vh">
          <PinnedRevealCard
            id="timeline"
            eyebrow="Final chorus"
            title="Ready to make your server sound alive?"
            body="Invite Muzix and turn your Discord server into a shared music room with high-quality playback, queues, filters, lyrics, and autoplay."
            theme="dark"
            final
            actions={[
              { label: 'Invite Bot', href: INVITE_URL, primary: true },
              { label: 'Open Webplayer', href: WEBPLAYER_URL },
            ]}
          />
        </DeferredSection>
      </div>
    </>
  );
}
