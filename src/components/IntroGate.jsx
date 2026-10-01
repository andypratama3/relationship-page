import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { burstHearts } from '../utils/confetti';
import { content, formatContent } from '../config/content';

const FALLBACK_STEPS = [
  {
    title: 'Halo Cantik 💖',
    body: 'Eh… maksudku, halo {name2}. Aku bikin sesuatu khusus buat kamu.',
    cta: 'Ketuk untuk lanjut',
  },
  {
    title: 'Ketuk pelan-pelan ya ✨',
    body: 'Setiap ketukan bakal buka sedikit kejutan. Jangan buru-buru.',
    cta: 'Ketuk lagi',
  },
  {
    title: 'Siap-siap 🥰',
    body: 'Isinya tentang kita — tawa, rindu, dan semua momen manis itu.',
    cta: 'Satu ketukan lagi',
  },
  {
    title: 'Buka dengan hati 💌',
    body: 'Kalau sudah siap, ketuk tombol di bawah dan masuk ke dunia kita.',
    cta: 'Masuk ke Cerita Kita 💗',
  },
];

export default function IntroGate({ onDone }) {
  const formatted = useMemo(() => formatContent(content), []);
  const name1 = formatted.couple?.name1 || 'Nama Kamu';
  const name2 = formatted.couple?.name2 || 'Nama Pasangan';
  const steps = useMemo(() => {
    const fill = (s) =>
      typeof s === 'string'
        ? s.replace(/{name1}/g, name1).replace(/{name2}/g, name2)
        : s;
    const raw = formatted.intro?.length ? formatted.intro : FALLBACK_STEPS;
    return raw.map((s) => ({ title: fill(s.title), body: fill(s.body), cta: fill(s.cta) }));
  }, [formatted.intro, name1, name2]);
  const total = steps.length;

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 71 + 13) % 100,
        top: (i * 37 + 7) % 100,
        size: 14 + ((i * 7) % 14),
        delay: (i % 7) * 0.7,
        duration: 5 + (i % 5),
      })),
    []
  );

  // Masuk pertama kali
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animasi tiap ganti langkah
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
    btnRef.current?.focus({ preventScroll: true });
  }, [index]);

  // Kunci scroll badan selama gerbang tampil
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const burst = () => {
    burstHearts({ particleCount: 25, spread: 70, startVelocity: 32, origin: { y: 0.6 } });
  };

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    burst();
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -24,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => onDoneRef.current?.(),
    });
  };

  const advance = () => {
    if (leaving) return;
    if (index < total - 1) {
      burst();
      setIndex((i) => i + 1);
    } else {
      finish();
    }
  };

  const step = steps[index];
  const last = index === total - 1;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] flex items-center justify-center overflow-y-auto bg-[#1a0a10] px-4 py-6 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Pembuka"
      onClick={advance}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-mid via-bg-deep to-bg-deep" />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute animate-float opacity-30"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: h.size,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          >
            💗
          </span>
        ))}
      </div>

      <div
        ref={cardRef}
        className="relative z-10 my-auto w-full max-w-lg text-center glass-strong rounded-3xl px-5 py-8 sm:px-6 sm:py-10 md:px-10 border-gradient glow-rose"
      >
        <div className="mx-auto mb-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-petal to-deep-blush flex items-center justify-center glow-rose-strong animate-pulse-slow">
          <span className="text-2xl sm:text-3xl">💖</span>
        </div>

        <p className="font-playfair text-xs sm:text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">
          {index + 1} / {total}
        </p>

        <div ref={textRef} aria-live="polite">
          <h1 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-gradient-animated leading-tight mb-4 break-words">
            {step.title}
          </h1>
          <p className="font-cormorant text-base sm:text-lg md:text-xl text-cream leading-relaxed mb-6 sm:mb-8 break-words">
            {step.body}
          </p>
        </div>

        <button
          ref={btnRef}
          onClick={(e) => {
            e.stopPropagation();
            advance();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              advance();
            }
          }}
          className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-playfair text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation ${
            last
              ? 'bg-gradient-to-r from-rose-petal to-deep-blush text-white glow-rose-strong'
              : 'glass text-rose-petal border-gradient'
          }`}
        >
          {step.cta} {last ? '' : '→'}
        </button>

        <div className="flex items-center justify-center gap-2 mt-8" aria-hidden="true">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-rose-petal' : i < index ? 'w-2 bg-deep-blush' : 'w-2 bg-rose-petal/25'
              }`}
            />
          ))}
        </div>

        {!last && (
          <p className="mt-4 font-cormorant text-sm text-rose-gold">
            Ketuk di mana saja untuk lanjut
          </p>
        )}
      </div>
    </div>
  );
}
