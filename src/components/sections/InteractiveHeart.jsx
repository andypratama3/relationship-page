import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { burstHearts } from '../../utils/confetti';

const MILESTONES = [10, 25, 50, 100];

export default function InteractiveHeart() {
  const sectionRef = useRef(null);
  const heartRef = useRef(null);
  const lastBurstRef = useRef(0);
  const [clickCount, setClickCount] = useState(0);
  const [specialMessage, setSpecialMessage] = useState(false);
  const [milestone, setMilestone] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.heart-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from(heartRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
        scale: 0,
        rotation: -180,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'transform',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const burst = (big = false) => {
    const now = Date.now();
    if (!big && now - lastBurstRef.current < 120) return;
    lastBurstRef.current = now;
    burstHearts({ big, origin: { y: big ? 0.5 : 0.6 } });
  };

  const handleHeartClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;

      if (heartRef.current) {
        gsap.fromTo(
          heartRef.current,
          { scale: 1 },
          { scale: 1.2, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', overwrite: 'auto' }
        );
      }

      burst(false);

      if (MILESTONES.includes(next)) {
        setMilestone(next);
        burst(true);
      }
      if (next >= 100) {
        setSpecialMessage(true);
      }

      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, #FFB6C1, #E6B8D9, #C9184A, #800F2F)',
        backgroundSize: '400% 400%',
        animation: 'gradient-x 20s ease infinite',
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="heart-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-white mb-12 md:mb-16">
          Kirim Cinta
        </h2>

        <button
          ref={heartRef}
          onClick={handleHeartClick}
          aria-label="Kirim cinta, tekan hati ini"
          className="text-8xl md:text-[10rem] transition-transform hover:scale-110 active:scale-95 cursor-pointer animate-pulse-slow touch-manipulation select-none"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.5))',
          }}
        >
          ❤️
        </button>

        <div className="mt-8 space-y-4">
          <p className="font-playfair text-2xl text-white tabular-nums" aria-live="polite">
            Kamu sudah mengirim {clickCount} cinta
          </p>
          <p className="font-cormorant text-white/80">
            Tekan hatinya sebanyak yang kamu mau
          </p>
          {milestone && (
            <p className="font-playfair text-xl text-white animate-pulse">
              {milestone} cinta! Luar biasa! 💖
            </p>
          )}
        </div>

        {specialMessage && (
          <div className="mt-8 p-6 glass-strong rounded-2xl max-w-md mx-auto">
            <p className="font-playfair text-xl text-white">
              Kamu memang benar-benar cinta aku ya 🥹
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
