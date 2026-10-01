import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';

export default function LoveLetter() {
  const sectionRef = useRef(null);
  const letterRef = useRef(null);
  const timersRef = useRef([]);
  const startedRef = useRef(false);
  const [displayedText, setDisplayedText] = useState('');

  const formattedContent = useMemo(() => formatContent(content), []);
  const fullText = useMemo(
    () =>
      `${formattedContent.letter.greeting}\n\n${formattedContent.letter.body}\n\nDengan seluruh cintaku,\n${formattedContent.letter.signature}`,
    [formattedContent]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.letter-title', {
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

      gsap.from(letterRef.current, {
        scrollTrigger: {
          trigger: letterRef.current,
          start: 'top 70%',
          once: true,
        },
        y: 100,
        opacity: 0,
        rotationX: -10,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const startTyping = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let index = 0;
      const tick = () => {
        index += 1;
        setDisplayedText(fullText.slice(0, index));
        if (index < fullText.length) {
          timersRef.current.push(setTimeout(tick, fullText[index] === '\n' ? 120 : 28));
        }
      };
      timersRef.current.push(setTimeout(tick, 400));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    const timers = timersRef.current;
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [fullText]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep to-bg-mid" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="letter-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-16">
          Surat Untukmu
        </h2>

        <div
          ref={letterRef}
          className="glass-strong rounded-3xl p-5 sm:p-8 md:p-12 border-gradient glow-rose relative"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,240,243,0.03), rgba(255,240,243,0.03))',
          }}
        >
          <div className="absolute top-4 right-4 text-3xl sm:text-4xl animate-pulse" aria-hidden="true">💌</div>

          <div className="font-dancing-script text-lg sm:text-xl md:text-2xl lg:text-3xl text-rose-petal leading-relaxed whitespace-pre-line break-words min-h-[12rem]">
            {displayedText}
            <span className="animate-pulse" aria-hidden="true">|</span>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-blush to-burgundy flex items-center justify-center glow-rose-strong">
              <span className="text-2xl font-playfair text-cream">
                F ♥ A
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={`mailto:?subject=${encodeURIComponent('Balas Cintaku')}&body=${encodeURIComponent(
              formattedContent.letter.body
            )}`}
            className="inline-block glass px-6 py-3 rounded-full font-playfair text-rose-petal hover:scale-105 transition-transform border-gradient"
          >
            Balas Cintaku
          </a>
        </div>
      </div>
    </section>
  );
}
