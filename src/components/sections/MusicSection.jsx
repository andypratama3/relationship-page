import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { content, formatContent } from '../../config/content';
import { Music, Disc, Play } from 'lucide-react';

export default function MusicSection() {
  const sectionRef = useRef(null);

  const formattedContent = useMemo(() => formatContent(content), []);
  const playlist = formattedContent.playlist || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.music-title', {
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

      if (document.querySelectorAll('.music-item').length > 0) {
        gsap.from('.music-item', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
          x: -50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const playTrack = (index) => {
    window.dispatchEvent(
      new CustomEvent('romance:play-track', { detail: { index } })
    );
  };

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep to-bg-mid" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="music-title font-great-vibes text-4xl md:text-5xl lg:text-6xl text-gradient text-center mb-16">
          Lagu Kita
        </h2>

        <div className="space-y-4">
          {playlist.length > 0 ? (
            playlist.map((track, index) => (
              <button
                key={track.src || index}
                type="button"
                onClick={() => playTrack(index)}
                aria-label={`Putar ${track.title || `lagu ${index + 1}`}`}
                className="music-item w-full text-left glass rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 border-gradient card-3d cursor-pointer hover:bg-rose-petal/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-petal to-deep-blush flex items-center justify-center flex-shrink-0 text-white" aria-hidden="true">
                  <Disc size={24} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-playfair text-lg sm:text-xl text-rose-petal truncate">
                    {track.title || `Lagu ${index + 1}`}
                  </h3>
                  <p className="font-cormorant text-rose-gold truncate">{track.artist || ''}</p>
                </div>
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-petal/15 flex items-center justify-center text-rose-petal flex-shrink-0" aria-hidden="true">
                  <Play size={20} strokeWidth={2} className="ml-0.5" />
                </span>
                <Music className="text-rose-gold hidden md:block flex-shrink-0" size={24} strokeWidth={2} aria-hidden="true" />
              </button>
            ))
          ) : (
            <p className="text-center font-cormorant text-rose-petal">
              Tambahkan lagu di config/content.js
            </p>
          )}
        </div>

        <p className="text-center mt-8 font-cormorant text-rose-petal">
          {playlist.length > 0
            ? 'Ketuk lagu untuk memutar'
            : 'Putar musik di player pojok kanan bawah'}
        </p>
      </div>
    </section>
  );
}
