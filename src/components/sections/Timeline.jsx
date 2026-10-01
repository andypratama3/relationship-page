import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';
import SafeImage from '../SafeImage';

export default function Timeline() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const formattedContent = useMemo(() => formatContent(content), []);
  const items = formattedContent.timeline || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-title', {
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

      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          once: true,
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep to-bg-mid" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="timeline-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-16 md:mb-20">
          Cerita Kita
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Garis: kiri di mobile, tengah di desktop */}
          <div className="timeline-line absolute left-5 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-petal via-rose-gold to-deep-blush rounded-full" />

          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={`${item.title || 'momen'}-${index}`}
                className={`timeline-item relative flex mb-12 md:mb-16 pl-14 md:pl-0 md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-1/2 md:px-4">
                  <div className="glass rounded-2xl p-6 border-gradient glow-rose card-3d">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl" aria-hidden="true">
                        {item.icon || '💗'}
                      </span>
                      <span className="font-playfair text-rose-petal text-sm">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl md:text-2xl text-rose-gold mb-2">
                      {item.title}
                    </h3>
                    <p className="font-cormorant text-cream leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Gambar di bawah kartu pada mobile, sejajar di desktop via kolom kedua */}
                  <div className="relative overflow-hidden rounded-2xl card-3d mt-4 md:hidden">
                    {item.image ? (
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        fallbackLabel={item.icon}
                        width={800}
                        height={450}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-40 bg-rose-petal/30 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl">{item.icon || '💗'}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 to-transparent rounded-2xl pointer-events-none" />
                  </div>
                </div>

                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-rose-petal to-deep-blush flex items-center justify-center glow-rose-strong z-10">
                  <span className="text-base md:text-xl animate-pulse">❤️</span>
                </div>

                <div className="hidden md:block w-1/2 px-4">
                  <div className="relative overflow-hidden rounded-2xl card-3d">
                    {item.image ? (
                      <SafeImage
                        src={item.image}
                        alt={item.title}
                        fallbackLabel={item.icon}
                        width={800}
                        height={450}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-48 bg-rose-petal/30 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl">{item.icon || '💗'}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 to-transparent rounded-2xl pointer-events-none" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-cormorant text-rose-petal">
              Tambahkan timeline di config/content.js
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
