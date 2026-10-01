import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';
import IntroGate from './components/IntroGate';
import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import Hero from './components/sections/Hero';
import LoveCounter from './components/sections/LoveCounter';
import './styles/globals.css';

const Timeline = lazy(() => import('./components/sections/Timeline'));
const Gallery = lazy(() => import('./components/sections/Gallery'));
const LoveLetter = lazy(() => import('./components/sections/LoveLetter'));
const Reasons = lazy(() => import('./components/sections/Reasons'));
const MusicSection = lazy(() => import('./components/sections/MusicSection'));
const InteractiveHeart = lazy(() => import('./components/sections/InteractiveHeart'));
const Final = lazy(() => import('./components/sections/Final'));
const MusicPlayer = lazy(() => import('./components/MusicPlayer'));

gsap.registerPlugin(ScrollTrigger);

function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center" aria-hidden="true">
      <div className="w-10 h-10 rounded-full bg-rose-petal/30 animate-pulse" />
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState('loading');

  const handleLoaded = useCallback(() => setPhase('intro'), []);
  const handleIntroDone = useCallback(() => setPhase('main'), []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !reduce,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);
    window.__lenis = lenisInstance;

    let rafId = 0;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (window.__lenis === lenisInstance) {
        window.__lenis = undefined;
      }
      lenisInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (phase === 'main') {
      const t = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const inMain = phase === 'main';

  return (
    <ErrorBoundary>
      <div className="noise-overlay" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10001] focus:bg-[#2a0f1a] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        Lewati ke konten
      </a>
      {inMain && <Cursor />}
      {inMain && <ProgressBar />}
      {inMain && (
        <Suspense fallback={null}>
          <MusicPlayer />
        </Suspense>
      )}

      {phase === 'loading' && <Preloader onLoaded={handleLoaded} />}
      {phase === 'intro' && <IntroGate onDone={handleIntroDone} />}
      {inMain && (
        <main id="main" className="overflow-x-hidden w-full max-w-full">
          <Hero />
          <LoveCounter />
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
            <Gallery />
            <LoveLetter />
            <Reasons />
            <MusicSection />
            <InteractiveHeart />
            <Final />
          </Suspense>
        </main>
      )}
    </ErrorBoundary>
  );
}

export default App;
