import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';
import { RefreshCw, Share2 } from 'lucide-react';
import { burstHearts } from '../../utils/confetti';

const FLOATERS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 5) % 100,
  delay: (i % 8) * 0.6,
  duration: 5 + (i % 6),
}));

function getNextAnniversary(startDate) {
  const now = new Date();
  const next = new Date(startDate);
  next.setHours(0, 0, 0, 0);
  // Maju per tahun sampai ketemu tanggal di masa depan
  while (next.getTime() <= now.getTime()) {
    next.setFullYear(next.getFullYear() + 1);
  }
  return next;
}

export default function Final() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);
  const [timeData, setTimeData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);

  const formattedContent = useMemo(() => formatContent(content), []);

  useEffect(() => {
    const startDate = new Date(formattedContent.couple.startDate);

    if (isNaN(startDate.getTime())) {
      return;
    }

    const updateTime = () => {
      const nextAnniversary = getNextAnniversary(startDate);
      const diff = nextAnniversary.getTime() - Date.now();

      if (diff <= 0) {
        setTimeData({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeData({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [formattedContent.couple.startDate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.final-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
        y: 50,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.final-countdown', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          once: true,
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRestart = () => {
    const lenis = window.__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Untukmu, Sayangku',
      text: formattedContent.hero.subtitle,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      if (err?.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        return;
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !firedRef.current) {
          firedRef.current = true;
          burstHearts({ particleCount: 150, spread: 100, origin: { y: 0.8 } });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-24"
      style={{
        background: 'linear-gradient(120deg, #FFB6C1, #E6B8D9, #C9184A, #800F2F)',
        backgroundSize: '400% 400%',
        animation: 'gradient-x 30s ease infinite',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FLOATERS.map((f) => (
          <div
            key={f.id}
            className="absolute text-2xl animate-float opacity-50"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6 mb-16">
          <p className="final-line font-great-vibes text-5xl md:text-6xl lg:text-7xl text-white">
            Aku mencintaimu
          </p>
          <p className="final-line font-great-vibes text-4xl md:text-5xl lg:text-6xl text-white/90">
            kemarin, hari ini,
          </p>
          <p className="final-line font-great-vibes text-4xl md:text-5xl lg:text-6xl text-white/80">
            dan selamanya.
          </p>
        </div>

        <div className="final-countdown glass-strong rounded-3xl p-5 sm:p-8 mb-12 border-gradient">
          <p className="font-playfair text-lg sm:text-xl text-white mb-6">
            Anniversary Berikutnya
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white tabular-nums break-all">
                {String(timeData.days).padStart(2, '0')}
              </div>
              <div className="font-cormorant text-sm text-white/90">Hari</div>
            </div>
            <div>
              <div className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(timeData.hours).padStart(2, '0')}
              </div>
              <div className="font-cormorant text-sm text-white/90">Jam</div>
            </div>
            <div>
              <div className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(timeData.minutes).padStart(2, '0')}
              </div>
              <div className="font-cormorant text-sm text-white/90">Menit</div>
            </div>
            <div>
              <div className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                {String(timeData.seconds).padStart(2, '0')}
              </div>
              <div className="font-cormorant text-sm text-white/90">Detik</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="glass px-6 py-3 rounded-full font-playfair text-white hover:scale-105 transition-transform border-gradient flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} strokeWidth={2} aria-hidden="true" />
            Baca Lagi dari Awal
          </button>
          <button
            onClick={handleShare}
            className="glass px-6 py-3 rounded-full font-playfair text-white hover:scale-105 transition-transform border-gradient flex items-center justify-center gap-2"
          >
            <Share2 size={20} strokeWidth={2} aria-hidden="true" />
            {copied ? 'Link Disalin!' : 'Share Cinta Ini'}
          </button>
        </div>

        <footer className="mt-16 pt-8 border-t border-white/20">
          <p className="font-cormorant text-white/85 mb-2">
            Made with ❤️ by {formattedContent.couple.name1}
          </p>
          <p className="font-cormorant text-white/70 text-sm">{today}</p>
        </footer>
      </div>
    </section>
  );
}
