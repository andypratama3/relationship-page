import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';
import { burstHearts } from '../../utils/confetti';

export default function Reasons() {
  const sectionRef = useRef(null);
  const flippedRef = useRef(new Set());
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [allFlipped, setAllFlipped] = useState(false);

  const formattedContent = useMemo(() => formatContent(content), []);
  const total = formattedContent.reasons?.length || 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reasons-title', {
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

      gsap.from('.reason-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index) => {
    const next = new Set(flippedRef.current);
    const isOpening = !next.has(index);
    if (isOpening) {
      next.add(index);
    } else {
      next.delete(index);
    }
    flippedRef.current = next;
    setFlippedCards(next);

    const complete = total > 0 && next.size === total;
    setAllFlipped(complete);

    if (isOpening) {
      burstHearts({ particleCount: 20, spread: 70, origin: { y: 0.7 }, scalar: 0.6 });
    }

    if (complete) {
      setTimeout(() => {
        burstHearts({ big: true, particleCount: 100, spread: 100, origin: { y: 0.6 } });
      }, 500);
    }
  };

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-mid to-bg-deep" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="reasons-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-16">
          {total} Alasan Aku Mencintaimu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {total > 0 ? (
            formattedContent.reasons.map((reason, index) => {
              const flipped = flippedCards.has(index);
              return (
                <div
                  key={index}
                  className="reason-card"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="flip-inner relative w-full min-h-48 h-48 sm:h-52 transition-transform duration-700 cursor-pointer touch-manipulation"
                    style={{
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                    onClick={() => handleCardClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={flipped}
                    aria-label={`Alasan ${index + 1}`}
                  >
                    {/* Depan: sebelum klik */}
                    <div className="flip-face absolute inset-0 rounded-2xl p-4 sm:p-6 flex items-center justify-center bg-[#2a0f1a] border border-rose-petal/30 overflow-hidden">
                      <div className="text-center">
                        <div className="font-playfair text-5xl text-gradient-animated mb-2">
                          {index + 1}
                        </div>
                        <p className="font-cormorant text-rose-gold">Klik aku</p>
                        <div className="text-2xl mt-2">💗</div>
                      </div>
                    </div>

                    {/* Belakang: sesudah klik */}
                    <div
                      className="flip-face flip-back absolute inset-0 rounded-2xl p-4 sm:p-6 flex items-center justify-center border border-deep-blush/50 overflow-y-auto"
                      style={{
                        background: 'linear-gradient(135deg, #3d1a2b, #590D22)',
                      }}
                    >
                      <p className="font-cormorant text-base sm:text-lg text-rose-petal text-center leading-relaxed break-words">
                        {reason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-3 text-center font-cormorant text-rose-petal">
              Tambahkan alasan di config/content.js
            </p>
          )}
        </div>

        {allFlipped && (
          <div className="text-center mt-12">
            <p className="font-playfair text-2xl text-gradient-animated animate-pulse">
              Kamu sudah tahu semuanya ❤️
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
