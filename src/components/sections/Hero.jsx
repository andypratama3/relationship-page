import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadHeartShape } from '@tsparticles/shape-heart';
import { content, formatContent } from '../../config/content';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const subtitle2Ref = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  const formattedContent = useMemo(() => formatContent(content), []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
    await loadHeartShape(engine);
  }, []);

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#FFB6C1' },
        shape: { type: 'heart' },
        size: { value: { min: 5, max: 15 } },
        move: {
          enable: true,
          speed: { min: 0.5, max: 2 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false },
        },
        rotate: { animation: { enable: true, speed: 5, sync: false } },
      },
      detectRetina: true,
    }),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.3 })
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          subtitle2Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById('love-counter');
    if (!nextSection) return;
    const lenis = window.__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(nextSection);
    } else {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticlesProvider init={particlesInit}>
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="absolute inset-0 pointer-events-none"
        />
      </ParticlesProvider>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/50 to-bg-deep pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="font-great-vibes text-gradient-animated mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 1.1 }}
        >
          {formattedContent.hero.title}
        </h1>

        <p
          ref={subtitleRef}
          className="font-cormorant text-xl md:text-2xl lg:text-3xl text-rose-gold mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          {formattedContent.hero.subtitle}
        </p>

        <p
          ref={subtitle2Ref}
          className="font-playfair text-lg md:text-xl text-rose-petal mb-12"
        >
          {formattedContent.hero.subtitle2}
        </p>

        <button
          ref={ctaRef}
          onClick={handleScroll}
          className="glass-strong w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-playfair text-rose-petal glow-rose hover:scale-105 transition-all duration-300 border-gradient touch-manipulation"
        >
          {formattedContent.hero.cta}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-rose-gold"
      >
        <span className="text-sm font-playfair">Scroll</span>
        <ChevronDown className="animate-bounce" size={24} strokeWidth={2} aria-hidden="true" />
      </div>
    </section>
  );
}
