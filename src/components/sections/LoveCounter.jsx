import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';

function CounterCard({ value, label }) {
  const text = String(value).padStart(2, '0');
  const long = text.length > 2;
  return (
    <div className="counter-card glass-strong rounded-3xl p-4 sm:p-6 md:p-8 text-center border-gradient glow-rose min-w-0">
      <div
        className={`font-playfair tabular-nums leading-none mb-2 break-all text-gradient-animated ${
          long
            ? 'text-3xl sm:text-4xl md:text-5xl'
            : 'text-4xl sm:text-5xl md:text-6xl'
        }`}
      >
        {text}
      </div>
      <div className="font-cormorant text-base md:text-xl text-rose-gold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function LoveCounter() {
  const sectionRef = useRef(null);
  const [timeData, setTimeData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const formattedContent = useMemo(() => formatContent(content), []);

  useEffect(() => {
    const startDate = new Date(formattedContent.couple.startDate);

    if (isNaN(startDate.getTime())) {
      console.error('Invalid start date:', formattedContent.couple.startDate);
      return;
    }

    const updateTime = () => {
      const diff = Date.now() - startDate.getTime();
      if (diff < 0) {
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

  // Hanya judul animasi. Kartu selalu tampil, tidak pernah opacity 0.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.counter-title', {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="love-counter"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-mid to-bg-deep" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="counter-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-12 md:mb-16">
          Kita Sudah Bersama Selama...
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <CounterCard value={timeData.days} label="Hari" />
          <CounterCard value={timeData.hours} label="Jam" />
          <CounterCard value={timeData.minutes} label="Menit" />
          <CounterCard value={timeData.seconds} label="Detik" />
        </div>

        <p className="text-center font-playfair text-xl md:text-2xl text-rose-petal">
          Dan akan terus bertambah selamanya ∞
        </p>
      </div>
    </section>
  );
}
